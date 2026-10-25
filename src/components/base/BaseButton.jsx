// Bouton du design system : une API courte (variant, size) plutôt que des classes libres
const variants = {
  primary: 'bg-bulle-400 text-ink shadow-glow hover:bg-bulle-300',
  secondary: 'border border-line-strong text-craie hover:bg-white/10',
  ghost: 'text-bulle-300 hover:bg-bulle-400/10 hover:text-craie',
}
// Toutes les tailles gardent une cible tactile d'au moins 44 px (min-h-11)
const sizes = { sm: 'min-h-11 px-4 text-sm', md: 'min-h-11 px-5 text-sm', lg: 'min-h-12 px-6 text-base' }

export default function BaseButton({ variant = 'primary', size = 'md', href, type = 'button', className = '', children, ...rest }) {
  const classes = `focus-ring inline-flex items-center justify-center gap-2 rounded-full text-center font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`

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
