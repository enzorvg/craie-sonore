import EmptyState from './EmptyState.jsx'
import BaseButton from '../base/BaseButton.jsx'

export default {
  title: 'États/EmptyState',
  component: EmptyState,
}

export const NoResults = {
  name: 'Aucun résultat',
  args: {
    title: 'Aucun concert ne correspond',
    children: <p>Filtres actifs : Dimanche 11 juillet + Électro</p>,
    action: <BaseButton>Réinitialiser les filtres</BaseButton>,
  },
}
export const EmptyPlanning = {
  name: 'Planning vide',
  args: {
    title: 'Votre planning est vide',
    children: <p>Touchez le cœur d’un concert pour l’ajouter ici.</p>,
    action: <BaseButton href="#programmation">Parcourir la programmation</BaseButton>,
  },
}
