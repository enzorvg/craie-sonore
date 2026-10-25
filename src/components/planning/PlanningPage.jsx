import PageHeading from '../layout/PageHeading.jsx'
import EmptyState from '../shared/EmptyState.jsx'
import BaseButton from '../base/BaseButton.jsx'
import BaseBadge from '../base/BaseBadge.jsx'
import Icon from '../base/Icon.jsx'
import GenreBadge from '../shared/GenreBadge.jsx'
import PlanningButton from '../shared/PlanningButton.jsx'
import { findConflicts, groupByDay, plural } from '../../utils/concerts.js'

// Mon planning : les concerts choisis, jour par jour, avec les chevauchements signalés
export default function PlanningPage({ concerts, planning, onTogglePlanning }) {
  // Tout est dérivé du Set d'ids reçu en props
  const chosen = concerts.filter((concert) => planning.has(concert.id))
  const groups = groupByDay(chosen)
  const conflicts = findConflicts(chosen)

  return (
    <section className="container-page flex flex-col gap-6 py-10 md:py-14">
      <PageHeading eyebrow="Mon festival" title="Mon planning">
        {chosen.length > 0 ? `${plural(chosen.length, 'concert')} choisi${chosen.length > 1 ? 's' : ''}. Gardé sur cet appareil.` : null}
      </PageHeading>

      {chosen.length === 0 ? (
        <EmptyState title="Votre planning est vide" action={<BaseButton href="#programmation">Parcourir la programmation</BaseButton>}>
          <p>Touchez le cœur d&rsquo;un concert pour l&rsquo;ajouter ici.</p>
        </EmptyState>
      ) : (
        <>
          {conflicts.size > 0 && (
            <p role="status" className="flex items-start gap-2 rounded-card border-3 border-ink bg-creme p-4 text-sm font-bold text-ink shadow-poster">
              <Icon name="alert" className="size-5 shrink-0" />
              {plural(conflicts.size, 'concert')} se chevauchent : vous devrez choisir entre eux.
            </p>
          )}

          {groups.map((group) => (
            <section key={group.day.value} aria-labelledby={`day-${group.day.value}`} className="flex flex-col gap-3">
              <h2 id={`day-${group.day.value}`} className="eyebrow text-sm">
                {group.day.long}
              </h2>
              <ol className="flex flex-col gap-2">
                {group.concerts.map((concert) => (
                  <li key={concert.id} className="flex items-center gap-4 rounded-card border-3 border-ink bg-card p-3 sm:p-4">
                    <time dateTime={`${concert.date}T${concert.start}`} className="poster-title w-16 shrink-0 text-3xl text-bleu-600">
                      {concert.start}
                    </time>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <p className="poster-title text-2xl break-words">{concert.artist}</p>
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-muted">
                        <GenreBadge genre={concert.genre} />
                        {concert.stage} · jusqu&rsquo;à {concert.end}
                      </p>
                      {conflicts.has(concert.id) && (
                        <span>
                          <BaseBadge tone="warning">Chevauchement</BaseBadge>
                        </span>
                      )}
                    </div>
                    <PlanningButton artist={concert.artist} isInPlanning onToggle={() => onTogglePlanning(concert.id)} />
                  </li>
                ))}
              </ol>
            </section>
          ))}

          <div className="flex flex-col items-start gap-4 rounded-card border-3 border-ink bg-bleu-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="poster-title text-2xl">Votre programme est prêt ? Il ne manque que le pass.</p>
            <BaseButton href="#billetterie">Prendre mon pass</BaseButton>
          </div>
        </>
      )}
    </section>
  )
}
