import BaseField from './BaseField.jsx'

export default {
  title: 'Base/BaseField',
  component: BaseField,
  args: { id: 'email', label: 'E-mail', type: 'email', placeholder: 'nom@exemple.fr' },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
}

export const Default = {}
export const WithHint = { name: 'Avec aide', args: { hint: 'Vos billets arrivent à cette adresse.' } }
export const Filled = { name: 'Rempli', args: { defaultValue: 'bernard@exemple.fr' } }
export const Error = {
  name: 'Erreur',
  args: { defaultValue: 'bernard@exemple', error: 'Indiquez un e-mail valide, par exemple nom@exemple.fr.' },
}
export const Disabled = { args: { disabled: true, defaultValue: 'bernard@exemple.fr' } }
export const LongLabel = {
  name: 'Libellé très long',
  args: { id: 'long', type: 'text', label: 'Nom et prénom de la personne qui récupérera les billets à l’entrée du festival', placeholder: '' },
}
export const Select = {
  name: 'Liste déroulante',
  render: () => (
    <BaseField as="select" id="day" label="Jour de votre pass" defaultValue="">
      <option value="">Choisir un jour</option>
      <option value="vendredi">Vendredi 9 juillet</option>
      <option value="samedi">Samedi 10 juillet</option>
    </BaseField>
  ),
}
export const Focus = {
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('input').focus()
  },
}
