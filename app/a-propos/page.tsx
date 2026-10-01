import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, HeartHandshake, Ruler } from "lucide-react";
import CtaDevis from "@/components/CtaDevis";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { COMPANY } from "@/config/site";
import { asset, route } from "@/lib/asset";

export const metadata: Metadata = {
  title: "À propos",
  description: `Découvrez ${COMPANY.name} : atelier de fabrication métallique sur mesure au Cameroun — portes, portails, grilles, structures et mobilier.`,
};

const VALUES = [
  { icon: Hammer, title: "Travail d'atelier", text: "Découpe, soudure, assemblage et finition : chaque ouvrage passe entre nos mains avant livraison." },
  { icon: Ruler, title: "Sur mesure", text: "Pas de standard imposé : dimensions, motifs et finitions s'adaptent à votre projet et votre budget." },
  { icon: HeartHandshake, title: "Proximité", text: "Un interlocuteur unique, joignable par téléphone ou WhatsApp, de la demande à la pose." },
];

const GALLERY = [
  { src: "/site/structure-kiosque.jpeg", alt: "Ossature métallique en cours de fabrication" },
  { src: "/site/panneau-geometrique.jpeg", alt: "Panneau en cours d'assemblage en atelier" },
  { src: "/site/toles-embouties-brutes.jpeg", alt: "Panneaux en tôles embouties avant assemblage" },
  { src: "/site/toles-grille-atelier.jpeg", alt: "Ouvrages en fabrication devant l'atelier" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="L'atelier FABIOLE METAL"
        lead="Une entreprise de fabrication métallique qui mise sur le travail bien fait : mesurer juste, souder propre, livrer solide."
        image="/site/structure-kiosque.jpeg"
        imageAlt="Atelier FABIOLE METAL"
      />

      <section className="bg-sable-50 py-20 sm:py-24" aria-label="Notre histoire">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="zoom-frame aspect-[4/3]">
              <Image src={asset("/site/porte-fenetre-installees.jpeg")} alt="Porte et fenêtre à volutes installées par FABIOLE METAL" width={900} height={675} className="h-full w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Qui sommes-nous"
              title="Des fabricants, pas des revendeurs"
              lead="FABIOLE METAL est un atelier de fabrication métallique basé à Bojongo, Douala. Nous transformons profilés, tôles et fers en ouvrages finis : portes d'entrée, portails, grilles de protection, ossatures, barbecues et objets utilitaires."
            />
            <Reveal delay={100} className="mt-6 space-y-4 text-sm leading-relaxed text-charbon-600 sm:text-base">
              <p>
                Notre approche est simple : comprendre votre besoin, proposer une fabrication adaptée,
                puis réaliser l&apos;ouvrage avec soin — soudures propres, dimensions exactes, finition
                peinture durable.
              </p>
              <p>
                Chaque photo de ce site vient de notre atelier : ce que vous voyez, c&apos;est ce que
                nous savons faire.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={route("/realisations")} className="btn btn-outline-dark">
                Voir nos réalisations
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href={route("/devis")} className="btn btn-primary">
                Demander un devis
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24" aria-label="Nos valeurs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Nos engagements" title="Trois principes, zéro compromis" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100} className="border-t-4 border-rouille-500 bg-sable-50 p-8">
                <v.icon size={32} className="text-rouille-500" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold uppercase text-charbon-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charbon-600">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charbon-950 py-20 sm:py-24" aria-label="L'atelier en images">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading dark eyebrow="En images" title="L'atelier, matière première de notre qualité" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((img, i) => (
              <Reveal key={img.src} delay={(i % 4) * 100} className="zoom-frame relative aspect-square">
                <Image src={asset(img.src)} alt={img.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" loading="lazy" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaDevis />
    </>
  );
}
