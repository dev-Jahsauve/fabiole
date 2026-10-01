// ─── Réalisations FABIOLE METAL ────────────────────────────────────────────
// Projets déjà livrés, tous illustrés par de vraies photos du dossier assets.
// - estimation : fourchette indicative en FCFA (jamais un prix officiel).
// - materials / dimensions / location / year : renseignés UNIQUEMENT si connus.
//   Champs absents => la page détail masque la ligne correspondante.

export interface Estimation {
  min: number;
  max: number;
}

export interface Realisation {
  slug: string;
  title: string;
  category: string; // clé de CATEGORIES
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  materials?: string[];
  estimation?: Estimation;
  featured?: boolean;
}

export const CATEGORIES = [
  { key: "toutes", label: "Toutes" },
  { key: "portes", label: "Portes" },
  { key: "portails", label: "Portails" },
  { key: "fenetres-grilles", label: "Fenêtres & grilles" },
  { key: "structures", label: "Structures" },
  { key: "mobilier", label: "Mobilier & utilitaire" },
  { key: "autres", label: "Autres" },
] as const;

export function categoryLabel(key: string): string {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

export const REALISATIONS: Realisation[] = [
  {
    slug: "porte-double-battants-barreaux",
    title: "Porte double battants à barreaux",
    category: "portes",
    image: "/site/porte-double-noire.jpeg",
    gallery: ["/site/porte-double-noire.jpeg", "/site/porte-fenetre-installees.jpeg"],
    shortDescription:
      "Porte d'entrée double battants en acier, barreaux verticaux et motifs décoratifs, finition noire.",
    description:
      "Porte d'entrée double battants fabriquée en atelier : cadre acier, barreaux ronds verticaux, soubassement en tôle pleine orné de rosaces, serrure intégrée. Un modèle à la fois sécurisant et décoratif, typique du savoir-faire FABIOLE METAL.",
    materials: ["Acier", "Tôle", "Peinture"],
    estimation: { min: 150000, max: 350000 },
    featured: true,
  },
  {
    slug: "portail-panneaux-modernes",
    title: "Portail moderne à panneaux",
    category: "portails",
    image: "/site/portail-moderne-noir.jpeg",
    gallery: ["/site/portail-moderne-noir.jpeg"],
    shortDescription:
      "Grand portail en tôle pleine avec lames ajourées et renforts cintrés, installé sur site.",
    description:
      "Portail de clôture au design contemporain : panneaux en tôle pleine rythmés de lames horizontales ajourées et de renforts cintrés, finition sombre. Fabriqué en atelier puis installé entre piliers maçonnés.",
    materials: ["Acier", "Tôle", "Peinture"],
    estimation: { min: 800000, max: 2500000 },
    featured: true,
  },
  {
    slug: "porte-fenetre-volutes-posees",
    title: "Porte et fenêtre à volutes posées",
    category: "portes",
    image: "/site/porte-fenetre-installees.jpeg",
    gallery: [
      "/site/porte-fenetre-installees.jpeg",
      "/site/grille-fenetre-volutes.jpeg",
    ],
    shortDescription:
      "Ensemble porte d'entrée et grille de fenêtre en fer forgé à volutes, posés sur une maison.",
    description:
      "Ensemble coordonné porte d'entrée et grille de fenêtre en fer forgé : volutes et cercles, soubassement en tôle, serrure et poignée. Photographié après installation, preuve d'une fabrication ajustée aux ouvertures réelles.",
    materials: ["Fer forgé", "Tôle", "Peinture"],
    estimation: { min: 120000, max: 300000 },
    featured: true,
  },
  {
    slug: "grille-fenetre-fer-forge",
    title: "Grille de fenêtre en fer forgé",
    category: "fenetres-grilles",
    image: "/site/grille-fenetre-volutes.jpeg",
    gallery: ["/site/grille-fenetre-volutes.jpeg"],
    shortDescription:
      "Grille de fenêtre double panneau à volutes et rosaces, fabrication d'atelier.",
    description:
      "Grille de fenêtre en fer forgé : double panneau symétrique à volutes, rosaces centrales et montants torsadés. Une pièce soignée qui sécurise l'ouverture tout en l'habillant.",
    materials: ["Fer forgé"],
    estimation: { min: 50000, max: 150000 },
  },
  {
    slug: "panneau-decoratif-geometrique",
    title: "Panneau décoratif géométrique",
    category: "fenetres-grilles",
    image: "/site/panneau-geometrique.jpeg",
    gallery: ["/site/panneau-geometrique.jpeg"],
    shortDescription:
      "Panneau en profilés assemblés à motifs géométriques, style contemporain.",
    description:
      "Panneau décoratif assemblé en profilés acier selon un motif géométrique contemporain, photographié brut de soudure en atelier. Base idéale pour grille moderne, garde-corps ou élément décoratif.",
    materials: ["Profilés acier"],
  },
  {
    slug: "ossature-kiosque-abri",
    title: "Ossature de kiosque / abri",
    category: "structures",
    image: "/site/structure-kiosque.jpeg",
    gallery: ["/site/structure-kiosque.jpeg"],
    shortDescription:
      "Ossature complète en profilés acier pour kiosque ou abri, assemblée en atelier.",
    description:
      "Ossature complète en profilés acier : poteaux, traverses et cadres de façade assemblés et soudés en atelier avant montage. Une structure d'équerre, prête à recevoir toiture et habillage.",
    materials: ["Profilés acier"],
    estimation: { min: 500000, max: 1500000 },
    featured: true,
  },
  {
    slug: "coffre-rangement-moto",
    title: "Coffre de rangement pour moto",
    category: "mobilier",
    image: "/site/coffre-moto.jpeg",
    gallery: ["/site/coffre-moto.jpeg"],
    shortDescription:
      "Caisson métallique avec couvercle et serrure, adapté au porte-bagages d'une moto.",
    description:
      "Coffre de rangement en tôle avec couvercle et serrure, dimensionné pour le porte-bagages d'une moto : une fabrication utilitaire simple et robuste, typique des commandes sur mesure du quotidien.",
    materials: ["Tôle", "Peinture"],
    estimation: { min: 25000, max: 60000 },
  },
  {
    slug: "barbecue-grill-mobile",
    title: "Barbecue / grill mobile",
    category: "mobilier",
    image: "/site/barbecue-mobile.jpeg",
    gallery: ["/site/barbecue-mobile.jpeg"],
    shortDescription:
      "Grill sur pieds avec grille amovible, étagère basse et poignées, finition brune.",
    description:
      "Barbecue mobile en acier : cuve perforée, grille de cuisson amovible, piétement avec étagère de rangement et poignées latérales. Finition peinture, prêt à l'emploi.",
    materials: ["Acier", "Peinture"],
    estimation: { min: 40000, max: 90000 },
    featured: true,
  },
  {
    slug: "supports-foyer-marmite",
    title: "Supports de foyer pour marmites",
    category: "autres",
    image: "/site/supports-marmite.jpeg",
    gallery: ["/site/supports-marmite.jpeg"],
    shortDescription:
      "Supports métalliques artisanaux pour la cuisson au feu de bois.",
    description:
      "Supports de foyer en fer rond pour marmites, destinés à la cuisson au feu de bois : une petite fabrication artisanale robuste, réalisée à l'atelier.",
    materials: ["Fer rond"],
  },
  {
    slug: "toles-embouties-decoratives",
    title: "Panneaux en tôles embouties",
    category: "portes",
    image: "/site/toles-embouties-brutes.jpeg",
    gallery: ["/site/toles-embouties-brutes.jpeg", "/site/toles-grille-atelier.jpeg"],
    shortDescription:
      "Panneaux de portes en tôle emboutie à motifs, prêts pour assemblage.",
    description:
      "Panneaux de portes en tôle emboutie aux motifs ornementaux (frises, rosaces, pointes) : la matière première des portes décoratives FABIOLE METAL, avant assemblage sur cadre.",
    materials: ["Tôle emboutie"],
  },
  {
    slug: "ensemble-toles-grille-atelier",
    title: "Portes et grille en atelier",
    category: "portes",
    image: "/site/toles-grille-atelier.jpeg",
    gallery: ["/site/toles-grille-atelier.jpeg"],
    shortDescription:
      "Ensemble de panneaux et grille en cours de fabrication devant l'atelier.",
    description:
      "Ensemble de panneaux en tôle emboutie et de grille à volutes photographié en atelier : plusieurs ouvrages en parallèle, du panneau brut à la grille assemblée.",
    materials: ["Tôle", "Fer forgé"],
  },
  {
    slug: "piece-technique-galvanisee",
    title: "Pièce technique galvanisée",
    category: "autres",
    image: "/site/piece-ronde-galvanisee.jpeg",
    gallery: ["/site/piece-ronde-galvanisee.jpeg"],
    shortDescription:
      "Élément circulaire assemblé en tôle galvanisée, fabrication spéciale.",
    description:
      "Pièce technique circulaire assemblée en tôle galvanisée avec cadre de renfort : une fabrication spéciale réalisée à l'atelier, illustrant la capacité à former et assembler des volumes.",
    materials: ["Tôle galvanisée"],
  },
];

export function getRealisation(slug: string): Realisation | undefined {
  return REALISATIONS.find((r) => r.slug === slug);
}

export function getRealisationSlugs(): string[] {
  return REALISATIONS.map((r) => r.slug);
}

export function formatFCFA(value: number): string {
  return `${value.toLocaleString("fr-FR").replace(/,/g, " ")} FCFA`;
}
