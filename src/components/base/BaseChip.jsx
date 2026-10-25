// Pastille de filtre à deux états (sélectionnée ou non), 44 px de haut.
// aria-pressed annonce l'état aux lecteurs d'écran.
export default function BaseChip({ isActive = false, children, ...rest }) {
  const state = isActive ? 'bg-ink text-creme' : 'bg-card text-ink hover:bg-creme'

  return (
    <button
      type="button"
      aria-pressed={isActive}
      className={`focus-ring inline-flex min-h-11 shrink-0 items-center gap-2 rounded-card border-2 border-ink px-4 text-sm font-bold whitespace-nowrap uppercase transition disabled:cursor-not-allowed disabled:opacity-50 ${state}`}
      {...rest}
    >
      {children}
    </button>
  )
}
