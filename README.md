# FABIOLE METAL — Site vitrine

Site vitrine professionnel de **FABIOLE METAL**, atelier de fabrication métallique sur mesure
(Bojongo, Douala – Cameroun) : portes, portails, fenêtres & grilles, structures, mobilier, soudure.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (design system graphite + rouille, déduit du logo)
- **Export statique** (`output: "export"`) — hébergeable partout sans serveur Node
- Formulaire de devis via **Formspree** (`https://formspree.io/f/xzezqlbv`)

## Développement local (sans préfixe)

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build local / XAMPP (sans préfixe)

```bash
npm run build    # génère ./out
```

Copier le contenu de `out/` dans le dossier servi par Apache.

## Build GitHub Pages (préfixe /fabiole)

```bash
$env:NEXT_PUBLIC_BASE_PATH="/fabiole"; npm run build
```

En production, le déploiement est automatique via **GitHub Actions**
(`.github/workflows/deploy.yml`) à chaque push sur `main` :
`https://dev-jahsauve.github.io/fabiole`

Penser à activer **Settings → Pages → Source : GitHub Actions** sur le dépôt.

## Structure

```
app/                  routes (/, /a-propos, /services, /realisations, /devis, /contact)
  services/[slug]/    page détail par service
  realisations/[slug]/ page détail par réalisation
assets/               ORIGINAUX (ne jamais supprimer)
public/site/          copies web renommées (images + vidéos hero)
config/site.ts        coordonnées, WhatsApp, Formspree, navigation, SEO
data/services.ts      les 6 services (source unique)
data/realisations.ts  les 12 réalisations + catégories + estimations
components/           Navbar, Footer, HeroVideo, cartes, filtres, QuoteForm…
```

## Coordonnées (centralisées dans `config/site.ts`)

- Tél : +237 678 02 71 16 · WhatsApp : même numéro
- Email : fabioletsakeutiobo664@gmail.com
- Atelier : Mairie de Bojongo, Douala – Cameroun
