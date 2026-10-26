// Pagination : précédent, numéros de page, suivant. 44 px de haut, comme les pastilles.
// aria-current="page" annonce la page affichée ; les flèches sont désactivées aux extrémités.
export default function BasePagination({ page, totalPages, onChange, label = 'Pagination' }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const base = 'focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-card border-2 border-ink px-3 text-sm font-extrabold uppercase transition disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <nav aria-label={label} className="flex flex-wrap items-center justify-center gap-2">
      <button type="button" className={`${base} bg-card text-ink hover:bg-creme`} disabled={page === 1} onClick={() => onChange(page - 1)}>
        <span aria-hidden="true">←</span>
        <span className="ml-1 hidden sm:inline">Précédent</span>
        <span className="sr-only sm:hidden">Page précédente</span>
      </button>
      <ol className="flex items-center gap-2">
        {pages.map((number) => (
          <li key={number}>
            <button
              type="button"
              aria-current={number === page ? 'page' : undefined}
              className={`${base} ${number === page ? 'bg-ink text-creme' : 'bg-card text-ink hover:bg-creme'}`}
              onClick={() => onChange(number)}
            >
              <span className="sr-only">Page </span>
              {number}
            </button>
          </li>
        ))}
      </ol>
      <button type="button" className={`${base} bg-card text-ink hover:bg-creme`} disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        <span className="mr-1 hidden sm:inline">Suivant</span>
        <span className="sr-only sm:hidden">Page suivante</span>
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  )
}
