// Logo : trois bulles de champagne, comme le favicon
export default function Logo() {
  return (
    <a href="#accueil" className="focus-ring flex min-h-11 items-center gap-2 rounded-lg font-display text-lg font-extrabold tracking-tight">
      <svg className="size-8" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" className="fill-surface-raised" />
        <circle cx="11" cy="20" r="4" className="fill-bulle-400" />
        <circle cx="19" cy="12" r="3" className="fill-bulle-400" />
        <circle cx="23" cy="21" r="2" className="fill-corail-400" />
      </svg>
      Craie Sonore
    </a>
  )
}
