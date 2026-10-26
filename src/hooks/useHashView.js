import { useEffect, useState } from 'react'

const DEFAULT_VIEW = 'accueil'

function readView(views) {
  // « #programmation?scene=caves » : la vue est avant le « ? », les paramètres sont lus par l'écran
  const hash = window.location.hash.slice(1).split('?')[0]
  return views.includes(hash) ? hash : DEFAULT_VIEW
}

// La vue affichée suit l'ancre de l'URL (#programmation) : les liens restent de vrais liens,
// le bouton Retour du navigateur fonctionne et on peut partager une page.
export function useHashView(views) {
  const [view, setView] = useState(() => readView(views))

  useEffect(() => {
    function handleHashChange() {
      setView(readView(views))
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [views])

  return view
}
