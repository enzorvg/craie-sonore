import BaseCard from './BaseCard.jsx'

export default {
  title: 'Base/BaseCard',
  component: BaseCard,
  args: { tone: 'default' },
  argTypes: { tone: { control: 'inline-radio', options: ['default', 'highlight', 'muted'] } },
  render: (args) => (
    <BaseCard {...args} className="max-w-sm gap-2 p-5">
      <h3 className="poster-title text-3xl text-bleu-600">Les Caves</h3>
      <p className="font-medium">80 places à 20 m sous terre, dans la craie.</p>
    </BaseCard>
  ),
}

export const Default = {}
export const Highlight = { args: { tone: 'highlight' } }
export const Muted = { args: { tone: 'muted' } }
