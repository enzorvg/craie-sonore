import { GENRE_STYLES } from '../../constants/festival.js'

export default function GenreBadge({ genre }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-craie">
      <span className={`size-2.5 rounded-full ${GENRE_STYLES[genre]?.dot ?? 'bg-bulle-400'}`} aria-hidden="true"></span>
      {genre}
    </span>
  )
}
