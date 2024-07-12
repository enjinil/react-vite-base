import {Alert} from '@/components/ui/alert/Alert'
import {Button} from '@/components/ui/button/Button'
import {Form} from '@/components/ui/form/Form'
import {Input} from '@/components/ui/form/Input'
import {useAuth} from '@/context/AuthContext'
import {RegisterInput, registerInputSchema} from '@/lib/auth-provider'
import {useAsync} from '@/utils/hooks'
import * as React from 'react'

interface RegisterFormProps {
  onSuccess?: () => void
}

function RegisterForm({onSuccess = () => null}: RegisterFormProps) {
  const {register} = useAuth()
  const {isLoading, isError, run} = useAsync<ReturnType<typeof register>>()

  return (
    <Form
      onSubmit={e =>
        run(register(e as RegisterInput)).then(onSuccess, console.error)
      }
      schema={registerInputSchema}
      id="register_form"
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

          {isError && (
            <Alert type="error" message="Username already registered." />
          )}

          <Button isLoading={isLoading} type="submit" className="w-full">
            Register
          </Button>
        </div>
      )}
    </Form>
  )
}

export {RegisterForm}
