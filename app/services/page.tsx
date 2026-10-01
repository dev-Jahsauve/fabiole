import type { Metadata } from "next";
import CtaDevis from "@/components/CtaDevis";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { COMPANY } from "@/config/site";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Nos services",
  description: `Portes métalliques, portails, fenêtres et grilles, structures, mobilier, soudure : découvrez les services de ${COMPANY.name} au Cameroun.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="Un savoir-faire complet, de l'étude à la pose"
        lead="Six domaines de fabrication, tous réalisés dans notre atelier à partir de vos dimensions."
        image="/site/porte-double-noire.jpeg"
        imageAlt="Porte métallique FABIOLE METAL"
      />
      <section className="bg-sable-50 py-20 sm:py-24" aria-label="Liste des services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Catalogue"
            title="Choisissez votre ouvrage"
            lead="Chaque service a sa page détaillée : photos, avantages et devis direct."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
      <CtaDevis />
    </>
  );
}
