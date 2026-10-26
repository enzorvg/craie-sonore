import BaseButton from '../base/BaseButton.jsx'
import BaseCard from '../base/BaseCard.jsx'
import StageExplorer from './StageExplorer.jsx'
import { DAYS } from '../../constants/festival.js'
import { compareByTime } from '../../utils/concerts.js'

const MARQUEE = ['Le Cabaret Bleu', '9 · 10 · 11 juillet 2027', 'Reims', 'Parc de Champagne', '16 concerts', '3 scènes']

// Bandeau défilant : décoratif (aria-hidden), le texte est déjà dans la page.
// Le contenu est doublé pour que la boucle (translateX -50 %) ne montre aucun trou.
function Marquee() {
  return (
    <div className="overflow-hidden border-b-3 border-ink bg-ink py-3 text-creme" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <p key={copy} className="poster-title flex shrink-0 items-center text-2xl sm:text-3xl">
            {MARQUEE.map((item) => (
              <span key={item} className="flex items-center">
                <span className="px-5">{item}</span>
                <span className="text-bleu-300">✶</span>
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  )
}

// Accueil : l'affiche du festival. Un seul appel à l'action principal : le pass.
export default function HomePage({ concerts, planning, onTogglePlanning }) {
  // Valeur dérivée : l'affiche jour par jour, la tête d'affiche d'abord puis les autres par horaire
  const lineup = DAYS.map((day) => {
    const ofDay = concerts.filter((concert) => concert.day === day.value).sort(compareByTime)
    return { day, headliner: ofDay.find((concert) => concert.headliner), others: ofDay.filter((concert) => !concert.headliner) }
  })

  return (
    <>
      <section className="relative overflow-hidden border-b-3 border-ink bg-bleu-600 text-card">
        {/* Soleil rayonnant en fond, comme sur une affiche de festival (décoratif) */}
        <div className="sunburst absolute inset-0 opacity-60 [--sun-at:85%_110%]" aria-hidden="true"></div>
        <div className="absolute -right-24 -bottom-24 hidden size-80 rounded-full md:block border-3 border-ink bg-bleu-300 sm:size-[28rem]" aria-hidden="true"></div>
        <div className="absolute -right-10 -bottom-10 hidden size-44 rounded-full md:block border-3 border-ink bg-creme sm:size-64" aria-hidden="true"></div>
        <div className="container-page relative flex flex-col gap-8 py-12 md:py-20">
          <p className="eyebrow">Reims · Parc de Champagne</p>
          <h1 tabIndex={-1} className="poster-title text-[clamp(4.5rem,19vw,12rem)] outline-none">
            <span className="block text-[0.32em] tracking-[0.2em]">Le</span>
            Cabaret
            <span className="block text-creme">Bleu</span>
          </h1>
          <p className="poster-title text-3xl sm:text-5xl">9 · 10 · 11 juillet 2027</p>
          <p className="max-w-xl text-lg font-medium">
            Trois nuits, trois scènes, seize concerts : du rap sur la pelouse, du rock sous le chapiteau et du jazz au fond des
            caves de craie.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <BaseButton href="#billetterie" size="lg" variant="secondary">
              Prendre mon pass, dès 39 €
            </BaseButton>
            <a href="#programmation" className="focus-ring inline-flex min-h-12 items-center justify-center px-2 font-extrabold tracking-wide uppercase underline decoration-3 underline-offset-6 hover:text-creme">
              Voir la programmation
            </a>
          </div>

          {/* Sticker collé de travers, comme sur une affiche */}
          <p className="absolute top-10 right-6 hidden size-40 rotate-12 place-items-center rounded-full border-3 border-ink bg-creme text-center text-ink shadow-poster lg:grid">
            <span className="poster-title text-3xl">
              16 concerts
              <span className="block text-lg">3 scènes</span>
            </span>
          </p>
        </div>
      </section>

      <Marquee />

      <section aria-labelledby="affiche-title" className="container-page flex flex-col gap-8 py-14">
        <h2 id="affiche-title" className="poster-title text-5xl sm:text-6xl">
          L&rsquo;affiche
        </h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {lineup.map(({ day, headliner, others }) => (
            <li key={day.value}>
              <BaseCard tone="highlight" className="h-full gap-4 p-6 text-center">
                <h3 className="eyebrow mx-auto">{day.long}</h3>
                {headliner && <p className="poster-title text-5xl text-bleu-600 break-words">{headliner.artist}</p>}
                {/* Chaque nom reste d'un bloc : il ne se coupe jamais au milieu */}
                <ul className="poster-title flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-2xl/tight">
                  {others.map((concert, index) => (
                    <li key={concert.id} className="flex items-center gap-2">
                      {index > 0 && <span className="text-bleu-400" aria-hidden="true">✶</span>}
                      <span className="text-balance">{concert.artist}</span>
                    </li>
                  ))}
                </ul>
              </BaseCard>
            </li>
          ))}
        </ol>
        <BaseButton href="#programmation" variant="secondary" className="self-center">
          Toute la programmation et les horaires
        </BaseButton>
      </section>

      <section aria-labelledby="scenes-title" className="border-t-3 border-ink bg-paper-deep py-14">
        <div className="container-page flex flex-col gap-8">
          <h2 id="scenes-title" className="poster-title text-5xl sm:text-6xl">
            Trois scènes
          </h2>
          <p className="max-w-2xl font-medium">
            Choisissez une scène pour voir qui y joue, jour par jour. Le cœur ajoute un concert à votre planning.
          </p>
          <StageExplorer concerts={concerts} planning={planning} onTogglePlanning={onTogglePlanning} />
        </div>
      </section>
    </>
  )
}
