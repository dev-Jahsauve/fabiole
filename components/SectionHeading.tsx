import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-3xl ${alignCls}`}>
      <p
        className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] ${
          align === "center" ? "justify-center" : ""
        } ${dark ? "text-rouille-400" : "text-rouille-600"}`}
      >
        <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
        {eyebrow}
        {align === "center" && (
          <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
        )}
      </p>
      <h2
        className={`mt-4 font-display text-3xl font-semibold uppercase leading-tight sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-charbon-900"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-white/75" : "text-charbon-600"}`}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
