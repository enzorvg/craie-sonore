// Étiquette d'information non interactive, déclinée en tons.
// La couleur ne porte jamais seule le sens : le texte le dit aussi.
const tones = {
  neutral: 'bg-card text-ink',
  brand: 'bg-creme text-ink',
  success: 'bg-card text-success',
  warning: 'bg-creme text-warning',
  danger: 'bg-card text-danger',
}

export default function BaseBadge({ tone = 'neutral', children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 border-2 border-ink px-2 py-0.5 text-xs font-extrabold tracking-wide uppercase ${tones[tone]}`}>
      {children}
    </span>
  )
}
