import {ValueOf} from '@/types/utils'
import * as React from 'react'

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
} as const

// Cancel dispatch when the component has been unmounted
function useSafeDispatch<Dispatch extends React.Dispatch<any>>(
  dispatch: Dispatch,
) {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return React.useCallback(
    ((...args) => (mounted.current ? dispatch(...args) : void 0)) as Dispatch,
    [dispatch],
  )
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchProduct(productId))
// }, [productId, run])
interface AsyncState<Data> {
  status: ValueOf<typeof STATUS>
  data: Data | null
  error: Error | null
}

const defaultInitialState = {
  status: STATUS.idle,
  data: null,
  error: null,
} as AsyncState<null>
function useAsync<Data>(initialState?: AsyncState<Data>) {
  const initialStateRef = React.useRef<AsyncState<Data>>({
    ...defaultInitialState,
    ...initialState,
  })

  const [{status, data, error}, setState] = React.useReducer(
    (s: AsyncState<Data>, a: Partial<AsyncState<Data>>) => ({...s, ...a}),
    initialStateRef.current,
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = React.useCallback(
    (data: Data) => safeSetState({data, status: STATUS.resolved}),
    [safeSetState],
  )
  const setError = React.useCallback(
    (error: Error) => safeSetState({error, status: STATUS.rejected}),
    [safeSetState],
  )
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState],
  )

  const run = React.useCallback(
    (promise: Promise<any>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        )
      }
      safeSetState({status: STATUS.pending})
      return promise.then(
        (data: Data) => {
          setData(data)
          return data
        },
        (error: Error) => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [safeSetState, setData, setError],
  )

  return {
    isIdle: status === STATUS.idle,
    isLoading: status === STATUS.pending,
    isError: status === STATUS.rejected,
    isSuccess: status === STATUS.resolved,

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export {useAsync}
