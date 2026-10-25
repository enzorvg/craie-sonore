import { useState } from 'react'
import ConcertCard from './ConcertCard.jsx'
import concerts from '../../data/concerts.json'

const tessa = concerts.find((concert) => concert.artist === 'Tessa Volta')
const longName = concerts.find((concert) => concert.artist.startsWith('Les Sept Collines'))
const headliner = concerts.find((concert) => concert.headliner)

export default {
  title: 'Programmation/ConcertCard',
  component: ConcertCard,
  args: { concert: tessa, isInPlanning: false, onTogglePlanning: () => {}, onOpen: () => {} },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
}

export const Default = {}
export const InPlanning = { name: 'Dans le planning', args: { isInPlanning: true } }
export const Headliner = { name: 'Tête d’affiche', args: { concert: headliner } }
export const LongName = { name: 'Nom très long', args: { concert: longName } }
export const Interactive = {
  name: 'Interactif',
  render: (args) => {
    const [isInPlanning, setIsInPlanning] = useState(false)
    return <ConcertCard {...args} isInPlanning={isInPlanning} onTogglePlanning={() => setIsInPlanning(!isInPlanning)} />
  },
}
