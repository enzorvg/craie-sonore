import Icon from '../base/Icon.jsx'

// Bouton bascule « dans mon planning » : aria-pressed + un libellé qui nomme l'artiste
export default function PlanningButton({ artist, isInPlanning, onToggle, withText = false }) {
  const label = isInPlanning ? `Retirer ${artist} de mon planning` : `Ajouter ${artist} à mon planning`
  const state = isInPlanning ? 'border-corail-400 bg-corail-400 text-ink' : 'border-line-strong text-craie hover:bg-white/10'

  return (
    <button
      type="button"
      aria-pressed={isInPlanning}
      aria-label={withText ? undefined : label}
      title={label}
      onClick={onToggle}
      className={`focus-ring inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border px-3 text-sm font-bold transition ${state}`}
    >
      <Icon name="heart" filled={isInPlanning} />
      {withText && (isInPlanning ? 'Dans mon planning' : 'Ajouter à mon planning')}
    </button>
  )
}
