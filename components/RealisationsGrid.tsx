"use client";

import { useMemo, useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import ProjectCard from "@/components/ProjectCard";
import { REALISATIONS } from "@/data/realisations";

// Grille filtrable côté client (compatible export statique).
export default function RealisationsGrid() {
  const [category, setCategory] = useState("toutes");

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const r of REALISATIONS) c[r.category] = (c[r.category] ?? 0) + 1;
    return c;
  }, []);

  const visible = category === "toutes" ? REALISATIONS : REALISATIONS.filter((r) => r.category === category);

  return (
    <>
      <CategoryFilter counts={counts} onChange={setCategory} />
      <p className="mt-6 text-center text-sm text-charbon-600" role="status" aria-live="polite">
        {visible.length} projet{visible.length > 1 ? "s" : ""} affiché{visible.length > 1 ? "s" : ""}
      </p>
      <div key={category} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </>
  );
}
