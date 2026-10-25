import Icon from '../base/Icon.jsx'
import { NAV_LINKS } from '../../constants/festival.js'

// Barre d'onglets en bas de l'écran sur mobile : à portée de pouce, 4 destinations, 56 px de haut
export default function MobileTabBar({ view, planningCount }) {
  return (
    <nav aria-label="Navigation mobile" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <ul className="grid grid-cols-4">
        {NAV_LINKS.map((link) => (
          <li key={link.view}>
            <a
              href={`#${link.view}`}
              aria-current={view === link.view ? 'page' : undefined}
              className="focus-ring relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-muted aria-[current=page]:text-bulle-300"
            >
              <Icon name={link.icon} filled={view === link.view} />
              {link.view === 'planning' ? 'Planning' : link.label.replace('Programmation', 'Programme')}
              {link.view === 'planning' && planningCount > 0 && (
                <span className="absolute top-1.5 left-1/2 ml-2 grid min-w-5 place-items-center rounded-full bg-corail-400 px-1 text-[0.7rem] font-bold text-ink">
                  {planningCount}
                  <span className="sr-only"> concerts</span>
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
