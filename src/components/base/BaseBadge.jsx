// Étiquette d'information non interactive, déclinée en tons.
// La couleur ne porte jamais seule le sens : le texte le dit aussi.
const tones = {
  neutral: 'border-line-strong bg-white/5 text-craie',
  brand: 'border-bulle-400/50 bg-bulle-400/15 text-bulle-300',
  success: 'border-success/40 bg-success/10 text-success',
  warning: 'border-warning/40 bg-warning/10 text-warning',
  danger: 'border-danger/40 bg-danger/10 text-danger',
}

export default function BaseBadge({ tone = 'neutral', children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${tones[tone]}`}>
      {children}
    </span>
  )
}
