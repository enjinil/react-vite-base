export const Error = ({errorMessage}: {errorMessage?: string}) => {
  if (!errorMessage) return null

  return (
    <div
      role="alert"
      aria-label={errorMessage}
      className="text-sm text-red-800"
    >
      {errorMessage}
    </div>
  )
}
