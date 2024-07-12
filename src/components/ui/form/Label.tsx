import * as React from 'react'
import {cn} from '@/utils/cn'

export interface LabelProps {
  children: React.ReactNode
}
export type LabelRef = HTMLLabelElement

const Label = React.forwardRef<LabelRef, LabelProps>(({children}, ref) => (
  <label ref={ref} className={cn('label')}>
    {children}
  </label>
))
Label.displayName = 'Label'

export {Label}
