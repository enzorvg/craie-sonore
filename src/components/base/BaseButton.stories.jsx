import BaseButton from './BaseButton.jsx'

export default {
  title: 'Base/BaseButton',
  component: BaseButton,
  args: { children: 'Prendre mon pass', variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
}

export const Primary = {}
export const Secondary = { args: { variant: 'secondary', children: 'Voir le concert' } }
export const Ghost = { args: { variant: 'ghost', children: 'Réinitialiser les filtres' } }
export const Large = { args: { size: 'lg', children: 'Prendre mon pass, dès 39 €' } }
export const Disabled = { args: { disabled: true, children: 'Réservation en cours…' } }
export const AsLink = { name: 'Lien (href)', args: { href: '#billetterie', children: 'Billetterie' } }
export const LongLabel = {
  name: 'Libellé très long',
  args: { children: 'Ajouter Les Sept Collines Électriques du Nord-Est à mon planning du samedi' },
  decorators: [(Story) => <div className="max-w-xs"><Story /></div>],
}
// Focus clavier : la story place le focus sur le bouton pour montrer l'anneau
export const Focus = {
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('button').focus()
  },
}
