import * as React from 'react'
import {cn} from '@/utils/cn'
import {Field} from '@/components/ui/form/Field'
import {UseFormRegisterReturn} from 'react-hook-form'

export interface InputProps {
  className?: string
  type?: React.HTMLInputTypeAttribute
  label: string
  error?: {message?: string}
  registration: UseFormRegisterReturn
}
export type InputRef = HTMLInputElement

const Input = React.forwardRef<InputRef, InputProps>(
  ({className, type, label, error, registration, ...props}, _) => {
    return (
      <Field label={label} error={error}>
        <input
          type={type}
          className={cn(
            'px-3 text-gray-700 border w-full block h-8 mb-1 border-gray-300 focus:ring-2',
            className,
          )}
          {...registration}
          {...props}
        />
      </Field>
    )
  },
)

Input.displayName = 'Input'

export {Input}
