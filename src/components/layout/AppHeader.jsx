import Logo from './Logo.jsx'
import BaseButton from '../base/BaseButton.jsx'
import { NAV_LINKS } from '../../constants/festival.js'

// Desktop : navigation en haut. Mobile : seulement le logo, la navigation est dans MobileTabBar (zone du pouce).
// Billetterie en bouton secondaire : l'appel à l'action principal reste celui de chaque écran.
export default function AppHeader({ view, planningCount }) {
  const links = NAV_LINKS.filter((link) => link.view !== 'accueil' && link.view !== 'billetterie')

  return (
    <header className="sticky top-0 z-40 border-b-3 border-ink bg-paper">
      <div className="container-page flex items-center justify-between gap-4 py-2">
        <Logo />

        <nav className="hidden md:block" aria-label="Navigation principale">
          <ul className="flex items-center gap-1 text-sm">
            {links.map((link) => (
              <li key={link.view}>
                <a
                  href={`#${link.view}`}
                  aria-current={view === link.view ? 'page' : undefined}
                  className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-card px-4 font-extrabold tracking-wide uppercase transition hover:bg-paper-deep aria-[current=page]:bg-ink aria-[current=page]:text-creme"
                >
                  {link.label}
                  {link.view === 'planning' && planningCount > 0 && (
                    <span className="grid min-w-6 place-items-center border-2 border-ink bg-bleu-300 px-1 text-xs font-black text-ink">
                      <span className="sr-only">(</span>
                      {planningCount}
                      <span className="sr-only"> concerts)</span>
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Conteneur : hidden ne doit pas entrer en conflit avec le inline-flex du bouton */}
        <div className="hidden md:block">
          <BaseButton href="#billetterie" size="sm" variant="secondary" aria-current={view === 'billetterie' ? 'page' : undefined}>
            Billetterie
          </BaseButton>
        </div>
      </div>
    </header>
  )
}
