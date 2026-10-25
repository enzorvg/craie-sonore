import Icon from '../base/Icon.jsx'

// Bouton bascule « dans mon planning » : aria-pressed + un libellé qui nomme l'artiste
export default function PlanningButton({ artist, isInPlanning, onToggle, withText = false }) {
  const label = isInPlanning ? `Retirer ${artist} de mon planning` : `Ajouter ${artist} à mon planning`
  const state = isInPlanning ? 'bg-bleu-300' : 'bg-card hover:bg-bleu-100'

  return (
    <button
      type="button"
      aria-pressed={isInPlanning}
      aria-label={withText ? undefined : label}
      title={label}
      onClick={onToggle}
      className={`focus-ring inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-card border-2 border-ink px-3 text-sm font-extrabold text-ink uppercase transition ${state}`}
    >
      <Icon name="heart" filled={isInPlanning} />
      {withText && (isInPlanning ? 'Dans mon planning' : 'Ajouter à mon planning')}
    </button>
  )
}
