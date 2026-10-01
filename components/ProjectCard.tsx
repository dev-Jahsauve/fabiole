import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryLabel, formatFCFA, type Realisation } from "@/data/realisations";
import { asset, route } from "@/lib/asset";
import Reveal from "./Reveal";

export default function ProjectCard({ project, index = 0 }: { project: Realisation; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 100}>
      <article className="group flex h-full flex-col overflow-hidden bg-white shadow-[0_2px_20px_-8px_rgba(27,33,39,0.25)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-12px_rgba(27,33,39,0.35)]">
        <div className="zoom-frame relative aspect-[4/3]">
          <Image
            src={asset(project.image)}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
          <span className="absolute left-0 top-4 bg-rouille-500 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white">
            {categoryLabel(project.category)}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold uppercase text-charbon-900">{project.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-charbon-600">{project.shortDescription}</p>
          {project.estimation && (
            <p className="mt-3 inline-flex w-fit bg-sable-100 px-3 py-1.5 text-xs font-semibold text-charbon-800">
              Estimation indicative : {formatFCFA(project.estimation.min)} – {formatFCFA(project.estimation.max)}
            </p>
          )}
          <Link
            href={route(`/realisations/${project.slug}`)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-charbon-900 transition-colors hover:text-rouille-600"
          >
            Voir le projet
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
