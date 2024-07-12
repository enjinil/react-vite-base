import {AuthLayout} from '@/components/layouts/AuthLayout'
import {RegisterForm} from '@/features/auth/components/RegisterForm'
import {Link} from 'react-router-dom'

function RegisterPage() {
  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Register</h2>
      <RegisterForm />
      <div className="flex justify-between py-2 text-sm">
        <Link
          className="text-blue-600 cursor-pointer hover:text-blue-700 "
          to="/"
        >
          ← Back to home
        </Link>
      </div>
    </AuthLayout>
  )
}

export {RegisterPage}
