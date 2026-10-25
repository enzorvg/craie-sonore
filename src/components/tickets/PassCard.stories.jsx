import { useState } from 'react'
import PassCard from './PassCard.jsx'
import { PASSES } from '../../constants/festival.js'

export default {
  title: 'Billetterie/PassCard (SASS)',
  component: PassCard,
  args: { pass: PASSES[0], checked: false, onChange: () => {} },
}

// Une carte seule : largeur d'une colonne du formulaire
const narrow = [(Story) => <div className="max-w-xs px-4"><Story /></div>]

export const Unchecked = { decorators: narrow, name: 'Non sélectionné' }
export const Checked = { decorators: narrow, name: 'Sélectionné', args: { checked: true } }
export const Highlighted = { decorators: narrow, name: 'Mise en avant', args: { pass: PASSES[1], checked: true } }
export const Caves = { decorators: narrow, args: { pass: PASSES[2], checked: true } }
export const Disabled = { decorators: narrow, name: 'Désactivé (complet)', args: { pass: PASSES[2], disabled: true } }
export const Focus = {
  decorators: narrow,
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('input').focus()
  },
}
export const Group = {
  name: 'Choix entre les 3 formules',
  decorators: [(Story) => <div className="max-w-3xl px-4"><Story /></div>],
  render: () => {
    const [value, setValue] = useState('festival')
    return (
      <fieldset className="grid gap-6 sm:grid-cols-3">
        <legend className="mb-4 font-bold">Votre formule</legend>
        {PASSES.map((pass) => (
          <PassCard key={pass.id} pass={pass} checked={value === pass.id} onChange={setValue} />
        ))}
      </fieldset>
    )
  },
}
