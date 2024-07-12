import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {cn} from '@/utils/cn'
import {Schema} from 'zod'

export type FormSubmitHandler = SubmitHandler<FieldValues>

export interface FormProps {
  onSubmit: FormSubmitHandler
  className?: string
  children: (form: UseFormReturn) => React.ReactNode
  options?: UseFormProps
  id: string
  schema: Schema
}

export const Form = ({
  onSubmit,
  children,
  className,
  options = {},
  id,
  schema,
}: FormProps) => {
  const form = useForm({...options, resolver: zodResolver(schema)})
  return (
    <FormProvider {...form}>
      <form
        className={cn('form', className)}
        onSubmit={form.handleSubmit(onSubmit)}
        id={id}
      >
        {children(form)}
      </form>
    </FormProvider>
  )
}
