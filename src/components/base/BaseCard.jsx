// Conteneur de carte. tone : default, highlight (mis en avant), muted (secondaire)
const tones = {
  default: 'border-ink bg-card',
  highlight: 'border-ink bg-card shadow-poster-lg',
  muted: 'border-dashed border-ink bg-transparent',
}

export default function BaseCard({ as: Tag = 'article', tone = 'default', className = '', children, ...rest }) {
  return (
    <Tag className={`relative flex flex-col overflow-hidden rounded-card border-3 transition ${tones[tone]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
