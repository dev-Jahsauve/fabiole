"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MessageCircle, Send, TriangleAlert } from "lucide-react";
import { CONTACT, FORMSPREE_ENDPOINT, whatsappLink } from "@/config/site";
import { getRealisation } from "@/data/realisations";
import { SERVICES, getService } from "@/data/services";
import { route } from "@/lib/asset";

const PROJECT_TYPES = ["Porte métallique", "Portail", "Fenêtre / grille", "Structure métallique", "Mobilier / objet utilitaire", "Soudure / réparation", "Autre"];
const BUDGETS = ["Moins de 100 000 FCFA", "100 000 – 300 000 FCFA", "300 000 – 1 000 000 FCFA", "Plus de 1 000 000 FCFA", "À définir ensemble"];
const DELAYS = ["Urgent (moins de 2 semaines)", "Normal (2 à 6 semaines)", "Flexible"];

const CATEGORY_TO_SERVICE: Record<string, string> = {
  portes: "portes-metalliques",
  portails: "portails",
  "fenetres-grilles": "fenetres-grilles",
  structures: "structures-metalliques",
  mobilier: "mobilier-metallique",
  autres: "soudure-reparation",
};

interface FormState {
  name: string;
  phone: string;
  email: string;
  city: string;
  projectType: string;
  service: string;
  description: string;
  dimensions: string;
  quantity: string;
  budget: string;
  delay: string;
  message: string;
  consent: boolean;
}

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  projectType: "",
  service: "",
  description: "",
  dimensions: "",
  quantity: "1",
  budget: "",
  delay: "",
  message: "",
  consent: false,
};

const inputCls =
  "w-full border border-charbon-900/20 bg-white px-4 py-3 text-sm text-charbon-900 placeholder:text-charbon-600/50 outline-none transition-colors focus:border-rouille-500 focus:ring-2 focus:ring-rouille-500/20";

// Préremplissage pur depuis les paramètres d'URL (?service=slug, ?projet=slug).
// Fonction pure appelée une seule fois dans l'initialiseur d'état : aucun effet,
// donc aucun rendu en cascade — et compatible export statique via Suspense.
function prefillFromParams(params: { get: (key: string) => string | null }): {
  partial: Partial<FormState>;
  note: string | null;
} {
  const serviceParam = params.get("service");
  const projetParam = params.get("projet");
  const partial: Partial<FormState> = {};
  const notes: string[] = [];

  if (serviceParam) {
    const found = getService(serviceParam) ?? SERVICES.find((s) => s.title.toLowerCase() === serviceParam.toLowerCase());
    if (found) {
      partial.service = found.slug;
      notes.push(`Service présélectionné : ${found.title}.`);
    }
  }
  if (projetParam) {
    const ref = getRealisation(projetParam);
    if (ref) {
      partial.service = partial.service ?? CATEGORY_TO_SERVICE[ref.category] ?? "";
      partial.message = `Projet de référence : ${ref.title}. Je souhaite un ouvrage similaire.`;
      notes.push(`Basé sur la réalisation « ${ref.title} ».`);
    }
  }
  return { partial, note: notes.length > 0 ? notes.join(" ") : null };
}

// Formulaire de devis : envoi réel vers Formspree, préremplissage via
// ?service=slug et ?projet=slug, validation complète, états succès/erreur.
export default function QuoteForm() {
  const searchParams = useSearchParams();
  const [prefill] = useState(() => prefillFromParams(searchParams));
  const [form, setForm] = useState<FormState>({ ...EMPTY, ...prefill.partial });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [prefilledNote] = useState<string | null>(prefill.note);

  const set = (key: keyof FormState, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) e.name = "Indiquez votre nom complet.";
    if (form.phone.replace(/\D/g, "").length < 8) e.phone = "Indiquez un numéro de téléphone valide.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Indiquez une adresse email valide.";
    if (form.city.trim().length < 2) e.city = "Indiquez votre ville / localisation.";
    if (!form.projectType) e.projectType = "Choisissez un type de projet.";
    if (!form.service) e.service = "Choisissez un service.";
    if (form.description.trim().length < 20) e.description = "Décrivez votre besoin en au moins 20 caractères.";
    if (!form.consent) e.consent = "Votre accord est nécessaire pour traiter la demande.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (status === "sending") return;
    if (!validate()) {
      document.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Demande de devis — ${form.name} (${form.projectType})`,
          _replyto: form.email,
          ...form,
          serviceLabel: getService(form.service)?.title ?? form.service,
        }),
      });
      if (!res.ok) throw new Error(`Formspree: ${res.status}`);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white p-8 text-center shadow-[0_2px_20px_-8px_rgba(27,33,39,0.25)] sm:p-12" role="status">
        <CheckCircle2 size={56} className="mx-auto text-green-600" aria-hidden="true" />
        <h2 className="mt-5 font-display text-3xl font-semibold uppercase text-charbon-900">Demande envoyée</h2>
        <p className="mx-auto mt-3 max-w-xl text-charbon-600">
          Votre demande de devis a bien été transmise à FABIOLE METAL. Nous revenons vers vous très vite
          au <strong>{form.phone}</strong>.
        </p>
        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3">
          <a href={whatsappLink(`Bonjour FABIOLE METAL, je viens d'envoyer une demande de devis (${form.name}, ${form.projectType}). Voici mes photos/plans :`)} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
            <MessageCircle size={17} aria-hidden="true" />
            Envoyer photos / plans via WhatsApp
          </a>
          <Link href={route("/realisations")} className="btn btn-outline-dark w-full">
            Revoir nos réalisations
          </Link>
        </div>
      </div>
    );
  }

  const field = (label: string, required: boolean, error?: string, children?: React.ReactNode) => (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-charbon-800">
        {label} {required && <span className="text-rouille-600">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs font-semibold text-red-700" data-error>{error}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="bg-white p-6 shadow-[0_2px_20px_-8px_rgba(27,33,39,0.25)] sm:p-10">
      {prefilledNote && (
        <p className="mb-6 border-l-4 border-rouille-500 bg-sable-100 px-4 py-3 text-sm text-charbon-800" role="note">
          {prefilledNote}
        </p>
      )}

      <h2 className="font-display text-xl font-semibold uppercase text-charbon-900">1 — Vos informations</h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        {field("Nom complet", true, errors.name,
          <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex. : Amina N." autoComplete="name" />)}
        {field("Téléphone", true, errors.phone,
          <input className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Ex. : 678 02 71 16" inputMode="tel" autoComplete="tel" />)}
        {field("Email", true, errors.email,
          <input className={inputCls} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="vous@exemple.com" autoComplete="email" />)}
        {field("Ville / localisation", true, errors.city,
          <input className={inputCls} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Ex. : Douala, Bojongo" autoComplete="address-level2" />)}
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold uppercase text-charbon-900">2 — Votre projet</h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        {field("Type de projet", true, errors.projectType,
          <select className={inputCls} value={form.projectType} onChange={(e) => set("projectType", e.target.value)}>
            <option value="">— Choisir —</option>
            {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>)}
        {field("Service concerné", true, errors.service,
          <select className={inputCls} value={form.service} onChange={(e) => set("service", e.target.value)}>
            <option value="">— Choisir —</option>
            {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>)}
        <div className="sm:col-span-2">
          {field("Description du besoin", true, errors.description,
            <textarea className={`${inputCls} min-h-32 resize-y`} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Décrivez l'ouvrage souhaité : usage, dimensions approximatives, style, contraintes…" />)}
        </div>
        {field("Dimensions approximatives", false, undefined,
          <input className={inputCls} value={form.dimensions} onChange={(e) => set("dimensions", e.target.value)} placeholder="Ex. : porte 1,20 m × 2,10 m" />)}
        {field("Quantité", false, undefined,
          <input className={inputCls} type="number" min={1} value={form.quantity} onChange={(e) => set("quantity", e.target.value)} />)}
        {field("Budget estimatif (facultatif)", false, undefined,
          <select className={inputCls} value={form.budget} onChange={(e) => set("budget", e.target.value)}>
            <option value="">— Choisir —</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>)}
        {field("Délai souhaité", false, undefined,
          <select className={inputCls} value={form.delay} onChange={(e) => set("delay", e.target.value)}>
            <option value="">— Choisir —</option>
            {DELAYS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>)}
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold uppercase text-charbon-900">3 — Détails supplémentaires</h2>
      <div className="mt-4">
        {field("Message / détails supplémentaires", false, undefined,
          <textarea className={`${inputCls} min-h-24 resize-y`} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Accès au site, finition souhaitée, projet de référence…" />)}
        <p className="mt-2 text-xs leading-relaxed text-charbon-600">
          Vous pouvez également nous envoyer des photos ou plans via WhatsApp après votre demande
          ({CONTACT.phoneDisplay}).
        </p>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-charbon-800">
          <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#c65a21]" />
          J&apos;accepte que mes informations soient utilisées pour traiter ma demande de devis. <span className="font-bold text-rouille-600">*</span>
        </label>
        {errors.consent && <p className="mt-1 text-xs font-semibold text-red-700" data-error>{errors.consent}</p>}
      </div>

      {status === "error" && (
        <p className="mt-6 flex items-start gap-2 border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          L&apos;envoi a échoué (connexion ou service indisponible). Vérifiez votre connexion puis réessayez,
          ou contactez-nous directement sur WhatsApp.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-8 w-full sm:w-auto sm:min-w-80">
        {status === "sending" ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande de devis"}
      </button>
    </form>
  );
}
