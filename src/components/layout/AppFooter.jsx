// Pied de page : le nom du festival en très grand, comme le bas d'une affiche
export default function AppFooter() {
  return (
    <footer className="overflow-hidden border-t-3 border-ink bg-bleu-800 pt-10 pb-24 text-card md:pb-10">
      <div className="container-page flex flex-col gap-6">
        <p className="poster-title text-[clamp(3rem,13vw,9rem)] text-creme" aria-hidden="true">
          Cabaret Bleu
        </p>
        <div className="flex flex-col gap-2 text-sm font-semibold sm:flex-row sm:justify-between">
          <p>Le Cabaret Bleu · 9, 10 et 11 juillet 2027 · Parc de Champagne, Reims</p>
          <p>Projet étudiant ESGI : festival fictif, programmation imaginaire.</p>
        </div>
      </div>
    </footer>
  )
}
