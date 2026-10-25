import { GENRE_STYLES } from '../../constants/festival.js'

// Genre musical : un carré de couleur + le nom (la couleur ne porte jamais seule le sens)
export default function GenreBadge({ genre }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-extrabold uppercase">
      <span className={`size-3 border-2 border-ink ${GENRE_STYLES[genre]?.bg ?? 'bg-paper-deep'}`} aria-hidden="true"></span>
      {genre}
    </span>
  )
}
