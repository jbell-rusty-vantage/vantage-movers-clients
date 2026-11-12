"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { EditorialLocale } from "@/content/editorial/types";

type NavLink = { href: string; label: string };
export function BrowseNavigation({ locale, links, services, alternatePath, alternateIsHome = false }: {
  locale: EditorialLocale; links: NavLink[]; services: NavLink[]; alternatePath?: string; alternateIsHome?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const es = locale === "es";
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <div ref={root} className="order-last w-full lg:order-none lg:w-auto" onKeyDown={e => {
      if (e.key === "Escape" && open) { setOpen(false); trigger.current?.focus(); }
    }} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}>
      <div className="flex items-center justify-between gap-4">
        <nav aria-label={es ? "Principal" : "Main"} className="hidden items-center gap-4 text-sm lg:flex">
          {links.map(link => <Link key={link.href} href={link.href} className="no-underline hover:underline">{link.label}</Link>)}
        </nav>
        <button ref={trigger} type="button" className="cursor-pointer rounded-md2 border border-cream-border px-3 py-2 text-sm" aria-expanded={open} aria-controls={id} onClick={() => setOpen(v => !v)}>{es ? "Explorar" : "Browse"} <span aria-hidden>{open ? "−" : "+"}</span></button>
        {alternatePath && <Link href={alternatePath} hrefLang={es ? "en" : "es"} lang={es ? "en" : "es"} className="text-sm" aria-label={alternateIsHome ? (es ? "English home" : "Inicio en español") : (es ? "Read this page in English" : "Leer esta página en español")}>{alternateIsHome ? (es ? "English home" : "Inicio en español") : (es ? "English" : "Español")}</Link>}
      </div>
      {open && <nav id={id} aria-label={es ? "Explorar el sitio" : "Browse the site"} className="absolute inset-x-0 top-full max-h-[70dvh] overflow-auto border-b border-cream-border bg-white p-6 shadow-menu">
        <div className="mx-auto grid max-w-[1200px] gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-4">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</div>
          <div className="grid gap-4 sm:grid-cols-2">{services.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</div>
        </div>
      </nav>}
    </div>
  );
}
