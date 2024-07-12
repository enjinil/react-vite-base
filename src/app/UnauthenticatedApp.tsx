import {Routes, Route, Navigate} from 'react-router-dom'
import {HomePage} from '@/app/routes/HomePage'
import {LoginPage} from '@/app/routes/auth/LoginPage'
import {RegisterPage} from '@/app/routes/auth/RegisterPage'

function UnauthenticatedApp() {
  return <GuestAppRoutes />
}

function GuestAppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default UnauthenticatedApp
