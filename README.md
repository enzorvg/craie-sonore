# Le Cabaret Bleu : festival de musique à Reims (projet fictif)

Projet noté TailwindCSS & SASS, ESGI Reims, Enzo Ravignon.
Festival fictif de 3 jours (9 au 11 juillet 2027), 16 concerts, 3 scènes (la Scène Bleue, le Chapiteau, les Caves).
Les artistes existent, mais la programmation est imaginaire : aucun d'eux n'est annoncé à ce festival.
Identité visuelle inspirée des affiches de festivals (Cabaret Vert, Rose Festival, Dream Nation) : uniquement du bleu (du ciel pâle au bleu nuit) et de la crème, police condensée Anton.

## Lancer le projet

```bash
npm install
npm run dev              # site sur http://localhost:5173
npm run storybook        # design system sur http://localhost:6006
npm run build            # build de production dans dist/
```

## Stack

Vite, React 19, Tailwind 4 (tokens dans `@theme`, `src/style.css`), `sass-embedded`, Storybook 10 + addon Accessibility.

## Les 4 écrans (navigation par ancre, `useHashView`)

| Écran | Rôle |
| --- | --- |
| `#accueil` | affiche du festival, programmation jour par jour, CTA « Prendre mon pass » |
| `#programmation` | écran interactif : filtres jour + genre combinables, recherche, tri, modale de détail, état vide |
| `#planning` | concerts choisis (cœur), groupés par jour, chevauchements signalés, état vide |
| `#billetterie` | formulaire de réservation : validation, erreurs, chargement, confirmation |

## Organisation

```
src/
├── style.css                 tokens @theme + utilitaires maison
├── styles/_tokens.scss       partial SASS : tokens Tailwind → variables SASS
├── styles/_mixins.scss       partial SASS : focus-ring, ombre d'affiche, encoche de billet
├── data/concerts.json        16 concerts
├── constants/festival.js     jours, genres, tarifs, classes Tailwind écrites en entier
├── utils/                    concerts.js (filtres, tri, chevauchements), booking.js (total, validation)
├── hooks/                    useHashView (écran courant), useStoredSet (planning en localStorage)
└── components/
    ├── base/                 BaseButton, BaseCard, BaseBadge, BaseChip(+Group), BaseField, Icon
    ├── layout/               AppHeader, MobileTabBar, AppFooter, PageHeading, Logo
    ├── home/ programme/ planning/ tickets/ shared/
    └── tickets/PassCard.module.scss   le composant stylé en SASS (@use, mixins, calculs, @each sur une map de maps)
```

## Mise en ligne

En ligne sur GitHub Pages : https://enzorvg.github.io/craie-sonore/
Le workflow `.github/workflows/deploy.yml` rebuild et redéploie le site à chaque push sur `main`.
