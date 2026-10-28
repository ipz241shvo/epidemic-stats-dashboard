interface StatusMessageProps {
  variant: 'loading' | 'error' | 'empty'
  message: string
}

function StatusMessage({ variant, message }: StatusMessageProps) {
  return (
    <p
      className={`status status--${variant}`}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      {message}
    </p>
  )
}

export default StatusMessage