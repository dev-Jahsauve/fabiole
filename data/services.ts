// ─── Services FABIOLE METAL ────────────────────────────────────────────────
// Chaque service est adossé à au moins une vraie photo du dossier assets.
// Aucun service sans preuve photo (escaliers, garde-corps, charpentes exclus).

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  benefits: string[];
  category: string;
  order: number;
}

export const SERVICES: Service[] = [
  {
    slug: "portes-metalliques",
    title: "Portes métalliques",
    shortDescription:
      "Portes d'entrée et portes intérieures en acier, simples ou double battants, avec motifs décoratifs.",
    description:
      "FABIOLE METAL fabrique des portes métalliques robustes et soignées : portes d'entrée double battants à barreaux, portes décorées de motifs emboutis ou de fer forgé, adaptées aux maisons d'habitation comme aux locaux professionnels. Chaque porte est fabriquée sur mesure, avec serrure et finition peinture.",
    image: "/site/porte-double-noire.jpeg",
    gallery: [
      "/site/porte-double-noire.jpeg",
      "/site/porte-fenetre-installees.jpeg",
      "/site/toles-embouties-brutes.jpeg",
      "/site/toles-grille-atelier.jpeg",
    ],
    benefits: [
      "Fabrication sur mesure selon vos dimensions",
      "Motifs décoratifs au choix (emboutis, fer forgé, barreaux)",
      "Structure acier robuste et durable",
      "Finition peinture et pose possible",
    ],
    category: "Menuiserie métallique",
    order: 1,
  },
  {
    slug: "portails",
    title: "Portails métalliques",
    shortDescription:
      "Portails modernes en tôle et acier, pour sécuriser et valoriser votre entrée.",
    description:
      "FABIOLE METAL réalise des portails métalliques au design moderne : panneaux en tôle pleine avec découpes et renforts cintrés, battants ou coulissants selon votre terrain. Un portail robuste, esthétique, qui donne le ton dès l'entrée de votre propriété.",
    image: "/site/portail-moderne-noir.jpeg",
    gallery: ["/site/portail-moderne-noir.jpeg", "/site/structure-kiosque.jpeg"],
    benefits: [
      "Design moderne personnalisable",
      "Tôle pleine pour l'intimité et la sécurité",
      "Structure renforcée pour une longue durée de vie",
      "Installation sur site",
    ],
    category: "Menuiserie métallique",
    order: 2,
  },
  {
    slug: "fenetres-grilles",
    title: "Fenêtres & grilles de protection",
    shortDescription:
      "Grilles de fenêtres en fer forgé ou à motifs géométriques, sécurité et esthétique.",
    description:
      "Pour protéger vos ouvertures sans les dénaturer, FABIOLE METAL fabrique des grilles de fenêtres sur mesure : volutes en fer forgé pour un style classique, ou panneaux à motifs géométriques pour un style contemporain. Fabrication brute en atelier, finition et pose possibles.",
    image: "/site/grille-fenetre-volutes.jpeg",
    gallery: [
      "/site/grille-fenetre-volutes.jpeg",
      "/site/panneau-geometrique.jpeg",
      "/site/porte-fenetre-installees.jpeg",
    ],
    benefits: [
      "Sécurité renforcée pour fenêtres",
      "Styles classique (volutes) ou moderne (géométrique)",
      "Dimensions exactes de vos ouvertures",
      "Grilles assorties aux portes",
    ],
    category: "Menuiserie métallique",
    order: 3,
  },
  {
    slug: "structures-metalliques",
    title: "Structures & ossatures métalliques",
    shortDescription:
      "Ossatures, abris et kiosques en profilés acier, assemblés en atelier.",
    description:
      "FABIOLE METAL assemble des structures métalliques en profilés acier : ossatures de kiosques, abris, supports et charpentes légères. Les cadres sont soudés et ajustés en atelier avant montage, pour une structure d'équerre, stable et durable.",
    image: "/site/structure-kiosque.jpeg",
    gallery: ["/site/structure-kiosque.jpeg", "/site/panneau-geometrique.jpeg"],
    benefits: [
      "Assemblage soudé précis, vérifié en atelier",
      "Profilés acier dimensionnés selon l'usage",
      "Adapté aux kiosques, abris et extensions",
      "Montage et ajustement sur site",
    ],
    category: "Gros œuvre métallique",
    order: 4,
  },
  {
    slug: "mobilier-metallique",
    title: "Mobilier & ouvrages utilitaires",
    shortDescription:
      "Barbecues, coffres, supports et objets métalliques du quotidien, fabriqués sur mesure.",
    description:
      "Le savoir-faire FABIOLE METAL s'exprime aussi dans les objets utiles du quotidien : barbecues et grills mobiles, coffres de rangement (y compris pour deux-roues), supports de foyer et petites fabrications sur mesure. Des objets simples, solides, pensés pour durer.",
    image: "/site/barbecue-mobile.jpeg",
    gallery: [
      "/site/barbecue-mobile.jpeg",
      "/site/coffre-moto.jpeg",
      "/site/supports-marmite.jpeg",
    ],
    benefits: [
      "Objets robustes pour un usage intensif",
      "Dimensions et options sur mesure",
      "Finition peinture résistante",
      "Idéal particuliers et petits commerces",
    ],
    category: "Fabrication sur mesure",
    order: 5,
  },
  {
    slug: "soudure-reparation",
    title: "Soudure & réparation",
    shortDescription:
      "Travaux de soudure, assemblage et réparation d'ouvrages métalliques.",
    description:
      "FABIOLE METAL réalise vos travaux de soudure et d'assemblage : fabrication de pièces techniques, réparation et renforcement d'ouvrages existants, ajustements et finitions. Un travail d'atelier précis, du point de soudure propre à la pièce formée.",
    image: "/site/panneau-geometrique.jpeg",
    gallery: [
      "/site/panneau-geometrique.jpeg",
      "/site/piece-ronde-galvanisee.jpeg",
      "/site/toles-embouties-brutes.jpeg",
    ],
    benefits: [
      "Soudures propres et solides",
      "Réparation et renforcement d'ouvrages",
      "Pièces techniques sur plan ou modèle",
      "Devis avant intervention",
    ],
    category: "Atelier",
    order: 6,
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
