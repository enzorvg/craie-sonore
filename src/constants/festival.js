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

// Genre → nuance de bleu ou de crème (tokens --color-genre-*), et la couleur de texte lisible dessus
export const GENRE_STYLES = {
  Électro: { bg: 'bg-genre-electro', text: 'text-ink' },
  Rock: { bg: 'bg-genre-rock', text: 'text-creme' },
  'Hip-hop': { bg: 'bg-genre-hiphop', text: 'text-card' },
  Pop: { bg: 'bg-genre-pop', text: 'text-ink' },
  Jazz: { bg: 'bg-genre-jazz', text: 'text-ink' },
}

// Les 3 formules de pass. tone : clé de la variante SASS du PassCard ($pass-tones)
export const PASSES = [
  {
    id: 'jour',
    tone: 'jour',
    name: 'Pass 1 jour',
    price: 39,
    needsDay: true,
    perks: ['Un jour au choix', 'Scène Bleue et Chapiteau', 'Caves selon les places'],
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
    perks: ['Les 3 concerts des Caves', '80 places par soir', 'Une coupe offerte au bar des Caves'],
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
