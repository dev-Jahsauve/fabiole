"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/config/site";
import { asset, route } from "@/lib/asset";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === route("/");
    return pathname === href || pathname === route(href) || pathname.endsWith(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-charbon-950/95 shadow-lg backdrop-blur" : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
        <Link href={route("/")} className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="overflow-hidden rounded-sm bg-white px-2 py-1">
            <Image src={asset("/site/logo.jpeg")} alt="Logo FABIOLE METAL" width={150} height={40} className="h-9 w-auto" priority />
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={route(link.href)}
                className={`relative text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive(link.href) ? "text-rouille-400" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-rouille-500" aria-hidden="true" />
                )}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={route("/devis")} className="btn btn-primary hidden !py-3 lg:inline-flex">
          <FileText size={16} aria-hidden="true" />
          Demander un devis
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </span>
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-1 bg-charbon-950/95 px-4 pb-6 pt-2 backdrop-blur">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={route(link.href)}
                onClick={() => setOpen(false)}
                className={`block border-l-2 px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive(link.href)
                    ? "border-rouille-500 bg-white/5 text-rouille-400"
                    : "border-transparent text-white/85 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link href={route("/devis")} onClick={() => setOpen(false)} className="btn btn-primary w-full">
              <FileText size={16} aria-hidden="true" />
              Demander un devis
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
