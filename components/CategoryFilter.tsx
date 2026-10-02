"use client";

import { CATEGORIES } from "@/data/realisations";

interface CategoryFilterProps {
  counts: Record<string, number>;
  value: string;
  onChange: (category: string) => void;
}

// Valide ?categorie= : toute valeur inconnue retombe sur "toutes".
// Exportée pour que la grille parente initialise son état avec la même règle.
export function resolveCategoryParam(value: string | null): string {
  if (value && (CATEGORIES.some((c) => c.key === value) || value === "toutes")) return value;
  return "toutes";
}

// Filtres contrôlés : l'état vit dans la grille parente (source unique de
// vérité), ce composant affiche et notifie — aucune lecture d'URL ici,
// donc aucun effet et aucun risque de rendus en cascade.
export default function CategoryFilter({ counts, value, onChange }: CategoryFilterProps) {
  const select = (key: string) => {
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
        const isActive = value === cat.key;
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
