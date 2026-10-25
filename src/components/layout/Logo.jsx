// Logo : le nom du festival composé comme un tampon, une étoile crème sur un carré bleu
export default function Logo() {
  return (
    <a href="#accueil" className="focus-ring flex min-h-11 items-center gap-2 rounded-card">
      <svg className="size-9 shrink-0" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" className="fill-bleu-600" />
        <path d="M16 4l2.9 8.1L27 12l-6.4 5.2L23 26l-7-4.9L9 26l2.4-8.8L5 12l8.1.1z" className="fill-creme" />
      </svg>
      <span className="poster-title flex flex-col text-[1.35rem] leading-[0.85]">
        <span className="text-xs tracking-[0.3em] font-sans font-black">Le</span>
        Cabaret Bleu
      </span>
    </a>
  )
}
