import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import ContactCards from "@/components/ContactCards";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { COMPANY } from "@/config/site";
import { route } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez ${COMPANY.name} : téléphone, WhatsApp, email et atelier à Bojongo, Douala (Cameroun). Demande de devis gratuite.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        lead="Un appel, un message WhatsApp ou un email : choisissez le canal qui vous arrange."
        image="/site/porte-fenetre-installees.jpeg"
        imageAlt="Réalisation FABIOLE METAL"
      />
      <section className="bg-sable-50 py-20 sm:py-24" aria-label="Coordonnées de contact">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Coordonnées"
            title="Toutes les façons de nous joindre"
          />
          <div className="mt-12">
            <ContactCards />
          </div>
          <Reveal delay={200} className="mt-12 border border-charbon-900/10 bg-white p-8 text-center">
            <h2 className="font-display text-2xl font-semibold uppercase text-charbon-900">
              Vous avez déjà les détails en tête ?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-charbon-600 sm:text-base">
              Gagnez du temps : envoyez directement votre demande avec photos, dimensions et délais.
            </p>
            <Link href={route("/devis")} className="btn btn-primary mt-6">
              <FileText size={17} aria-hidden="true" />
              Remplir une demande de devis
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
