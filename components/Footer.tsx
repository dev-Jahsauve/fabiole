import Image from "next/image";
import Link from "next/link";
import { FileText, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { COMPANY, CONTACT, NAV_LINKS, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/config/site";
import { SERVICES } from "@/data/services";
import { asset, route } from "@/lib/asset";

export default function Footer() {
  return (
    <footer className="bg-charbon-950 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <span className="inline-block overflow-hidden rounded-sm bg-white px-2 py-1">
            <Image src={asset("/site/logo.jpeg")} alt="Logo FABIOLE METAL" width={170} height={46} className="h-11 w-auto" loading="lazy" />
          </span>
          <p className="mt-4 text-sm leading-relaxed">{COMPANY.description}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-rouille-400">{COMPANY.baseline}</p>
        </div>

        <nav aria-label="Navigation pied de page">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">Navigation</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={route(link.href)} className="transition-colors hover:text-rouille-400">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={route("/devis")} className="transition-colors hover:text-rouille-400">
                Demander un devis
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Services pied de page">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={route(`/services/${s.slug}`)} className="transition-colors hover:text-rouille-400">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={route("/services")} className="font-semibold text-rouille-400 hover:text-rouille-100">
                Tous les services →
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">Contact</h3>
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
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-rouille-400" aria-hidden="true" />
              {CONTACT.address}
            </li>
          </ul>
          <div className="mt-5 flex flex-col gap-2.5">
            <Link href={route("/devis")} className="btn btn-primary w-full !px-4">
              <FileText size={16} aria-hidden="true" />
              Demander un devis
            </Link>
            <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light w-full !px-4">
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/55 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {COMPANY.name}. Tous droits réservés.</p>
          <p>{CONTACT.address}</p>
        </div>
      </div>
    </footer>
  );
}
