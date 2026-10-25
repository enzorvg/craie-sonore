import BaseButton from '../base/BaseButton.jsx'
import Icon from '../base/Icon.jsx'
import { computeTotal, findPass, formatPrice } from '../../utils/booking.js'
import { dayLabel } from '../../utils/concerts.js'

// Confirmation : ce qui a été réservé, où arrivent les billets, et la suite
export default function BookingConfirmation({ order, onRestart }) {
  const { booking, number } = order
  const pass = findPass(booking.passId)

  return (
    <div role="status" className="mx-auto flex max-w-xl animate-fade-up flex-col items-center gap-5 rounded-card border-3 border-ink bg-card p-8 text-center shadow-poster-lg">
      <span className="grid size-16 -rotate-6 place-items-center border-3 border-ink bg-creme text-ink shadow-poster">
        <Icon name="check" className="size-7" />
      </span>
      <h1 tabIndex={-1} className="poster-title text-5xl outline-none">
        C&rsquo;est réservé, {booking.name.trim().split(' ')[0]} !
      </h1>
      <p className="font-medium text-muted">
        {pass.name}
        {pass.needsDay ? ` du ${dayLabel(booking.day).toLowerCase()}` : ''} pour {booking.adults + booking.youths} personne
        {booking.adults + booking.youths > 1 ? 's' : ''}, soit <span className="font-extrabold text-ink">{formatPrice(computeTotal(booking))}</span>.
        Les billets arrivent à <span className="font-extrabold text-ink break-all">{booking.email}</span>.
      </p>
      <p className="border-3 border-dashed border-ink px-4 py-2 font-mono text-lg">
        Commande <span className="font-black text-bleu-600">{number}</span>
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <BaseButton href="#planning">Préparer mon planning</BaseButton>
        <BaseButton variant="ghost" onClick={onRestart}>
          Faire une autre réservation
        </BaseButton>
      </div>
    </div>
  )
}
