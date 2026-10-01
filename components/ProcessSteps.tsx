import { ClipboardList, FileCheck2, Hammer, PackageCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Analyse",
    text: "Écoute de votre besoin, visite si nécessaire et compréhension précise du projet.",
  },
  {
    icon: FileCheck2,
    title: "Devis",
    text: "Proposition claire : matériaux, délais et budget adaptés à votre projet.",
  },
  {
    icon: Hammer,
    title: "Fabrication",
    text: "Réalisation en atelier : découpe, soudure, assemblage et finition soignée.",
  },
  {
    icon: PackageCheck,
    title: "Livraison / Installation",
    text: "Livraison, pose sur site et vérification finale avec vous.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="bg-charbon-950 py-20 sm:py-24" aria-label="Notre processus de travail">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Comment nous travaillons"
          title="Un parcours simple, du besoin à la pose"
          lead="Quatre étapes claires pour un projet maîtrisé, sans surprise."
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="relative border border-white/10 bg-white/[0.03] p-7">
              <span className="font-display text-5xl font-semibold text-white/10" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <step.icon size={30} className="mt-4 text-rouille-400" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl font-semibold uppercase text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{step.text}</p>
              {i < STEPS.length - 1 && (
                <span className="absolute -right-3 top-1/2 hidden h-px w-6 bg-rouille-500 lg:block" aria-hidden="true" />
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
