import type { Metadata } from "next";
import CtaDevis from "@/components/CtaDevis";
import PageHero from "@/components/PageHero";
import RealisationsGrid from "@/components/RealisationsGrid";
import SectionHeading from "@/components/SectionHeading";
import { COMPANY } from "@/config/site";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description: `Portes, portails, grilles, structures, mobilier : explorez les ouvrages déjà fabriqués et livrés par ${COMPANY.name}.`,
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos réalisations"
        title="Ce que nous avons déjà fabriqué"
        lead="Chaque projet ci-dessous a été réellement réalisé dans notre atelier. Filtrez par catégorie."
        image="/site/portail-moderne-noir.jpeg"
        imageAlt="Réalisations FABIOLE METAL"
      />
      <section className="bg-sable-50 py-20 sm:py-24" aria-label="Liste des réalisations">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Portfolio"
            title="Explorez nos ouvrages"
            lead="Cliquez sur un projet pour voir ses photos, ses détails et son estimation indicative."
          />
          <div className="mt-10">
            <RealisationsGrid />
          </div>
        </div>
      </section>
      <CtaDevis />
    </>
  );
}
