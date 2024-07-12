import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import {Button} from '@/components/ui/button/Button'

function HomePage() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-slate-200">
      <div className="text-center space-y-6">
        <div className="flex justify-center space-x-4">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="w-16" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="w-16" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          React Vite Base
        </h1>
        <div className="space-x-2 pb-6">
          <Button to="/auth/login">Login</Button>
          <Button variant="secondary" to="/auth/register">Register</Button>
        </div>
      </div>
    </div>
  )
}

export {HomePage}

