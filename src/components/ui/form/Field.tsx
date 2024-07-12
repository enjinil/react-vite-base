import * as React from 'react'
import {Label} from '@/components/ui/form/Label'
import {Error} from '@/components/ui/form/Error'

export interface FieldProps {
  label: string
  error?: {message?: string}
  children: React.ReactNode
}

export const Field = ({label, error, children}: FieldProps) => (
  <div>
    <Label>
      {label}
      <div>{children}</div>
    </Label>
    <Error errorMessage={error?.message} />
  </div>
)
