import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";
import { asset, route } from "@/lib/asset";
import Reveal from "./Reveal";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal delay={(index % 3) * 100}>
      <article className="group flex h-full flex-col overflow-hidden bg-white shadow-[0_2px_20px_-8px_rgba(27,33,39,0.25)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-12px_rgba(27,33,39,0.35)]">
        <div className="zoom-frame relative aspect-[4/3]">
          <Image
            src={asset(service.image)}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
          <span className="absolute left-0 top-4 bg-charbon-950/90 px-3 py-1.5 font-display text-sm font-semibold tracking-widest text-rouille-400">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-rouille-600">{service.category}</p>
          <h3 className="mt-2 font-display text-xl font-semibold uppercase text-charbon-900">{service.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-charbon-600">{service.shortDescription}</p>
          <Link
            href={route(`/services/${service.slug}`)}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-charbon-900 transition-colors hover:text-rouille-600"
          >
            En savoir plus
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        <span className="block h-1 w-0 bg-rouille-500 transition-all duration-500 group-hover:w-full" aria-hidden="true" />
      </article>
    </Reveal>
  );
}
