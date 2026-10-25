import Logo from './Logo.jsx'
import BaseButton from '../base/BaseButton.jsx'
import { NAV_LINKS } from '../../constants/festival.js'

// Desktop : navigation en haut. Mobile : seulement le logo, la navigation est dans MobileTabBar (zone du pouce).
export default function AppHeader({ view, planningCount }) {
  const links = NAV_LINKS.filter((link) => link.view !== 'accueil' && link.view !== 'billetterie')

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="container-page flex items-center justify-between gap-4 py-2">
        <Logo />

        <nav className="hidden md:block" aria-label="Navigation principale">
          <ul className="flex items-center gap-2 text-sm">
            {links.map((link) => (
              <li key={link.view}>
                <a
                  href={`#${link.view}`}
                  aria-current={view === link.view ? 'page' : undefined}
                  className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-semibold text-muted transition hover:text-craie aria-[current=page]:bg-surface-raised aria-[current=page]:text-craie"
                >
                  {link.label}
                  {link.view === 'planning' && planningCount > 0 && (
                    <span className="grid min-w-6 place-items-center rounded-full bg-corail-400 px-1.5 text-xs font-bold text-ink">
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

        <BaseButton href="#billetterie" size="sm" variant={view === 'billetterie' ? 'secondary' : 'primary'}>
          Billetterie
        </BaseButton>
      </div>
    </header>
  )
}
