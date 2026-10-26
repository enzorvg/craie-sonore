import { ALL, DAYS } from '../constants/festival.js'

// « Électro » → « electro » : recherche insensible à la casse et aux accents
export function normalize(text) {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
}

// Un concert qui finit après minuit (« 00:30 ») se termine le lendemain : on ajoute 24 h
export function toMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return (hours < 6 ? hours + 24 : hours) * 60 + minutes
}

function dayIndex(concert) {
  return DAYS.findIndex((day) => day.value === concert.day)
}

// Tri chronologique : le jour d'abord, puis l'heure de début
export function compareByTime(a, b) {
  return dayIndex(a) - dayIndex(b) || toMinutes(a.start) - toMinutes(b.start)
}

export function compareByName(a, b) {
  return a.artist.localeCompare(b.artist, 'fr')
}

// Filtres combinables : jour + genre + scène + recherche, puis tri
export function filterConcerts(concerts, { day, genre, stage, query, sort }) {
  const needle = normalize(query)

  const visible = concerts.filter((concert) => {
    const matchesDay = day === ALL || concert.day === day
    const matchesGenre = genre === ALL || concert.genre === genre
    const matchesStage = stage === ALL || concert.stage === stage
    // On cherche un artiste, un genre ou une scène (pas la ville d'origine)
    const haystack = normalize([concert.artist, concert.genre, concert.stage].join(' '))
    return matchesDay && matchesGenre && matchesStage && haystack.includes(needle)
  })

  return visible.sort(sort === 'name' ? compareByName : compareByTime)
}

// Nombre de pages (au moins 1, même sans résultat)
export function pageCount(total, size) {
  return Math.max(1, Math.ceil(total / size))
}

// Les éléments de la page demandée (pages numérotées à partir de 1)
export function paginate(items, page, size) {
  return items.slice((page - 1) * size, page * size)
}

// Deux concerts du même jour se chevauchent si l'un commence avant la fin de l'autre
export function overlaps(a, b) {
  return a.day === b.day && toMinutes(a.start) < toMinutes(b.end) && toMinutes(b.start) < toMinutes(a.end)
}

// Ids des concerts du planning qui en chevauchent un autre
export function findConflicts(concerts) {
  return new Set(
    concerts.filter((concert) => concerts.some((other) => other.id !== concert.id && overlaps(concert, other))).map((concert) => concert.id),
  )
}

// Regroupe par jour, dans l'ordre du festival : [{ day, concerts }]
export function groupByDay(concerts) {
  return DAYS.map((day) => ({ day, concerts: concerts.filter((concert) => concert.day === day.value).sort(compareByTime) })).filter(
    (group) => group.concerts.length > 0,
  )
}

export function dayLabel(value, format = 'long') {
  return DAYS.find((day) => day.value === value)?.[format] ?? value
}

export function plural(count, word) {
  return `${count} ${word}${count > 1 ? 's' : ''}`
}
