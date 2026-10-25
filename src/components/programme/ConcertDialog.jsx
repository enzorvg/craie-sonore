import { useEffect, useRef } from 'react'
import BaseBadge from '../base/BaseBadge.jsx'
import Icon from '../base/Icon.jsx'
import GenreBadge from '../shared/GenreBadge.jsx'
import PlanningButton from '../shared/PlanningButton.jsx'
import { GENRE_STYLES } from '../../constants/festival.js'
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
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-card border-3 border-ink bg-card p-0 text-ink shadow-poster-lg backdrop:bg-bleu-800/80 open:animate-fade-up"
    >
      {concert && (
        <div className="flex flex-col gap-5 p-6">
          <div className={`-mx-6 -mt-6 flex items-start justify-between gap-3 border-b-3 border-ink px-6 py-4 ${GENRE_STYLES[concert.genre]?.bg ?? 'bg-paper-deep'} ${GENRE_STYLES[concert.genre]?.text ?? 'text-ink'}`}>
            <div className="flex flex-col">
              <p className="text-xs font-black tracking-widest uppercase">{dayLabel(concert.day)}</p>
              <p className="poster-title text-3xl">
                {concert.start} – {concert.end}
              </p>
            </div>
            <button
              type="button"
              aria-label="Fermer"
              className="focus-ring grid size-11 place-items-center rounded-card border-2 border-ink bg-card text-ink transition hover:bg-creme"
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
            <h2 id="concert-dialog-title" className="poster-title text-5xl text-balance break-words">
              {concert.artist}
            </h2>
            <p className="text-base/relaxed font-medium">{concert.description}</p>
          </div>

          <dl className="grid grid-cols-2 gap-4 border-t-3 border-ink pt-5 text-sm">
            <div>
              <dt className="text-xs font-black tracking-widest text-muted uppercase">Scène</dt>
              <dd className="text-base font-extrabold">{concert.stage}</dd>
            </div>
            <div>
              <dt className="text-xs font-black tracking-widest text-muted uppercase">Origine</dt>
              <dd className="text-base font-extrabold">{concert.origin}</dd>
            </div>
          </dl>

          <PlanningButton artist={concert.artist} isInPlanning={isInPlanning} onToggle={() => onTogglePlanning(concert.id)} withText />
        </div>
      )}
    </dialog>
  )
}
