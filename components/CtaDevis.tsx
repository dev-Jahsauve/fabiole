import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { asset, route } from "@/lib/asset";
import Reveal from "./Reveal";

// Grand bandeau d'appel au devis (fond photo d'atelier).
export default function CtaDevis() {
  return (
    <section className="relative overflow-hidden bg-charbon-950" aria-label="Demander un devis">
      <Image
        src={asset("/site/structure-kiosque.jpeg")}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charbon-950 via-charbon-950/80 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-rouille-400">Devis gratuit</p>
          <h2 className="mt-3 font-display text-3xl font-semibold uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
            Un projet métallique ? Parlons-en.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            Décrivez votre besoin en quelques minutes : photos, dimensions, délais.
            FABIOLE METAL vous répond avec une proposition adaptée.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={route("/devis")} className="btn btn-primary">
              <FileText size={17} aria-hidden="true" />
              Demander un devis
            </Link>
            <Link href={route("/realisations")} className="btn btn-outline-light">
              Voir nos réalisations
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
