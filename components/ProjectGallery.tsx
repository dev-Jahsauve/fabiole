"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { asset } from "@/lib/asset";

// Galerie avec lightbox (clavier + tactile de base, fermeture Échap).
export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  if (images.length === 0) return null;

  return (
    <>
      <div className={`grid gap-4 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightbox(i)}
            className={`zoom-frame group relative block w-full overflow-hidden bg-sable-200 ${
              i === 0 && images.length > 1 ? "aspect-[4/3] sm:col-span-2 sm:aspect-[16/8]" : "aspect-[4/3]"
            }`}
            aria-label={`Agrandir la photo ${i + 1} : ${title}`}
          >
            <Image
              src={asset(src)}
              alt={`${title} — photo ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-charbon-950/70 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <Expand size={17} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charbon-950/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo agrandie : ${title}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-rouille-400"
            aria-label="Fermer"
          >
            <X size={28} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white transition-colors hover:text-rouille-400 sm:left-6"
            aria-label="Photo précédente"
          >
            <ChevronLeft size={32} />
          </button>
          <div className="relative max-h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={asset(images[lightbox])}
              alt={`${title} — photo ${lightbox + 1}`}
              width={1400}
              height={900}
              className="max-h-[85vh] w-full object-contain"
            />
            <p className="mt-3 text-center text-sm text-white/70">
              {lightbox + 1} / {images.length}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white transition-colors hover:text-rouille-400 sm:right-6"
            aria-label="Photo suivante"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
}
