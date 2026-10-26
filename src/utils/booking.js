import { MAX_TICKETS, PASSES, SHUTTLE_PRICE, YOUTH_RATE } from '../constants/festival.js'

export const EMPTY_BOOKING = { passId: '', day: '', adults: 1, youths: 0, shuttle: false, lastName: '', firstName: '', email: '', terms: false }

// Lettres (accents compris), espaces, tirets et apostrophes : « Le Goff », « Jean-Éric », « D'Arc »
const NAME_PATTERN = /^\p{L}+(?:[\s'’-]\p{L}+)*$/u

function validateName(value, field) {
  const name = value.trim()
  if (!name) return `Indiquez votre ${field}.`
  if (name.length < 2) return `Votre ${field} doit faire au moins 2 lettres.`
  if (!NAME_PATTERN.test(name)) return `Votre ${field} ne peut contenir que des lettres, des espaces, des tirets ou des apostrophes.`
  return null
}

// Partie avant le @ : lettres, chiffres et . _ % + - ; pas de point au début, à la fin ni deux à la suite
const EMAIL_LOCAL = /^[a-z0-9_%+-]+(?:\.[a-z0-9_%+-]+)*$/i
// Domaine : des parties séparées par des points (sans tiret au bord), puis une extension de 2 lettres ou plus
const EMAIL_DOMAIN = /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i

// Un message précis pour chaque erreur courante : l'utilisateur sait quoi corriger
export function validateEmail(value) {
  const email = value.trim()
  if (!email) return 'Indiquez votre e-mail, vos billets y seront envoyés.'
  if (/\s/.test(email)) return 'L’e-mail ne doit pas contenir d’espace.'
  const parts = email.split('@')
  if (parts.length !== 2) return parts.length < 2 ? 'Il manque le @, par exemple nom@exemple.fr.' : 'L’e-mail ne doit contenir qu’un seul @.'
  const [local, domain] = parts
  if (!local) return 'Il manque la partie avant le @.'
  if (!domain) return 'Il manque le domaine après le @, par exemple exemple.fr.'
  if (!domain.includes('.')) return 'Il manque l’extension du domaine, par exemple .fr ou .com.'
  if (local.length > 64 || email.length > 254 || !EMAIL_LOCAL.test(local) || !EMAIL_DOMAIN.test(domain)) {
    return 'Cet e-mail n’est pas valide, vérifiez-le (exemple : nom@exemple.fr).'
  }
  return null
}

export function findPass(passId) {
  return PASSES.find((pass) => pass.id === passId)
}

// Total calculé à partir des champs : une valeur dérivée, jamais stockée
export function computeTotal({ passId, adults, youths, shuttle }) {
  const pass = findPass(passId)
  if (!pass) return 0
  const tickets = adults + youths
  return adults * pass.price + youths * pass.price * YOUTH_RATE + (shuttle ? tickets * SHUTTLE_PRICE : 0)
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(amount)
}

// Renvoie { champ: message } ; un objet vide veut dire « formulaire valide ».
// Les messages disent quoi faire, pas seulement ce qui ne va pas.
export function validateBooking(booking) {
  const errors = {}
  const pass = findPass(booking.passId)
  const tickets = booking.adults + booking.youths

  if (!pass) errors.passId = 'Choisissez une formule de pass.'
  if (pass?.needsDay && !booking.day) errors.day = 'Choisissez le jour de votre pass.'
  if (tickets < 1) errors.adults = 'Ajoutez au moins un billet.'
  if (tickets > MAX_TICKETS) errors.adults = `${MAX_TICKETS} billets maximum par commande.`
  const lastNameError = validateName(booking.lastName, 'nom')
  if (lastNameError) errors.lastName = lastNameError
  const firstNameError = validateName(booking.firstName, 'prénom')
  if (firstNameError) errors.firstName = firstNameError
  const emailError = validateEmail(booking.email)
  if (emailError) errors.email = emailError
  if (!booking.terms) errors.terms = 'Acceptez les conditions de vente pour continuer.'

  return errors
}
