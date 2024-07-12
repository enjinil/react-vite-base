import {Alert} from '@/components/ui/alert/Alert'
import {Button} from '@/components/ui/button/Button'
import {Form} from '@/components/ui/form/Form'
import {Input} from '@/components/ui/form/Input'
import {useAuth} from '@/context/AuthContext'
import {LoginInput, loginInputSchema} from '@/lib/auth-provider'
import {useAsync} from '@/utils/hooks'
import * as React from 'react'

interface LoginFormProps {
  onSuccess?: () => void
}

function LoginForm({onSuccess = () => null}: LoginFormProps) {
  const {login} = useAuth()
  const {isLoading, isError, run} = useAsync<ReturnType<typeof login>>()

  return (
    <Form
      onSubmit={e => 
        run(login(e as LoginInput)).then(onSuccess, console.error)
      }
      schema={loginInputSchema}
      id="login_form"
    >
      {({register, formState}) => (
        <div className="space-y-4 pb-6">
          <Input
            label="Username"
            error={formState.errors['username']}
            registration={register('username')}
          />

          <Input
            label="Password"
            type="password"
            error={formState.errors['password']}
            registration={register('password')}
          />

          {isError && <Alert
            type="error"
            message="Login failed, please try again with different credentials."
          />}

          <Button isLoading={isLoading} type="submit" className="w-full">
            Login
          </Button>
        </div>
      )}
    </Form>
  )
}

export {LoginForm}
