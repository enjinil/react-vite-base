import React from 'react'
import {Spinner} from '@/components/ui/spinner/Spinner'
import {useAuth} from '@/context/AuthContext'

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './AuthenticatedApp'),
)
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'))

function App() {
  const {user} = useAuth()
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size={32} />
        </div>
      }
    >
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
