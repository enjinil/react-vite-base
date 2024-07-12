import {BrowserRouter as Router} from 'react-router-dom'
import {AuthProvider} from '@/context/AuthContext'

function AppProviders({children}: {children: React.ReactNode}) {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  )
}

export {AppProviders}
