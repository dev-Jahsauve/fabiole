import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { COMPANY, SITE_URL } from "@/config/site";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

const oswald = Oswald({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.name} — Fabrication métallique sur mesure au Cameroun`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
  keywords: ["FABIOLE METAL", "fabrication métallique", "portes métalliques", "portails", "grilles", "structures métalliques", "soudure", "Cameroun", "Douala", "Bojongo", "devis"],
  authors: [{ name: COMPANY.name }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: COMPANY.name,
    title: `${COMPANY.name} — ${COMPANY.tagline}`,
    description: COMPANY.description,
    images: [{ url: `${SITE_URL}/site/portail-moderne-noir.jpeg`, width: 1200, height: 630, alt: COMPANY.name }],
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/site/logo.jpeg`, type: "image/jpeg" },
    ],
    apple: [{ url: `${basePath}/site/logo.jpeg` }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${oswald.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
