// Compteur de billets : deux boutons de 44 px et la valeur annoncée à chaque changement
export default function TicketCounter({ id, label, hint, value, min = 0, max, onChange }) {
  const buttonClass =
    'focus-ring grid size-11 place-items-center rounded-card border-3 border-ink bg-card text-xl font-black transition hover:bg-creme disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <div role="group" aria-labelledby={`${id}-label`} aria-describedby={hint ? `${id}-hint` : undefined} className="flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span id={`${id}-label`} className="font-extrabold uppercase">
          {label}
        </span>
        {hint && (
          <span id={`${id}-hint`} className="text-sm text-muted">
            {hint}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className={buttonClass} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`Retirer un billet ${label.toLowerCase()}`}>
          −
        </button>
        <output aria-live="polite" className="poster-title w-8 text-center text-3xl">
          {value}
        </output>
        <button type="button" className={buttonClass} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`Ajouter un billet ${label.toLowerCase()}`}>
          +
        </button>
      </div>
    </div>
  )
}
