import BaseBadge from './BaseBadge.jsx'

export default {
  title: 'Base/BaseBadge',
  component: BaseBadge,
  args: { tone: 'brand', children: 'Tête d’affiche' },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'brand', 'success', 'warning', 'danger'] } },
}

export const Brand = {}
export const Neutral = { args: { tone: 'neutral', children: 'Complet' } }
export const Success = { args: { tone: 'success', children: 'Réservé' } }
export const Warning = { args: { tone: 'warning', children: 'Chevauchement' } }
export const Danger = { args: { tone: 'danger', children: 'Annulé' } }
export const LongContent = {
  name: 'Contenu très long',
  args: { tone: 'neutral', children: 'Dernières places disponibles pour la soirée des Caves du samedi' },
}
export const AllTones = {
  name: 'Tous les tons',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <BaseBadge tone="neutral">Neutre</BaseBadge>
      <BaseBadge tone="brand">Marque</BaseBadge>
      <BaseBadge tone="success">Succès</BaseBadge>
      <BaseBadge tone="warning">Attention</BaseBadge>
      <BaseBadge tone="danger">Erreur</BaseBadge>
    </div>
  ),
}
