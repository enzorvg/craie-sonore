// Case à cocher avec une zone cliquable confortable et une erreur reliée
export default function CheckboxField({ id, checked, onChange, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-center gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="focus-ring size-5 shrink-0 cursor-pointer accent-bulle-400"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
