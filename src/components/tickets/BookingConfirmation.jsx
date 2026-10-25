import BaseButton from '../base/BaseButton.jsx'
import Icon from '../base/Icon.jsx'
import { computeTotal, findPass, formatPrice } from '../../utils/booking.js'
import { dayLabel } from '../../utils/concerts.js'

// Confirmation : ce qui a été réservé, où arrivent les billets, et la suite
export default function BookingConfirmation({ order, onRestart }) {
  const { booking, number } = order
  const pass = findPass(booking.passId)

  return (
    <div role="status" className="mx-auto flex max-w-xl animate-fade-up flex-col items-center gap-5 rounded-card border border-success/40 bg-surface p-8 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-success/15 text-success">
        <Icon name="check" className="size-7" />
      </span>
      <h1 tabIndex={-1} className="font-display text-3xl font-extrabold outline-none">
        C&rsquo;est réservé, {booking.name.trim().split(' ')[0]} !
      </h1>
      <p className="text-muted">
        {pass.name}
        {pass.needsDay ? ` du ${dayLabel(booking.day).toLowerCase()}` : ''} pour {booking.adults + booking.youths} personne
        {booking.adults + booking.youths > 1 ? 's' : ''}, soit <span className="font-bold text-craie">{formatPrice(computeTotal(booking))}</span>.
        Les billets arrivent à <span className="font-bold text-craie break-all">{booking.email}</span>.
      </p>
      <p className="rounded-xl border border-dashed border-line-strong px-4 py-2 font-mono text-lg">
        Commande <span className="font-bold text-bulle-300">{number}</span>
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
