// Titre de chaque écran. tabIndex -1 : App y place le focus quand on change d'écran,
// pour que le lecteur d'écran annonce la nouvelle page.
export default function PageHeading({ eyebrow, title, children }) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 tabIndex={-1} className="poster-title text-5xl text-balance outline-none sm:text-7xl">
        {title}
      </h1>
      {children && <p className="max-w-2xl text-lg font-medium text-muted">{children}</p>}
    </div>
  )
}
