// Champ de formulaire : label toujours visible, aide facultative, message d'erreur relié au champ.
// as : 'input' (défaut) ou 'select' ; les autres props vont sur le champ.
export default function BaseField({ as: Control = 'input', id, label, hint, error, className = '', children, ...rest }) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const border = error ? 'border-danger' : 'border-line-strong hover:border-craie/50'

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-craie">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}
      <Control
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        className={`focus-ring min-h-12 w-full rounded-xl border bg-surface px-4 text-base text-craie transition placeholder:text-muted focus:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-50 ${border}`}
        {...rest}
      >
        {children}
      </Control>
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-sm font-semibold text-danger">
          <svg className="size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-11.5a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0v-4ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
