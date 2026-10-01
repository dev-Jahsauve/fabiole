import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CONTACT, DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/config/site";
import Reveal from "./Reveal";

// Cartes de contact réutilisées (accueil + page contact).
export default function ContactCards() {
  const cards = [
    { icon: Phone, title: "Téléphone", value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { icon: Mail, title: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, title: "Atelier", value: CONTACT.address, href: undefined },
  ];
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {cards.map((card, i) => (
        <Reveal key={card.title} delay={i * 100} className="border border-charbon-900/10 bg-white p-7 text-center shadow-[0_2px_20px_-8px_rgba(27,33,39,0.2)]">
          <card.icon size={28} className="mx-auto text-rouille-500" aria-hidden="true" />
          <h3 className="mt-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-charbon-600">{card.title}</h3>
          {card.href ? (
            <a href={card.href} className="mt-2 block break-words font-semibold text-charbon-900 transition-colors hover:text-rouille-600">
              {card.value}
            </a>
          ) : (
            <p className="mt-2 font-semibold text-charbon-900">{card.value}</p>
          )}
        </Reveal>
      ))}
      <Reveal delay={300} className="sm:col-span-3">
        <p className="text-center text-sm text-charbon-600">{CONTACT.hoursHint}</p>
        <div className="mt-4 text-center">
          <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle size={17} aria-hidden="true" />
            Discuter sur WhatsApp
          </a>
        </div>
      </Reveal>
    </div>
  );
}
