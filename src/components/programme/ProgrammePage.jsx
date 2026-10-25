import { useState } from 'react'
import PageHeading from '../layout/PageHeading.jsx'
import ProgrammeFilters from './ProgrammeFilters.jsx'
import ConcertCard from './ConcertCard.jsx'
import ConcertDialog from './ConcertDialog.jsx'
import EmptyState from '../shared/EmptyState.jsx'
import BaseButton from '../base/BaseButton.jsx'
import { ALL } from '../../constants/festival.js'
import { dayLabel, filterConcerts } from '../../utils/concerts.js'

const DEFAULT_FILTERS = { query: '', day: ALL, genre: ALL, sort: 'time' }

export default function ProgrammePage({ concerts, planning, onTogglePlanning }) {
  // État : les filtres (un seul objet) et le concert ouvert dans la modale
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [openConcert, setOpenConcert] = useState(null)

  // Valeurs dérivées : recalculées à chaque rendu, pas d'état en plus
  const visibleConcerts = filterConcerts(concerts, filters)
  const activeFilters = [
    filters.day !== ALL && dayLabel(filters.day),
    filters.genre !== ALL && filters.genre,
    filters.query && `« ${filters.query} »`,
  ].filter(Boolean)

  function changeFilter(key, value) {
    setFilters((previous) => ({ ...previous, [key]: value }))
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
  }

  return (
    <section className="container-page flex flex-col gap-6 py-10 md:py-14">
      <PageHeading eyebrow="9 – 11 juillet" title="La programmation">
        Filtrez par jour et par genre, puis ajoutez vos concerts à votre planning avec le cœur.
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
            Filtres actifs : <span className="font-bold text-craie">{activeFilters.join(' + ')}</span>
          </p>
          <p className="text-sm">Retirez un filtre ou repartez de la programmation complète.</p>
        </EmptyState>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleConcerts.map((concert, index) => (
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
