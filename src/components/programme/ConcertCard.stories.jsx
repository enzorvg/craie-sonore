import { useState } from 'react'
import ConcertCard from './ConcertCard.jsx'
import concerts from '../../data/concerts.json'

const fontaines = concerts.find((concert) => concert.artist === 'Fontaines D.C.')
const longName = concerts.find((concert) => concert.artist.startsWith('King Gizzard'))
const headliner = concerts.find((concert) => concert.headliner)

// Un vrai composant (nom en majuscule) pour pouvoir utiliser useState
function InteractiveCard(args) {
  const [isInPlanning, setIsInPlanning] = useState(false)
  return <ConcertCard {...args} isInPlanning={isInPlanning} onTogglePlanning={() => setIsInPlanning(!isInPlanning)} />
}

export default {
  title: 'Programmation/ConcertCard',
  component: ConcertCard,
  args: { concert: fontaines, isInPlanning: false, onTogglePlanning: () => {}, onOpen: () => {} },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
}

export const Default = {}
export const InPlanning = { name: 'Dans le planning', args: { isInPlanning: true } }
export const Headliner = { name: 'Tête d’affiche', args: { concert: headliner } }
export const LongName = { name: 'Nom très long', args: { concert: longName } }
export const Interactive = {
  name: 'Interactif',
  render: (args) => <InteractiveCard {...args} />,
}
