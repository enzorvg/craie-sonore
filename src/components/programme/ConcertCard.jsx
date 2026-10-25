import BaseCard from '../base/BaseCard.jsx'
import BaseBadge from '../base/BaseBadge.jsx'
import BaseButton from '../base/BaseButton.jsx'
import Icon from '../base/Icon.jsx'
import GenreBadge from '../shared/GenreBadge.jsx'
import PlanningButton from '../shared/PlanningButton.jsx'
import { GENRE_STYLES } from '../../constants/festival.js'
import { dayLabel } from '../../utils/concerts.js'

// Une carte de concert : l'information utile d'abord (jour, heure), puis l'artiste en grand comme sur l'affiche
export default function ConcertCard({ concert, index = 0, isInPlanning, onTogglePlanning, onOpen }) {
  return (
    <BaseCard
      tone={concert.headliner ? 'highlight' : 'default'}
      className="h-full animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
      aria-labelledby={`concert-${concert.id}-title`}
    >
      {/* Bandeau de la couleur du genre : jour et heure, et le cœur du planning */}
      <div className={`flex items-center justify-between gap-3 border-b-3 border-ink px-4 py-2 ${GENRE_STYLES[concert.genre]?.bg ?? 'bg-paper-deep'} ${GENRE_STYLES[concert.genre]?.text ?? 'text-ink'}`}>
        <p className="flex items-baseline gap-2">
          <span className="text-xs font-black tracking-widest uppercase">{dayLabel(concert.day, 'label')}</span>
          <time dateTime={`${concert.date}T${concert.start}`} className="poster-title text-3xl">
            {concert.start}
          </time>
        </p>
        <PlanningButton artist={concert.artist} isInPlanning={isInPlanning} onToggle={() => onTogglePlanning(concert.id)} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        {concert.headliner && (
          <span>
            <BaseBadge tone="brand">Tête d&rsquo;affiche</BaseBadge>
          </span>
        )}
        <h2 id={`concert-${concert.id}-title`} className="poster-title text-4xl break-words">
          {concert.artist}
        </h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <GenreBadge genre={concert.genre} />
          <span className="inline-flex items-center gap-1 text-sm font-semibold">
            <Icon name="pin" className="size-4" />
            {concert.stage}
          </span>
        </div>

        <div className="mt-auto pt-2">
          <BaseButton variant="secondary" size="sm" className="w-full" onClick={() => onOpen(concert)}>
            Voir le concert<span className="sr-only"> de {concert.artist}</span>
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  )
}
