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

// Les 3 scènes. id : utilisé dans l'URL (#programmation?scene=caves) ; name : la valeur des données
export const STAGES = [
  {
    id: 'scene-bleue',
    name: 'La Scène Bleue',
    short: 'Scène Bleue',
    text: 'En plein air, face à la pelouse. Les têtes d’affiche, chaque soir.',
    place: 'Grande pelouse du parc',
    capacity: '12 000 personnes',
    color: 'bg-bleu-600 text-card',
  },
  {
    id: 'chapiteau',
    name: 'Le Chapiteau',
    short: 'Chapiteau',
    text: 'Rock, rap et électro sous la toile, jusqu’à 2 h du matin.',
    place: 'Sous la toile, côté bois',
    capacity: '3 000 personnes',
    color: 'bg-bleu-300 text-ink',
  },
  {
    id: 'caves',
    name: 'Les Caves',
    short: 'Caves',
    text: '80 places à 20 m sous terre, dans la craie. Jazz en petit comité.',
    place: '20 m sous terre, dans la craie',
    capacity: '80 places assises',
    color: 'bg-ink text-creme',
  },
]

// Nombre de concerts par page dans la programmation
export const PAGE_SIZE = 6

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
