import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FileText, Info } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ProjectGallery from "@/components/ProjectGallery";
import Reveal from "@/components/Reveal";
import { ESTIMATION_DISCLAIMER } from "@/config/site";
import { categoryLabel, formatFCFA, getRealisation, getRealisationSlugs, REALISATIONS } from "@/data/realisations";
import { route } from "@/lib/asset";

export function generateStaticParams() {
  return getRealisationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getRealisation(slug);
  if (!project) return { title: "Réalisation introuvable" };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: { title: `${project.title} | FABIOLE METAL`, description: project.shortDescription },
  };
}

export default async function RealisationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getRealisation(slug);
  if (!project) notFound();

  const similar = REALISATIONS.filter((r) => r.slug !== project.slug && r.category === project.category).slice(0, 3);
  const fallback = REALISATIONS.filter((r) => r.slug !== project.slug).slice(0, 3);
  const related = similar.length > 0 ? similar : fallback;

  return (
    <>
      <section className="bg-charbon-950 pb-14 pt-18" aria-label={project.title}>
        <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
          <Reveal>
            <Link href={route("/realisations")} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-rouille-400 transition-colors hover:text-rouille-100">
              <ArrowLeft size={15} aria-hidden="true" />
              Toutes les réalisations
            </Link>
            <p className="mt-4 inline-flex bg-rouille-500 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white">
              {categoryLabel(project.category)}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold uppercase leading-tight text-white sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{project.shortDescription}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sable-50 py-14 sm:py-16" aria-label="Détails du projet">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <ProjectGallery images={project.gallery} title={project.title} />
            <Reveal className="mt-8">
              <h2 className="font-display text-2xl font-semibold uppercase text-charbon-900">Description</h2>
              <p className="mt-3 leading-relaxed text-charbon-600">{project.description}</p>
            </Reveal>
          </div>

          <aside className="space-y-5">
            <Reveal delay={100} className="border border-charbon-900/10 bg-white p-7">
              <h2 className="font-display text-base font-semibold uppercase tracking-wider text-charbon-900">Fiche projet</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-charbon-900/10 pb-3">
                  <dt className="text-charbon-600">Catégorie</dt>
                  <dd className="text-right font-semibold text-charbon-900">{categoryLabel(project.category)}</dd>
                </div>
                {project.materials && (
                  <div className="flex justify-between gap-4 border-b border-charbon-900/10 pb-3">
                    <dt className="text-charbon-600">Matériaux</dt>
                    <dd className="text-right font-semibold text-charbon-900">{project.materials.join(", ")}</dd>
                  </div>
                )}
              </dl>
              {project.estimation && (
                <div className="mt-5 bg-sable-100 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-charbon-800">Valeur estimative</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-rouille-600">
                    {formatFCFA(project.estimation.min)} – {formatFCFA(project.estimation.max)}
                  </p>
                  <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-charbon-600">
                    <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {ESTIMATION_DISCLAIMER}
                  </p>
                </div>
              )}
              <Link href={route(`/devis?projet=${project.slug}`)} className="btn btn-primary mt-6 w-full">
                <FileText size={17} aria-hidden="true" />
                Un projet similaire ? Devis
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-label="Projets similaires">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold uppercase text-charbon-900 sm:text-3xl">Projets similaires</h2>
            <Link href={route("/realisations")} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-rouille-600 hover:text-rouille-700">
              Tout voir <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <ProjectCard key={r.slug} project={r} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
