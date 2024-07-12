import {cn} from '@/utils/cn'

interface AlertProps {
  title?: string
  message?: string
  type: 'info' | 'success' | 'error'
}

const typeClasses: Record<AlertProps['type'], string> = {
  info: 'border-zinc-400 bg-zinc-100',
  success: 'border-green-400 bg-green-100',
  error: 'border-red-400 bg-red-100',
}

function Alert({title, message = undefined, type}: AlertProps) {
  return (
    <div
      role='alert'
      className={cn(
        'border-2 text-sm px-4 py-3 flex',
        typeClasses[type],
      )}
    >
      <div>
        {title && <div className="font-bold text-zinc-900">{title}</div>}
        {message && <div className="text-zinc-700">{message}</div>}
      </div>
    </div>
  )
}

export {Alert}
