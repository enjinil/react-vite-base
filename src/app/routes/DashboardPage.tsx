import {Button} from '@/components/ui/button/Button'
import {useAuth} from '@/context/AuthContext'

function DashboardPage() {
  const {logout, user} = useAuth()
  return (
    <div className='p-8'>
      <h1 role="greeting" className="my-6 text-lg font-bold">{`Hello, ${user?.username}!`}</h1>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  )
}

export {DashboardPage}
