import { useEffect, useRef } from 'react'
import BaseBadge from '../base/BaseBadge.jsx'
import Icon from '../base/Icon.jsx'
import GenreBadge from '../shared/GenreBadge.jsx'
import PlanningButton from '../shared/PlanningButton.jsx'
import { dayLabel } from '../../utils/concerts.js'

// Modale native <dialog> : piège le focus, se ferme avec Échap et rend le focus au bouton d'origine
export default function ConcertDialog({ concert, isInPlanning, onTogglePlanning, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (concert && !dialog.open) dialog.showModal()
    if (!concert && dialog.open) dialog.close()
  }, [concert])

  function close() {
    dialogRef.current.close()
  }

  // Un clic sur le fond (hors du contenu) ferme la modale
  function handleClick(event) {
    if (event.target === event.currentTarget) close()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="concert-dialog-title"
      onClose={onClose}
      onClick={handleClick}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-card border border-line bg-surface p-0 text-craie shadow-glow backdrop:bg-ink/80 backdrop:backdrop-blur-sm open:animate-fade-up"
    >
      {concert && (
        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <p className="text-sm font-bold text-muted">{dayLabel(concert.day)}</p>
              <p className="font-display text-2xl font-extrabold text-bulle-300">
                {concert.start} – {concert.end}
              </p>
            </div>
            <button
              type="button"
              aria-label="Fermer"
              className="focus-ring grid size-11 place-items-center rounded-full text-muted transition hover:bg-white/10 hover:text-craie"
              onClick={close}
            >
              <Icon name="close" className="size-6" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <GenreBadge genre={concert.genre} />
              {concert.headliner && <BaseBadge tone="brand">Tête d&rsquo;affiche</BaseBadge>}
            </div>
            <h2 id="concert-dialog-title" className="font-display text-3xl/tight font-extrabold text-balance break-words">
              {concert.artist}
            </h2>
            <p className="text-base/relaxed text-muted">{concert.description}</p>
          </div>

          <dl className="grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
            <div>
              <dt className="text-muted">Scène</dt>
              <dd className="font-bold">{concert.stage}</dd>
            </div>
            <div>
              <dt className="text-muted">Origine</dt>
              <dd className="font-bold">{concert.origin}</dd>
            </div>
          </dl>

          <PlanningButton artist={concert.artist} isInPlanning={isInPlanning} onToggle={() => onTogglePlanning(concert.id)} withText />
        </div>
      )}
    </dialog>
  )
}
