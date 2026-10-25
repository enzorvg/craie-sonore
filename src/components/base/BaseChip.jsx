// Pastille de filtre à deux états (sélectionnée ou non), 44 px de haut.
// aria-pressed annonce l'état aux lecteurs d'écran.
export default function BaseChip({ isActive = false, children, ...rest }) {
  const state = isActive
    ? 'border-bulle-400 bg-bulle-400 text-ink'
    : 'border-line bg-surface text-craie hover:border-line-strong hover:bg-surface-raised'

  return (
    <button
      type="button"
      aria-pressed={isActive}
      className={`focus-ring inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition disabled:cursor-not-allowed disabled:opacity-50 ${state}`}
      {...rest}
    >
      {children}
    </button>
  )
}
