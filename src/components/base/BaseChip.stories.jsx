import { useState } from 'react'
import BaseChip from './BaseChip.jsx'
import BaseChipGroup from './BaseChipGroup.jsx'

// Un vrai composant (nom en majuscule) pour pouvoir utiliser useState
function GenreGroup() {
  const [value, setValue] = useState('Tous')
  const options = ['Tous', 'Électro', 'Rock', 'Hip-hop', 'Pop', 'Jazz'].map((genre) => ({ value: genre, label: genre }))
  return <BaseChipGroup id="story-genre" label="Genre" options={options} value={value} onChange={setValue} />
}

export default {
  title: 'Base/BaseChip',
  component: BaseChip,
  args: { children: 'Électro', isActive: false },
}

export const Inactive = {}
export const Active = { args: { isActive: true } }
export const WithDot = {
  name: 'Avec pastille de couleur',
  render: (args) => (
    <BaseChip {...args}>
      <span className="size-2.5 rounded-full bg-genre-electro" aria-hidden="true"></span>
      Électro
    </BaseChip>
  ),
}
export const Disabled = { args: { disabled: true } }
export const Focus = {
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('button').focus()
  },
}

// Le groupe complet, interactif : un seul choix possible
export const Group = {
  name: 'Groupe (BaseChipGroup)',
  render: () => <GenreGroup />,
}
