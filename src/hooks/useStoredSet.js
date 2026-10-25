import { useEffect, useState } from 'react'

function read(key) {
  try {
    return new Set(JSON.parse(localStorage.getItem(key)) ?? [])
  } catch {
    return new Set()
  }
}

// Un Set d'ids gardé dans le navigateur : le planning survit au rechargement
export function useStoredSet(key) {
  const [set, setSet] = useState(() => read(key))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify([...set]))
    } catch {
      // Navigation privée ou stockage plein : le planning reste en mémoire
    }
  }, [key, set])

  // On ne modifie jamais l'état en place : on crée un nouveau Set
  function toggle(id) {
    setSet((previous) => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return [set, toggle]
}
