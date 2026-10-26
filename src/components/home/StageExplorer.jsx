import { useRef, useState } from 'react'
import BaseButton from '../base/BaseButton.jsx'
import BaseCard from '../base/BaseCard.jsx'
import BaseChipGroup from '../base/BaseChipGroup.jsx'
import GenreBadge from '../shared/GenreBadge.jsx'
import PlanningButton from '../shared/PlanningButton.jsx'
import { ALL, DAYS, STAGES } from '../../constants/festival.js'
import { compareByTime, dayLabel, plural } from '../../utils/concerts.js'

// Explorer les scènes : des onglets (une scène à la fois), un filtre par jour,
// le cœur du planning sur chaque concert et un lien vers la programmation déjà filtrée.
// Clavier : flèches gauche/droite, Début et Fin passent d'un onglet à l'autre (motif ARIA « tabs »).
export default function StageExplorer({ concerts, planning, onTogglePlanning }) {
  const [activeId, setActiveId] = useState(STAGES[0].id)
  const [day, setDay] = useState(ALL)
  const tabRefs = useRef([])

  // Valeurs dérivées : la scène choisie, ses concerts, puis ceux du jour choisi
  const activeIndex = STAGES.findIndex((stage) => stage.id === activeId)
  const stage = STAGES[activeIndex]
  const stageConcerts = concerts.filter((concert) => concert.stage === stage.name).sort(compareByTime)
  const shownConcerts = stageConcerts.filter((concert) => day === ALL || concert.day === day)
  const dayOptions = [
    { value: ALL, label: 'Tous' },
    ...DAYS.filter((item) => stageConcerts.some((concert) => concert.day === item.value)).map((item) => ({ value: item.value, label: item.label })),
  ]

  function selectStage(index) {
    setActiveId(STAGES[index].id)
    setDay(ALL)
  }

  function handleKeyDown(event) {
    const moves = { ArrowRight: activeIndex + 1, ArrowLeft: activeIndex - 1, Home: 0, End: STAGES.length - 1 }
    if (!(event.key in moves)) return
    event.preventDefault()
    const next = (moves[event.key] + STAGES.length) % STAGES.length
    selectStage(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="Les scènes du festival" className="grid gap-3 sm:grid-cols-3" onKeyDown={handleKeyDown}>
        {STAGES.map((item, index) => {
          const isActive = item.id === activeId
          const count = concerts.filter((concert) => concert.stage === item.name).length
          return (
            <button
              key={item.id}
              ref={(element) => (tabRefs.current[index] = element)}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectStage(index)}
              className={`focus-ring flex items-center justify-between gap-3 rounded-card border-3 border-ink px-4 py-3 text-left transition ${
                isActive ? `${item.color} -translate-x-1 -translate-y-1 shadow-poster` : 'bg-card text-ink hover:bg-creme'
              }`}
            >
              <span className="poster-title text-2xl sm:text-3xl">{item.name}</span>
              <span className="shrink-0 text-xs font-black tracking-widest uppercase">{plural(count, 'concert')}</span>
            </button>
          )
        })}
      </div>

      <BaseCard
        key={stage.id}
        as="div"
        tone="highlight"
        role="tabpanel"
        id={`panel-${stage.id}`}
        aria-labelledby={`tab-${stage.id}`}
        className="animate-fade-up md:grid md:grid-cols-[18rem_1fr]"
      >
        <div className={`flex flex-col gap-4 border-b-3 border-ink p-6 md:border-r-3 md:border-b-0 ${stage.color}`}>
          <h3 className="poster-title text-4xl">{stage.name}</h3>
          <p className="font-medium">{stage.text}</p>
          <dl className="mt-auto grid gap-2 text-sm">
            <div>
              <dt className="text-xs font-black tracking-widest uppercase opacity-80">Où</dt>
              <dd className="font-bold">{stage.place}</dd>
            </div>
            <div>
              <dt className="text-xs font-black tracking-widest uppercase opacity-80">Capacité</dt>
              <dd className="font-bold">{stage.capacity}</dd>
            </div>
          </dl>
        </div>

        <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-6">
          <BaseChipGroup id={`stage-day-${stage.id}`} label="Jour" options={dayOptions} value={day} onChange={setDay} />

          <ul className="flex flex-col divide-y-2 divide-ink/15" aria-live="polite">
            {shownConcerts.map((concert) => (
              <li key={concert.id} className="flex items-center gap-3 py-3">
                <p className="w-16 shrink-0 text-center">
                  <span className="block text-xs font-black tracking-widest uppercase">{dayLabel(concert.day, 'label')}</span>
                  <time dateTime={`${concert.date}T${concert.start}`} className="poster-title text-2xl">
                    {concert.start}
                  </time>
                </p>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
                  <p className="poster-title text-2xl break-words">{concert.artist}</p>
                  <GenreBadge genre={concert.genre} />
                </div>
                <PlanningButton artist={concert.artist} isInPlanning={planning.has(concert.id)} onToggle={() => onTogglePlanning(concert.id)} />
              </li>
            ))}
          </ul>

          <BaseButton href={`#programmation?scene=${stage.id}`} variant="secondary" className="self-start">
            Voir {stage.name.toLowerCase()} dans la programmation
          </BaseButton>
        </div>
      </BaseCard>
    </div>
  )
}
