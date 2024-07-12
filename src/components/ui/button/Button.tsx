import * as React from 'react'
import {useNavigate} from 'react-router-dom'
import {cn} from '@/utils/cn'

const variantClass = {
  primary: 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600',
  secondary: 'bg-gray-200 text-gray-800 border-gray-400 hover:bg-gray-300',
  outline: 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100',
  success: 'bg-green-600 text-white border-green-700 hover:bg-green-700',
  danger: 'bg-red-500 text-white border-red-600 hover:bg-red-600',
  warning: 'bg-yellow-600 text-white border-yellow-700 hover:bg-yellow-700',
}

type Variant = keyof typeof variantClass

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  type?: 'button' | 'submit'
  variant?: Variant,
  to?: string
  onClick?: (e: React.MouseEvent) => void
  className?: string
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  type = 'button',
  variant = 'primary',
  to,
  onClick,
  className,
  isLoading,
  ...props
}, ref) => {
  const navigate = useNavigate()

  function handleClick(e: React.MouseEvent) {
    if(to) {
      navigate(to)
    }

    onClick?.(e)
  }
  
  return (
    <button
      ref={ref}
      className={cn(
        'text-sm h-8 px-4 py-1 cursor-pointer inline-flex justify-center items-center border-2 rounded focus:ring-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantClass[variant],
        className,
      )}
      onClick={handleClick}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading.." : children}
    </button>
  )
})
