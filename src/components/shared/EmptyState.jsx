// État vide utile : il dit ce qui se passe et donne une seule action pour en sortir
export default function EmptyState({ title, children, action }) {
  return (
    <div className="flex animate-fade-up flex-col items-center gap-4 rounded-card border border-dashed border-line-strong px-6 py-12 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-bulle-400/10 text-2xl" aria-hidden="true">
        ♪
      </span>
      <div className="flex flex-col gap-1">
        <p className="font-display text-xl font-extrabold">{title}</p>
        {children && <div className="text-muted">{children}</div>}
      </div>
      {action}
    </div>
  )
}
