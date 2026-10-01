"use client";

import { useEffect, useState } from "react";
import { CATEGORIES } from "@/data/realisations";

interface CategoryFilterProps {
  counts: Record<string, number>;
  onChange: (category: string) => void;
}

// Filtres synchronisés avec ?categorie= (lecture au chargement + historique).
// Fonctionne en 100% statique, sans navigation serveur.
export default function CategoryFilter({ counts, onChange }: CategoryFilterProps) {
  const [active, setActive] = useState<string>("toutes");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("categorie");
    if (initial && (CATEGORIES.some((c) => c.key === initial) || initial === "toutes")) {
      setActive(initial);
      onChange(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (key: string) => {
    setActive(key);
    onChange(key);
    const url = new URL(window.location.href);
    if (key === "toutes") url.searchParams.delete("categorie");
    else url.searchParams.set("categorie", key);
    window.history.replaceState(null, "", url.toString());
  };

  return (
    <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filtrer par catégorie">
      {CATEGORIES.map((cat) => {
        const count = cat.key === "toutes" ? Object.values(counts).reduce((a, b) => a + b, 0) : counts[cat.key] ?? 0;
        const isActive = active === cat.key;
        return (
          <button
            key={cat.key}
            type="button"
            onClick={() => select(cat.key)}
            aria-pressed={isActive}
            className={`border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive
                ? "border-rouille-500 bg-rouille-500 text-white shadow-[0_6px_18px_-6px_rgba(198,90,33,0.7)]"
                : "border-charbon-900/20 bg-white text-charbon-800 hover:border-charbon-900 hover:text-charbon-950"
            }`}
          >
            {cat.label}
            <span className={`ml-2 ${isActive ? "text-white/80" : "text-charbon-600/60"}`}>({count})</span>
          </button>
        );
      })}
    </div>
  );
}
