import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Ruler, Truck } from "lucide-react";
import ContactCards from "@/components/ContactCards";
import CtaDevis from "@/components/CtaDevis";
import HeroVideo from "@/components/HeroVideo";
import ProcessSteps from "@/components/ProcessSteps";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES } from "@/data/services";
import { REALISATIONS } from "@/data/realisations";
import { asset, route } from "@/lib/asset";

const MARQUEE_IMAGES = [
  { src: "/site/structure-kiosque.jpeg", alt: "Ossature métallique en fabrication" },
  { src: "/site/porte-double-noire.jpeg", alt: "Porte métallique double battants" },
  { src: "/site/portail-moderne-noir.jpeg", alt: "Portail métallique moderne" },
  { src: "/site/grille-fenetre-volutes.jpeg", alt: "Grille de fenêtre en fer forgé" },
  { src: "/site/barbecue-mobile.jpeg", alt: "Barbecue métallique mobile" },
  { src: "/site/panneau-geometrique.jpeg", alt: "Panneau décoratif géométrique en atelier" },
  { src: "/site/toles-embouties-brutes.jpeg", alt: "Tôles embouties décoratives" },
  { src: "/site/coffre-moto.jpeg", alt: "Coffre métallique sur mesure" },
];

const STRENGTHS = [
  { icon: Ruler, title: "Sur mesure", text: "Chaque ouvrage est fabriqué à vos dimensions exactes." },
  { icon: Award, title: "Finition soignée", text: "Soudures propres, ajustements précis, peinture." },
  { icon: Truck, title: "Livraison & pose", text: "Fabrication en atelier, installation sur site." },
];

export default function HomePage() {
  const featured = REALISATIONS.filter((r) => r.featured);

  return (
    <>
      <HeroVideo />

      {/* 2 — Présentation rapide */}
      <section id="presentation" className="scroll-mt-20 bg-sable-50 py-20 sm:py-24" aria-label="Présentation">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="relative">
            <div className="zoom-frame aspect-[4/5] max-h-[560px] w-full">
              <Image src={asset("/site/structure-kiosque.jpeg")} alt="Ossature métallique fabriquée par FABIOLE METAL" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden w-56 border-4 border-sable-50 sm:block">
              <Image src={asset("/site/porte-double-noire.jpeg")} alt="Porte métallique double battants" width={400} height={300} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </div>
            <span className="absolute -left-2 top-6 bg-rouille-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Atelier — Cameroun
            </span>
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="FABIOLE METAL"
              title="L'atelier qui donne forme à vos projets"
              lead="Portes, portails, grilles, structures, mobilier : nous fabriquons des ouvrages métalliques robustes et soignés, pensés pour durer et ajustés à vos besoins réels."
            />
            <div className="mt-8 space-y-5">
              {STRENGTHS.map((s, i) => (
                <Reveal key={s.title} delay={i * 100} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-charbon-950 text-rouille-400">
                    <s.icon size={22} aria-hidden="true" />
                  </span>
                  <span>
                    <strong className="font-display text-base font-semibold uppercase tracking-wide text-charbon-900">{s.title}</strong>
                    <span className="block text-sm text-charbon-600">{s.text}</span>
                  </span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200} className="mt-8">
              <Link href={route("/a-propos")} className="btn btn-outline-dark">
                En savoir plus
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — Savoir-faire en images (marquee) */}
      <section className="overflow-hidden border-y border-charbon-900/10 bg-white py-14" aria-label="Notre savoir-faire en images">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Atelier" title="Notre savoir-faire en images" />
        </div>
        <div className="relative mt-10">
          <div className="animate-marquee flex w-max gap-4 pr-4">
            {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((img, i) => (
              <div key={i} className="zoom-frame relative h-52 w-72 shrink-0 sm:h-60 sm:w-80" aria-hidden={i >= MARQUEE_IMAGES.length}>
                <Image src={asset(img.src)} alt={i < MARQUEE_IMAGES.length ? img.alt : ""} fill sizes="320px" className="object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
        </div>
      </section>

      {/* 4 — Services */}
      <section className="bg-sable-50 py-20 sm:py-24" aria-label="Nos services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nos services"
            title="Six savoir-faire, un seul atelier"
            lead="De la porte d'entrée à la structure complète, chaque ouvrage est fabriqué sur mesure dans notre atelier."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Processus */}
      <ProcessSteps />

      {/* 6 — Réalisations vedettes */}
      <section className="bg-white py-20 sm:py-24" aria-label="Nos réalisations">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nos réalisations"
            title="Des ouvrages livrés, des clients satisfaits"
            lead="Un aperçu de nos fabrications : portes, portails, grilles, structures et mobilier."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link href={route("/realisations")} className="btn btn-outline-dark">
              Toutes nos réalisations
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 7 — CTA devis */}
      <CtaDevis />

      {/* 8 — Contact */}
      <section className="bg-sable-50 py-20 sm:py-24" aria-label="Contact">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="Parlons de votre projet"
            lead="Appelez, écrivez ou passez à l'atelier : nous répondons à toute demande de devis."
          />
          <div className="mt-12">
            <ContactCards />
          </div>
        </div>
      </section>
    </>
  );
}
