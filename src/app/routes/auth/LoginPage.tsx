import {AuthLayout} from '@/components/layouts/AuthLayout'
import {LoginForm} from '@/features/auth/components/LoginForm'
import {Link} from 'react-router-dom'

function LoginPage() {
  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Login</h2>
      <LoginForm />
      <div className="flex justify-between py-2 text-sm">
        <Link
          className="text-blue-600 cursor-pointer hover:text-blue-700"
          to="/"
        >
          ← Back to home
        </Link>
        <Link
          className="text-blue-600 cursor-pointer hover:text-blue-700"
          to="/auth/register"
        >
          Register
        </Link>
      </div>
    </AuthLayout>
  )
}

export {LoginPage}
