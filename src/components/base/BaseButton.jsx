// Bouton du design system : une API courte (variant, size) plutôt que des classes libres.
// Style « affiche » : bordure d'encre, ombre portée franche qui s'écrase au clic.
const variants = {
  primary: 'border-ink bg-bleu-600 text-card shadow-poster hover:bg-bleu-800 active:translate-x-1 active:translate-y-1 active:shadow-none',
  secondary: 'border-ink bg-card text-ink shadow-poster hover:bg-creme active:translate-x-1 active:translate-y-1 active:shadow-none',
  ghost: 'border-transparent text-bleu-600 underline decoration-2 underline-offset-4 hover:bg-paper-deep',
}
// Toutes les tailles gardent une cible tactile d'au moins 44 px (min-h-11)
const sizes = { sm: 'min-h-11 px-4 text-sm', md: 'min-h-11 px-5 text-sm', lg: 'min-h-13 px-6 text-base' }

export default function BaseButton({ variant = 'primary', size = 'md', href, type = 'button', className = '', children, ...rest }) {
  const classes = `focus-ring inline-flex items-center justify-center gap-2 rounded-card border-3 text-center font-extrabold tracking-wide uppercase transition disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`

  // Un lien si href est fourni (navigation), sinon un vrai bouton (action)
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
