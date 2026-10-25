import BaseCard from '../base/BaseCard.jsx'
import BaseBadge from '../base/BaseBadge.jsx'
import BaseButton from '../base/BaseButton.jsx'
import Icon from '../base/Icon.jsx'
import GenreBadge from '../shared/GenreBadge.jsx'
import PlanningButton from '../shared/PlanningButton.jsx'
import { GENRE_STYLES } from '../../constants/festival.js'
import { dayLabel } from '../../utils/concerts.js'

// Une carte de concert : l'information utile d'abord (jour, heure, scène), puis l'artiste
export default function ConcertCard({ concert, index = 0, isInPlanning, onTogglePlanning, onOpen }) {
  return (
    <BaseCard
      tone={concert.headliner ? 'highlight' : 'default'}
      className="h-full animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
      aria-labelledby={`concert-${concert.id}-title`}
    >
      <span className={`h-1 ${GENRE_STYLES[concert.genre]?.bar}`} aria-hidden="true"></span>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="flex flex-col">
            <span className="text-xs font-bold tracking-wide text-muted uppercase">{dayLabel(concert.day, 'label')}</span>
            <time dateTime={`${concert.date}T${concert.start}`} className="font-display text-2xl font-extrabold text-bulle-300">
              {concert.start}
            </time>
          </p>
          <PlanningButton artist={concert.artist} isInPlanning={isInPlanning} onToggle={() => onTogglePlanning(concert.id)} />
        </div>

        <div className="flex flex-col gap-1">
          {concert.headliner && (
            <span className="mb-1">
              <BaseBadge tone="brand">Tête d&rsquo;affiche</BaseBadge>
            </span>
          )}
          <h2 id={`concert-${concert.id}-title`} className="font-display text-xl/tight font-extrabold break-words">
            {concert.artist}
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <GenreBadge genre={concert.genre} />
            <span className="inline-flex items-center gap-1 text-sm text-muted">
              <Icon name="pin" className="size-4" />
              {concert.stage}
            </span>
          </div>
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
