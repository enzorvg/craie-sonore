// Conteneur de carte. tone : default, highlight (mis en avant), muted (secondaire)
const tones = {
  default: 'border-line bg-surface hover:border-line-strong',
  highlight: 'border-bulle-400/70 bg-surface shadow-glow',
  muted: 'border-dashed border-line-strong bg-transparent',
}

export default function BaseCard({ as: Tag = 'article', tone = 'default', className = '', children, ...rest }) {
  return (
    <Tag className={`relative flex flex-col overflow-hidden rounded-card border transition ${tones[tone]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
