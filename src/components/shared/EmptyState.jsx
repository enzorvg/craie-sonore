// État vide utile : il dit ce qui se passe et donne une seule action pour en sortir
export default function EmptyState({ title, children, action }) {
  return (
    <div className="flex animate-fade-up flex-col items-center gap-4 rounded-card border-3 border-dashed border-ink bg-card px-6 py-12 text-center">
      <span className="grid size-16 rotate-6 place-items-center border-3 border-ink bg-creme text-3xl shadow-poster" aria-hidden="true">
        ✶
      </span>
      <div className="flex flex-col gap-2">
        <p className="poster-title text-3xl">{title}</p>
        {children && <div className="font-medium text-muted">{children}</div>}
      </div>
      {action}
    </div>
  )
}
