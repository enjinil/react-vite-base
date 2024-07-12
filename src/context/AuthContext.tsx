import * as React from 'react'
import * as auth from '@/lib/auth-provider'
import {ClientConfig, client} from '@/lib/api-client'
import {useAsync} from '@/utils/hooks'
import {Spinner} from '@/components/ui/spinner/Spinner'

type AuthUser = auth.User & {token: string | null}

interface AuthContextValue {
  user: AuthUser | null
  login: (form: auth.LoginInput) => Promise<void>
  register: (form: auth.RegisterInput) => Promise<void>
  logout: () => void
}

async function initializeAppData(): Promise<AuthUser | null> {
  let user: auth.User | null = null

  const token = await auth.getToken()

  if(!token) {
    return null
  }

  await client('user/me', {token}).then((data: {user: AuthUser}) => {
    user = data.user
  })

  return {...user!, token}

}

const AuthContext = React.createContext<AuthContextValue | null>(null)
AuthContext.displayName = 'AuthContext'

function AuthProvider(props: {children: React.ReactNode}) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync<AuthUser | null>()

  React.useEffect(() => {
    run(initializeAppData())
  }, [run])

  const login = React.useCallback(
    (form: auth.LoginInput) => auth.login(form).then(({token, user}) => setData({...user, token })),
    [setData],
  )

  const register = React.useCallback(
    (form: auth.RegisterInput) =>
      auth.register(form).then(({token, user}) => setData({...user, token })),
    [setData],
  )

  const logout = React.useCallback(() => {
    auth.logout()
    setData(null)
  }, [setData])

  const value = React.useMemo(
    () => ({user, login, logout, register}),
    [user, login, logout, register],
  )

  if (isLoading || isIdle) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size={32} />
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert">
        <p>There's a problem. Try refreshing the app.</p>
        <pre>{error!.message}</pre>
      </div>
    )
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth should be used within AuthProvider`)
  }
  return context
}

function useClient() {
  const {user} = useAuth()
  const token = user?.token
  return React.useCallback(
    (endpoint: string, config: ClientConfig) =>
      client(endpoint, {...config, token}),
    [token],
  )
}

export {AuthProvider, useAuth, useClient}
