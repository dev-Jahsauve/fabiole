import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import ContactCards from "@/components/ContactCards";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import { COMPANY, CONTACT, DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: `Demandez votre devis gratuit à ${COMPANY.name} : portes, portails, grilles, structures, mobilier. Réponse rapide par téléphone ou WhatsApp.`,
};

export default function DevisPage() {
  return (
    <>
      <PageHero
        eyebrow="Devis gratuit"
        title="Décrivez votre projet, on s'occupe du reste"
        lead="Remplissez le formulaire : service présélectionné si vous venez d'une page service ou d'une réalisation. Réponse rapide garantie."
        image="/site/toles-grille-atelier.jpeg"
        imageAlt="Atelier FABIOLE METAL"
      />
      <section className="bg-sable-50 py-16 sm:py-20" aria-label="Formulaire de devis">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <Reveal className="lg:col-span-2">
            <QuoteForm />
          </Reveal>
          <Reveal delay={150} className="space-y-5">
            <div className="bg-charbon-950 p-7 text-white">
              <h2 className="font-display text-lg font-semibold uppercase">Une question avant d&apos;envoyer ?</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={CONTACT.phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-rouille-400">
                    <Phone size={16} className="shrink-0 text-rouille-400" aria-hidden="true" />
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 break-all transition-colors hover:text-rouille-400">
                    <Mail size={16} className="shrink-0 text-rouille-400" aria-hidden="true" />
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
              <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full !px-4">
                <MessageCircle size={16} aria-hidden="true" />
                Discuter sur WhatsApp
              </a>
            </div>
            <div className="border border-charbon-900/10 bg-white p-7">
              <h2 className="font-display text-base font-semibold uppercase text-charbon-900">Bon à savoir</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-charbon-600">
                <li>Le devis est gratuit et sans engagement.</li>
                <li>Photos et dimensions accélèrent la réponse.</li>
                <li>Après l&apos;envoi, envoyez plans et photos via WhatsApp.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-white py-16" aria-label="Coordonnées">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ContactCards />
        </div>
      </section>
    </>
  );
}
