import BaseChipGroup from '../base/BaseChipGroup.jsx'
import BaseField from '../base/BaseField.jsx'
import BaseButton from '../base/BaseButton.jsx'
import { ALL, DAYS, GENRES, GENRE_STYLES, SORTS } from '../../constants/festival.js'
import { plural } from '../../utils/concerts.js'

const dayOptions = [{ value: ALL, label: 'Tous' }, ...DAYS.map((day) => ({ value: day.value, label: day.label }))]
const genreOptions = [{ value: ALL, label: 'Tous' }, ...GENRES.map((genre) => ({ value: genre, label: genre, dot: GENRE_STYLES[genre].dot }))]

// Les pastilles d'abord : sur mobile, jour et genre sont les filtres utiles en premier.
// Composant de présentation : il reçoit les valeurs et prévient le parent par des callbacks
export default function ProgrammeFilters({ filters, onChange, count, hasActiveFilters, onReset }) {
  return (
    <div className="flex flex-col gap-3">
      <BaseChipGroup id="filter-day" label="Jour" options={dayOptions} value={filters.day} onChange={(value) => onChange('day', value)} className="-mx-4 px-4 sm:mx-0 sm:px-0" />
      <BaseChipGroup id="filter-genre" label="Genre" options={genreOptions} value={filters.genre} onChange={(value) => onChange('genre', value)} className="-mx-4 px-4 sm:mx-0 sm:px-0" />

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <BaseField
          id="search"
          type="search"
          label="Rechercher un artiste, une scène, une ville"
          placeholder="Ex. Ruban Noir, Caves, Lille…"
          value={filters.query}
          onChange={(event) => onChange('query', event.target.value)}
        />
        <BaseField as="select" id="sort" label="Trier" value={filters.sort} onChange={(event) => onChange('sort', event.target.value)}>
          {SORTS.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </BaseField>
      </div>

      <div className="flex min-h-11 items-center justify-between gap-3 border-t border-line pt-3">
        {/* aria-live : le nombre de résultats est annoncé à chaque changement de filtre */}
        <p className="text-sm text-muted" aria-live="polite">
          <span className="font-bold text-craie">{plural(count, 'concert')}</span>
          {count > 1 ? ' trouvés' : ' trouvé'}
        </p>
        {hasActiveFilters && (
          <BaseButton variant="ghost" size="sm" onClick={onReset}>
            Réinitialiser les filtres
          </BaseButton>
        )}
      </div>
    </div>
  )
}
