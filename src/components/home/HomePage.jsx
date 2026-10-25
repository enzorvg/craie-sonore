import BaseButton from '../base/BaseButton.jsx'
import BaseCard from '../base/BaseCard.jsx'
import Icon from '../base/Icon.jsx'
import { GENRE_STYLES } from '../../constants/festival.js'
import { dayLabel } from '../../utils/concerts.js'

const stats = [
  { label: 'Concerts', value: '16' },
  { label: 'Scènes', value: '3' },
  { label: 'Jours', value: '3' },
]

const stages = [
  { name: 'Grande Scène', text: 'En plein air, au cœur du parc. Les têtes d’affiche, chaque soir.' },
  { name: 'Le Kiosque', text: 'La scène des découvertes et des DJ sets sous les arbres.' },
  { name: 'Les Caves', text: '80 places à 20 m sous terre, dans les crayères. Jazz et acoustique.' },
]

// Accueil : la proposition de valeur en une phrase, un seul appel à l'action principal
export default function HomePage({ concerts }) {
  const headliners = concerts.filter((concert) => concert.headliner)

  return (
    <>
      <section className="container-page grid items-center gap-10 py-12 md:py-20 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-bulle-400/30 bg-bulle-400/10 px-3 py-1 text-sm font-semibold text-bulle-200">
            <Icon name="pin" className="size-4" />
            9, 10 et 11 juillet 2027 · Reims
          </p>
          <h1 tabIndex={-1} className="font-display text-4xl font-extrabold tracking-tight text-balance outline-none sm:text-6xl">
            Trois nuits de musique,{' '}
            <span className="text-bulle-400">du parc jusqu&rsquo;aux caves.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted">
            16 concerts rock, électro, hip-hop, pop et jazz sur 3 scènes, dont une creusée dans la craie. Composez votre planning, puis
            prenez votre pass.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <BaseButton href="#billetterie" size="lg">
              Prendre mon pass, dès 39 €
            </BaseButton>
            <a href="#programmation" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full px-4 font-semibold text-bulle-300 underline-offset-4 hover:underline">
              Voir la programmation
            </a>
          </div>
          <dl className="grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="font-display text-3xl font-extrabold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="flex flex-col gap-3" aria-label="Têtes d'affiche">
          {headliners.map((concert) => (
            <li key={concert.id}>
              <BaseCard className="flex-row items-center gap-4 p-4">
                <span className={`w-1.5 self-stretch rounded-full ${GENRE_STYLES[concert.genre].bar}`} aria-hidden="true"></span>
                <div className="flex flex-1 flex-col">
                  <p className="text-xs font-bold tracking-wide text-muted uppercase">
                    {dayLabel(concert.day)} · {concert.start}
                  </p>
                  <p className="font-display text-xl font-extrabold">{concert.artist}</p>
                  <p className={`text-sm font-semibold ${GENRE_STYLES[concert.genre].text}`}>{concert.genre}</p>
                </div>
              </BaseCard>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="scenes-title" className="container-page flex flex-col gap-6 border-t border-line py-12">
        <h2 id="scenes-title" className="font-display text-2xl font-extrabold">
          Trois scènes, trois ambiances
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {stages.map((stage) => (
            <li key={stage.name}>
              <BaseCard className="h-full gap-2 p-5">
                <h3 className="font-display text-lg font-bold text-bulle-300">{stage.name}</h3>
                <p className="text-muted">{stage.text}</p>
              </BaseCard>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
