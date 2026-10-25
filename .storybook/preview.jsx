import '@fontsource-variable/bricolage-grotesque'
import '../src/style.css'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  // Chaque story est rendue sur le fond du site, avec la couleur de texte du site
  decorators: [
    (Story) => (
      <div className="bg-ink p-6 text-craie">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    // Le panneau Accessibility fait échouer la story en cas de violation
    a11y: { test: 'error' },
    controls: { matchers: { color: /(background|color)$/i } },
  },
}

export default preview
