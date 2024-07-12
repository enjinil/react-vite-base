import {Routes, Route, Navigate} from 'react-router-dom'
import {DashboardPage} from '@/app/routes/DashboardPage'

function AuthenticatedApp() {
  return <UserAppRoutes />
}

function UserAppRoutes() {
  return (
    <Routes>
      <Route
        path="/auth/register"
        element={<Navigate to="/app/dashboard" replace />}
      />
      <Route
        path="/auth/register"
        element={<Navigate to="/app/dashboard" replace />}
      />

      <Route path="/app/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
    </Routes>
  )
}

export default AuthenticatedApp
