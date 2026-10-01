"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { COMPANY, HERO } from "@/config/site";
import { asset, route } from "@/lib/asset";

// Hero immersif : vidéo d'atelier en arrière-plan, overlay pour la lisibilité,
// repli automatique sur l'image poster si la vidéo ne charge pas.
export default function HeroVideo() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-charbon-950" aria-label="Présentation FABIOLE METAL">
      {!videoFailed ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={asset(HERO.video)}
          poster={asset(HERO.poster)}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(HERO.poster)}
          alt="Portail métallique moderne fabriqué par FABIOLE METAL"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-charbon-950/80 via-charbon-950/55 to-charbon-950/85" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-32 text-center sm:px-6">
        <p className="inline-flex items-center gap-3 border border-white/25 bg-white/10 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm sm:text-xs">
          <span className="inline-block h-2 w-2 rounded-full bg-rouille-500" aria-hidden="true" />
          Fabrication métallique — Cameroun
        </p>
        <h1 className="mt-6 font-display text-5xl font-semibold uppercase leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          Le métal <span className="text-rouille-400">façonné</span> avec précision
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {COMPANY.name} conçoit et fabrique vos ouvrages métalliques sur mesure : portes,
          portails, grilles, structures et mobilier. Du besoin au produit posé, un seul interlocuteur.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={route("/devis")} className="btn btn-primary w-full sm:w-auto">
            <FileText size={17} aria-hidden="true" />
            Demander un devis
          </Link>
          <Link href={route("/realisations")} className="btn btn-outline-light w-full sm:w-auto">
            Voir nos réalisations
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <a
        href="#presentation"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-white"
        aria-label="Défiler vers la présentation"
      >
        <span className="flex h-12 w-7 items-start justify-center rounded-full border border-white/40 p-1.5">
          <span className="h-2.5 w-1 animate-bounce rounded-full bg-rouille-400" />
        </span>
      </a>
    </section>
  );
}
