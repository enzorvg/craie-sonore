import { useEffect, useRef, useState } from 'react'
import PageHeading from '../layout/PageHeading.jsx'
import ProgrammeFilters from './ProgrammeFilters.jsx'
import ConcertCard from './ConcertCard.jsx'
import ConcertDialog from './ConcertDialog.jsx'
import EmptyState from '../shared/EmptyState.jsx'
import BaseButton from '../base/BaseButton.jsx'
import BasePagination from '../base/BasePagination.jsx'
import { ALL, PAGE_SIZE, STAGES } from '../../constants/festival.js'
import { dayLabel, filterConcerts, pageCount, paginate } from '../../utils/concerts.js'

const DEFAULT_FILTERS = { query: '', day: ALL, genre: ALL, stage: ALL, sort: 'time' }

// Arrivée depuis l'accueil avec « #programmation?scene=caves » : la scène est déjà filtrée
function readInitialFilters() {
  const sceneId = new URLSearchParams(window.location.hash.split('?')[1]).get('scene')
  const stage = STAGES.find((item) => item.id === sceneId)
  return stage ? { ...DEFAULT_FILTERS, stage: stage.name } : DEFAULT_FILTERS
}

export default function ProgrammePage({ concerts, planning, onTogglePlanning }) {
  // État : les filtres (un seul objet), la page affichée et le concert ouvert dans la modale
  const [filters, setFilters] = useState(readInitialFilters)
  const [page, setPage] = useState(1)
  const [openConcert, setOpenConcert] = useState(null)
  const listRef = useRef(null)

  // Le paramètre a servi : l'URL redevient « #programmation » (replaceState ne recharge rien)
  useEffect(() => {
    if (window.location.hash.includes('?')) history.replaceState(null, '', '#programmation')
  }, [])

  // Valeurs dérivées : recalculées à chaque rendu, pas d'état en plus
  const visibleConcerts = filterConcerts(concerts, filters)
  const totalPages = pageCount(visibleConcerts.length, PAGE_SIZE)
  const currentPage = Math.min(page, totalPages)
  const pageConcerts = paginate(visibleConcerts, currentPage, PAGE_SIZE)
  const firstShown = (currentPage - 1) * PAGE_SIZE + 1
  const activeFilters = [
    filters.day !== ALL && dayLabel(filters.day),
    filters.genre !== ALL && filters.genre,
    filters.stage !== ALL && filters.stage,
    filters.query && `« ${filters.query} »`,
  ].filter(Boolean)

  function changeFilter(key, value) {
    setFilters((previous) => ({ ...previous, [key]: value }))
    // Nouveaux résultats : on repart de la première page
    setPage(1)
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
    setPage(1)
  }

  // Changement de page : on remonte en haut de la liste et le focus y va (annoncé par les lecteurs d'écran)
  function changePage(number) {
    setPage(number)
    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ block: 'start' })
      listRef.current?.focus({ preventScroll: true })
    })
  }

  return (
    <section className="container-page flex flex-col gap-6 py-10 md:py-14">
      <PageHeading eyebrow="9 – 11 juillet" title="La programmation">
        Filtrez par jour, par genre ou par scène, puis ajoutez vos concerts à votre planning avec le cœur.
      </PageHeading>

      <ProgrammeFilters
        filters={filters}
        onChange={changeFilter}
        count={visibleConcerts.length}
        hasActiveFilters={activeFilters.length > 0}
        onReset={resetFilters}
      />

      {visibleConcerts.length === 0 ? (
        <EmptyState title="Aucun concert ne correspond" action={<BaseButton onClick={resetFilters}>Réinitialiser les filtres</BaseButton>}>
          <p>
            Filtres actifs : <span className="font-extrabold text-ink">{activeFilters.join(' + ')}</span>
          </p>
          <p className="text-sm">Retirez un filtre ou repartez de la programmation complète.</p>
        </EmptyState>
      ) : (
        <div ref={listRef} tabIndex={-1} aria-label={`Concerts, page ${currentPage} sur ${totalPages}`} className="flex scroll-mt-24 flex-col gap-6 outline-none">
          <p className="text-sm font-bold text-muted">
            Concerts {firstShown} à {firstShown + pageConcerts.length - 1} sur {visibleConcerts.length}
            {totalPages > 1 && ` · page ${currentPage} sur ${totalPages}`}
          </p>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageConcerts.map((concert, index) => (
              <li key={concert.id}>
                <ConcertCard
                  concert={concert}
                  index={index}
                  isInPlanning={planning.has(concert.id)}
                  onTogglePlanning={onTogglePlanning}
                  onOpen={setOpenConcert}
                />
              </li>
            ))}
          </ul>
          <BasePagination page={currentPage} totalPages={totalPages} onChange={changePage} label="Pages de la programmation" />
        </div>
      )}

      <ConcertDialog
        concert={openConcert}
        isInPlanning={openConcert ? planning.has(openConcert.id) : false}
        onTogglePlanning={onTogglePlanning}
        onClose={() => setOpenConcert(null)}
      />
    </section>
  )
}
