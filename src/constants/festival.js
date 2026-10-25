// Constantes du festival : textes, correspondances données → styles, tarifs.
// Les classes Tailwind sont écrites en entier pour que Tailwind les détecte.

export const ALL = 'Tous'

// Ordre fixe des jours (l'ordre alphabétique serait faux)
export const DAYS = [
  { value: 'vendredi', label: 'Ven. 9', long: 'Vendredi 9 juillet' },
  { value: 'samedi', label: 'Sam. 10', long: 'Samedi 10 juillet' },
  { value: 'dimanche', label: 'Dim. 11', long: 'Dimanche 11 juillet' },
]

export const GENRES = ['Électro', 'Rock', 'Hip-hop', 'Pop', 'Jazz']

export const SORTS = [
  { value: 'time', label: 'Par horaire' },
  { value: 'name', label: 'Par artiste (A → Z)' },
]

// Genre → couleurs (tokens --color-genre-*)
export const GENRE_STYLES = {
  Électro: { dot: 'bg-genre-electro', text: 'text-genre-electro', bar: 'bg-genre-electro' },
  Rock: { dot: 'bg-genre-rock', text: 'text-genre-rock', bar: 'bg-genre-rock' },
  'Hip-hop': { dot: 'bg-genre-hiphop', text: 'text-genre-hiphop', bar: 'bg-genre-hiphop' },
  Pop: { dot: 'bg-genre-pop', text: 'text-genre-pop', bar: 'bg-genre-pop' },
  Jazz: { dot: 'bg-genre-jazz', text: 'text-genre-jazz', bar: 'bg-genre-jazz' },
}

// Les 3 formules de pass. tone : clé de la variante SASS du PassCard ($pass-tones)
export const PASSES = [
  {
    id: 'jour',
    tone: 'jour',
    name: 'Pass 1 jour',
    price: 39,
    needsDay: true,
    perks: ['Un jour au choix', 'Grande Scène et Kiosque', 'Caves selon les places'],
  },
  {
    id: 'festival',
    tone: 'festival',
    name: 'Pass 3 jours',
    price: 95,
    highlight: 'Le plus choisi',
    perks: ['Les 3 jours', 'Toutes les scènes', 'Accès prioritaire aux Caves'],
  },
  {
    id: 'caves',
    tone: 'caves',
    name: 'Pass Caves',
    price: 49,
    perks: ['Les 3 soirées des Caves', '80 places par soir', 'Visite guidée des crayères'],
  },
]

// Tarif jeune (12-17 ans) : moitié prix. Moins de 12 ans : gratuit, sans billet.
export const YOUTH_RATE = 0.5
export const SHUTTLE_PRICE = 4
export const MAX_TICKETS = 8

export const NAV_LINKS = [
  { view: 'accueil', label: 'Accueil', icon: 'home' },
  { view: 'programmation', label: 'Programmation', icon: 'music' },
  { view: 'planning', label: 'Mon planning', icon: 'heart' },
  { view: 'billetterie', label: 'Billetterie', icon: 'ticket' },
]
