import { MAX_TICKETS, PASSES, SHUTTLE_PRICE, YOUTH_RATE } from '../constants/festival.js'

export const EMPTY_BOOKING = { passId: '', day: '', adults: 1, youths: 0, shuttle: false, name: '', email: '', terms: false }

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
  if (booking.name.trim().length < 2) errors.name = 'Indiquez votre nom et prénom.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(booking.email.trim())) errors.email = 'Indiquez un e-mail valide, par exemple nom@exemple.fr.'
  if (!booking.terms) errors.terms = 'Acceptez les conditions de vente pour continuer.'

  return errors
}
