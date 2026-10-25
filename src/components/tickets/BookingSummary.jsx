import BaseButton from '../base/BaseButton.jsx'
import { SHUTTLE_PRICE, YOUTH_RATE } from '../../constants/festival.js'
import { computeTotal, findPass, formatPrice } from '../../utils/booking.js'
import { dayLabel } from '../../utils/concerts.js'

// Récapitulatif : chaque ligne est calculée à partir de la réservation reçue en props
export default function BookingSummary({ booking, isSending }) {
  const pass = findPass(booking.passId)
  const total = computeTotal(booking)
  const tickets = booking.adults + booking.youths

  return (
    <aside aria-labelledby="summary-title" className="flex flex-col gap-4 rounded-card border border-line bg-surface p-5 lg:sticky lg:top-20">
      <h2 id="summary-title" className="font-display text-lg font-extrabold">
        Récapitulatif
      </h2>
      {pass ? (
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{pass.name}{pass.needsDay && booking.day ? `, ${dayLabel(booking.day)}` : ''}</dt>
            <dd />
          </div>
          {booking.adults > 0 && (
            <div className="flex justify-between gap-4">
              <dt>{booking.adults} × adulte</dt>
              <dd className="font-semibold">{formatPrice(booking.adults * pass.price)}</dd>
            </div>
          )}
          {booking.youths > 0 && (
            <div className="flex justify-between gap-4">
              <dt>{booking.youths} × jeune (12-17 ans)</dt>
              <dd className="font-semibold">{formatPrice(booking.youths * pass.price * YOUTH_RATE)}</dd>
            </div>
          )}
          {booking.shuttle && tickets > 0 && (
            <div className="flex justify-between gap-4">
              <dt>{tickets} × navette</dt>
              <dd className="font-semibold">{formatPrice(tickets * SHUTTLE_PRICE)}</dd>
            </div>
          )}
        </dl>
      ) : (
        <p className="text-sm text-muted">Choisissez une formule pour voir le prix.</p>
      )}
      <p className="flex items-baseline justify-between border-t border-line pt-4">
        <span className="font-semibold">Total</span>
        <span className="font-display text-3xl font-extrabold text-bulle-300" aria-live="polite">
          {formatPrice(total)}
        </span>
      </p>
      <BaseButton type="submit" size="lg" disabled={isSending}>
        {isSending ? 'Réservation en cours…' : 'Confirmer la réservation'}
      </BaseButton>
      <p className="text-xs text-muted">Démonstration : aucun paiement n&rsquo;est demandé.</p>
    </aside>
  )
}
