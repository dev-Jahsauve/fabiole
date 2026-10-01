import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { asset, route } from "@/lib/asset";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
  imageAlt: string;
}

// Bandeau de page intérieure : image d'atelier + overlay + fil d'Ariane.
export default function PageHero({ eyebrow, title, lead, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-charbon-950 pt-18" aria-label={title}>
      <div className="absolute inset-0">
        <Image src={asset(image)} alt="" fill sizes="100vw" className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-charbon-950 via-charbon-950/70 to-charbon-950/30" aria-hidden="true" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-rouille-400">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold uppercase leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{lead}</p>}
        <p className="mt-6 flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/60">
          <Link href={route("/")} className="transition-colors hover:text-white">Accueil</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className="text-white/90">{eyebrow}</span>
          <span className="sr-only">{imageAlt}</span>
        </p>
      </div>
    </section>
  );
}
