import { useEffect, useRef } from 'react'
import concerts from './data/concerts.json'
import { useHashView } from './hooks/useHashView.js'
import { useStoredSet } from './hooks/useStoredSet.js'
import AppHeader from './components/layout/AppHeader.jsx'
import MobileTabBar from './components/layout/MobileTabBar.jsx'
import AppFooter from './components/layout/AppFooter.jsx'
import HomePage from './components/home/HomePage.jsx'
import ProgrammePage from './components/programme/ProgrammePage.jsx'
import PlanningPage from './components/planning/PlanningPage.jsx'
import TicketsPage from './components/tickets/TicketsPage.jsx'

const VIEWS = ['accueil', 'programmation', 'planning', 'billetterie']

export default function App() {
  const view = useHashView(VIEWS)
  // Le planning est ici, dans le plus haut composant qui en a besoin :
  // ProgrammePage l'alimente, PlanningPage l'affiche, le header compte ses concerts
  const [planning, togglePlanning] = useStoredSet('craie-sonore-planning')
  const isFirstRender = useRef(true)

  // Changement d'écran : retour en haut et focus sur le titre (annoncé par les lecteurs d'écran)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    window.scrollTo(0, 0)
    document.querySelector('main h1')?.focus()
  }, [view])

  return (
    <>
      <a href="#contenu" className="focus-ring sr-only rounded-lg bg-bulle-400 px-4 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50">
        Aller au contenu
      </a>
      <AppHeader view={view} planningCount={planning.size} />
      <main id="contenu" className="pb-8">
        {view === 'accueil' && <HomePage concerts={concerts} />}
        {view === 'programmation' && <ProgrammePage concerts={concerts} planning={planning} onTogglePlanning={togglePlanning} />}
        {view === 'planning' && <PlanningPage concerts={concerts} planning={planning} onTogglePlanning={togglePlanning} />}
        {view === 'billetterie' && <TicketsPage />}
      </main>
      <AppFooter />
      <MobileTabBar view={view} planningCount={planning.size} />
    </>
  )
}
