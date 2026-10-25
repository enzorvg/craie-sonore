import styles from './PassCard.module.scss'
import { formatPrice } from '../../utils/booking.js'

// Une formule de pass, sélectionnable comme un bouton radio (stylée en SASS, voir PassCard.module.scss)
export default function PassCard({ pass, name = 'pass', checked = false, disabled = false, onChange }) {
  return (
    <label className={`${styles.card} ${styles[pass.tone]}`}>
      <input
        id={`pass-${pass.id}`}
        type="radio"
        name={name}
        value={pass.id}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(pass.id)}
        className={styles.input}
      />
      <span className={styles.header}>
        <span className={styles.name}>{pass.name}</span>
        <span className={styles.check} aria-hidden="true"></span>
      </span>
      {pass.highlight && <span className={styles.highlight}>{pass.highlight}</span>}
      <span>
        <span className={styles.price}>{formatPrice(pass.price)}</span>
        <span className={styles.unit}>par adulte</span>
      </span>
      <ul className={styles.perks}>
        {pass.perks.map((perk) => (
          <li key={perk}>{perk}</li>
        ))}
      </ul>
    </label>
  )
}
