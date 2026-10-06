// ─── FABIOLE METAL — configuration centrale ────────────────────────────────
// Toutes les coordonnées et infos entreprise sont ici. Aucun numéro, email
// ou adresse n'est dupliqué dans les composants : tout passe par ce fichier.

export const COMPANY = {
  name: "FABIOLE METAL",
  baseline: "Métal • Fabrication • Sur mesure • Cameroun",
  tagline: "Le métal façonné avec précision.",
  description:
    "FABIOLE METAL conçoit et fabrique des ouvrages métalliques sur mesure : portes, portails, fenêtres et grilles, structures, mobilier et travaux de soudure.",
  country: "Cameroun",
} as const;

// Téléphone officiel transmis par le client.
// WhatsApp : même numéro sauf indication contraire (facilement modifiable ici).
export const CONTACT = {
  phoneDisplay: "+237 678 02 71 16",
  phoneHref: "tel:+237678027116",
  whatsappNumber: "237678027116",
  email: "fabioletsakeutiobo664@gmail.com",
  // Localisation transmise : « à la mairie de Bojongo ».
  address: "Mairie de Bojongo, Douala – Cameroun",
  addressShort: "Bojongo, Douala",
  // Pas d'horaires officiels transmis : formulation neutre.
  hoursHint: "Contactez-nous pour convenir d'un rendez-vous.",
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Bonjour FABIOLE METAL, je souhaite discuter d'un projet métallique.";

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjygkkje";

export const SITE_URL = "https://dev-jahsauve.github.io/fabiole";

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/contact", label: "Contact" },
] as const;

// Vidéo du hero : permuter hero-1 / hero-2 ici si besoin après prévisualisation.
export const HERO = {
  video: "/site/hero-atelier-1.mp4",
  videoSecondary: "/site/hero-atelier-2.mp4",
  poster: "/site/portail-moderne-noir.jpeg",
} as const;

export const ESTIMATION_DISCLAIMER =
  "Estimation indicative : le montant réel dépend des dimensions, des matériaux, de la finition, de l'installation et des contraintes du projet. Ce n'est pas un prix officiel.";
