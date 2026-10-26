import { useRef, useState } from 'react'
import PageHeading from '../layout/PageHeading.jsx'
import BaseField from '../base/BaseField.jsx'
import Icon from '../base/Icon.jsx'
import PassCard from './PassCard.jsx'
import TicketCounter from './TicketCounter.jsx'
import CheckboxField from './CheckboxField.jsx'
import BookingSummary from './BookingSummary.jsx'
import BookingConfirmation from './BookingConfirmation.jsx'
import { DAYS, MAX_TICKETS, PASSES, SHUTTLE_PRICE } from '../../constants/festival.js'
import { EMPTY_BOOKING, findPass, validateBooking } from '../../utils/booking.js'

// Libellés des champs, réutilisés dans le résumé des erreurs
const FIELD_LABELS = { passId: 'Formule', day: 'Jour', adults: 'Billets', lastName: 'Nom', firstName: 'Prénom', email: 'E-mail', terms: 'Conditions de vente' }
// Champ à atteindre depuis le résumé des erreurs
const FIELD_TARGETS = { passId: 'pass-jour', day: 'day', adults: 'adults-label', lastName: 'lastName', firstName: 'firstName', email: 'email', terms: 'terms' }

function fieldsetClass(hasError) {
  return `flex flex-col gap-5 rounded-card border-3 bg-card p-5 ${hasError ? 'border-danger' : 'border-ink'}`
}

export default function TicketsPage() {
  const [booking, setBooking] = useState(EMPTY_BOOKING)
  // status : 'editing' → 'sending' (chargement) → 'done' (confirmation)
  const [status, setStatus] = useState('editing')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [order, setOrder] = useState(null)
  // Champs déjà quittés une fois : leur erreur s'affiche sans attendre l'envoi
  const [touched, setTouched] = useState(() => new Set())
  const summaryRef = useRef(null)

  // Erreurs dérivées : un champ affiche la sienne dès qu'on l'a quitté, tout s'affiche après un premier envoi.
  // Elles se mettent ensuite à jour à chaque saisie.
  const allErrors = validateBooking(booking)
  const errors = hasSubmitted ? allErrors : Object.fromEntries(Object.entries(allErrors).filter(([key]) => touched.has(key)))
  // Le résumé en haut du formulaire n'apparaît qu'après un envoi
  const errorKeys = hasSubmitted ? Object.keys(errors) : []
  const pass = findPass(booking.passId)

  function update(field, value) {
    setBooking((previous) => ({ ...previous, [field]: value }))
  }

  function touch(field) {
    setTouched((previous) => new Set(previous).add(field))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setHasSubmitted(true)

    if (Object.keys(validateBooking(booking)).length > 0) {
      // Le focus va sur le résumé des erreurs, annoncé par les lecteurs d'écran
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    // Pas de serveur : on simule l'envoi pour montrer l'état de chargement
    setStatus('sending')
    setTimeout(() => {
      setOrder({ booking, number: `CB-${Date.now().toString(36).slice(-6).toUpperCase()}` })
      setStatus('done')
      window.scrollTo(0, 0)
      requestAnimationFrame(() => document.querySelector('main h1')?.focus())
    }, 900)
  }

  function restart() {
    setBooking(EMPTY_BOOKING)
    setHasSubmitted(false)
    setTouched(new Set())
    setOrder(null)
    setStatus('editing')
  }

  if (status === 'done') {
    return (
      <section className="container-page py-10 md:py-14">
        <BookingConfirmation order={order} onRestart={restart} />
      </section>
    )
  }

  return (
    <section className="container-page flex flex-col gap-6 py-10 md:py-14">
      <PageHeading eyebrow="Billetterie" title="Prendre mon pass">
        Trois étapes, moins de deux minutes. Tarif jeune à moitié prix, gratuit pour les moins de 12 ans.
      </PageHeading>

      {errorKeys.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="flex flex-col gap-2 rounded-card border-3 border-danger bg-card p-4 outline-none focus-visible:ring-4 focus-visible:ring-danger">
          <p className="flex items-center gap-2 font-extrabold text-danger uppercase">
            <Icon name="alert" />
            {errorKeys.length > 1 ? `${errorKeys.length} points à corriger :` : '1 point à corriger :'}
          </p>
          <ul className="flex flex-col gap-1 pl-7 text-sm">
            {errorKeys.map((key) => (
              <li key={key}>
                <a href={`#${FIELD_TARGETS[key]}`} className="focus-ring rounded underline underline-offset-2" onClick={(event) => {
                  event.preventDefault()
                  document.getElementById(FIELD_TARGETS[key])?.focus()
                }}>
                  {FIELD_LABELS[key]} : {errors[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form noValidate onSubmit={handleSubmit} className="grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="flex flex-col gap-6">
          <fieldset className={fieldsetClass(errors.passId || errors.day)}>
            <legend className="poster-title bg-ink px-3 py-1 text-xl text-creme">1. Votre formule</legend>
            <div className="grid gap-6 px-2 pt-4 sm:grid-cols-3">
              {PASSES.map((item) => (
                <PassCard key={item.id} pass={item} checked={booking.passId === item.id} onChange={(value) => update('passId', value)} />
              ))}
            </div>
            {errors.passId && <p className="text-sm font-bold text-danger">{errors.passId}</p>}
            {pass?.needsDay && (
              <BaseField as="select" id="day" label="Jour de votre pass" value={booking.day} error={errors.day} onChange={(event) => update('day', event.target.value)}>
                <option value="">Choisir un jour</option>
                {DAYS.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.long}
                  </option>
                ))}
              </BaseField>
            )}
          </fieldset>

          <fieldset className={fieldsetClass(errors.adults)}>
            <legend className="poster-title bg-ink px-3 py-1 text-xl text-creme">2. Vos billets</legend>
            <TicketCounter id="adults" label="Adultes" hint="18 ans et plus" value={booking.adults} max={MAX_TICKETS - booking.youths} onChange={(value) => update('adults', value)} />
            <TicketCounter id="youths" label="Jeunes" hint="12 à 17 ans, moitié prix" value={booking.youths} max={MAX_TICKETS - booking.adults} onChange={(value) => update('youths', value)} />
            {errors.adults && <p className="text-sm font-bold text-danger">{errors.adults}</p>}
            <CheckboxField id="shuttle" checked={booking.shuttle} onChange={(value) => update('shuttle', value)}>
              Ajouter la navette Reims centre ↔ festival ({SHUTTLE_PRICE} € aller-retour par personne)
            </CheckboxField>
          </fieldset>

          <fieldset className={fieldsetClass(errors.lastName || errors.firstName || errors.email || errors.terms)}>
            <legend className="poster-title bg-ink px-3 py-1 text-xl text-creme">3. Vos coordonnées</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <BaseField
                id="lastName"
                label="Nom"
                autoComplete="family-name"
                value={booking.lastName}
                error={errors.lastName}
                onChange={(event) => update('lastName', event.target.value)}
                onBlur={() => touch('lastName')}
              />
              <BaseField
                id="firstName"
                label="Prénom"
                autoComplete="given-name"
                value={booking.firstName}
                error={errors.firstName}
                onChange={(event) => update('firstName', event.target.value)}
                onBlur={() => touch('firstName')}
              />
            </div>
            <BaseField
              id="email"
              type="email"
              label="E-mail"
              hint="Vos billets arrivent à cette adresse."
              autoComplete="email"
              inputMode="email"
              value={booking.email}
              placeholder="nom@exemple.fr"
              error={errors.email}
              onChange={(event) => update('email', event.target.value)}
              onBlur={() => touch('email')}
            />
            <CheckboxField id="terms" checked={booking.terms} error={errors.terms} onChange={(value) => update('terms', value)}>
              J&rsquo;accepte les conditions de vente (billets non remboursables)
            </CheckboxField>
          </fieldset>
        </div>

        <BookingSummary booking={booking} isSending={status === 'sending'} />
      </form>
    </section>
  )
}
