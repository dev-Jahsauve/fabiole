import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import CtaDevis from "@/components/CtaDevis";
import ProjectGallery from "@/components/ProjectGallery";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import { asset, route } from "@/lib/asset";
import { SERVICES, getService, getServiceSlugs } from "@/data/services";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service introuvable" };
  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: { title: `${service.title} | FABIOLE METAL`, description: service.shortDescription },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      {/* Hero du service */}
      <section className="relative overflow-hidden bg-charbon-950 pt-18" aria-label={service.title}>
        <div className="absolute inset-0">
          <Image src={asset(service.image)} alt="" fill sizes="100vw" className="object-cover opacity-35" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-charbon-950 via-charbon-950/70 to-charbon-950/30" aria-hidden="true" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-20 sm:px-6 sm:pt-24 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-rouille-400">{service.category}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold uppercase leading-tight text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{service.shortDescription}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={route(`/devis?service=${service.slug}`)} className="btn btn-primary">
              <FileText size={17} aria-hidden="true" />
              Demander un devis pour ce service
            </Link>
            <Link href={route("/services")} className="btn btn-outline-light">
              <ArrowLeft size={17} aria-hidden="true" />
              Tous les services
            </Link>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section className="bg-sable-50 py-16 sm:py-20" aria-label="Présentation du service">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <Reveal className="lg:col-span-3">
            <h2 className="font-display text-2xl font-semibold uppercase text-charbon-900 sm:text-3xl">
              Notre approche
            </h2>
            <p className="mt-4 leading-relaxed text-charbon-600 sm:text-lg">{service.description}</p>
            <ul className="mt-8 space-y-4">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-rouille-500" aria-hidden="true" />
                  <span className="text-sm text-charbon-800 sm:text-base">{benefit}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-2">
            <div className="border border-charbon-900/10 bg-white p-7 shadow-[0_2px_20px_-8px_rgba(27,33,39,0.25)]">
              <p className="font-display text-lg font-semibold uppercase text-charbon-900">Votre projet en 4 étapes</p>
              <ol className="mt-4 space-y-3 text-sm text-charbon-600">
                <li><strong className="text-charbon-900">01 — Analyse :</strong> description, photos, dimensions.</li>
                <li><strong className="text-charbon-900">02 — Devis :</strong> matériaux, délais et budget.</li>
                <li><strong className="text-charbon-900">03 — Fabrication :</strong> réalisation en atelier.</li>
                <li><strong className="text-charbon-900">04 — Livraison :</strong> pose et vérification.</li>
              </ol>
              <Link href={route(`/devis?service=${service.slug}`)} className="btn btn-primary mt-6 w-full">
                Demander un devis
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Galerie */}
      <section className="bg-white py-16 sm:py-20" aria-label="Galerie du service">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold uppercase text-charbon-900 sm:text-3xl">En images</h2>
          </Reveal>
          <div className="mt-8">
            <ProjectGallery images={service.gallery} title={service.title} />
          </div>
        </div>
      </section>

      {/* Autres services */}
      <section className="bg-sable-50 py-16 sm:py-20" aria-label="Autres services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold uppercase text-charbon-900 sm:text-3xl">Autres services</h2>
            <Link href={route("/services")} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-rouille-600 hover:text-rouille-700">
              Tout voir <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaDevis />
    </>
  );
}
