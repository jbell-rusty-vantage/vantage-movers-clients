"use client";

import Link from "next/link";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { EditorialLocale } from "@/content/editorial/types";

type NavLink = { href: string; label: string };
export function BrowseNavigation({ locale, links, services, alternatePath, alternateIsHome = false }: {
  locale: EditorialLocale; links: NavLink[]; services: NavLink[]; alternatePath?: string; alternateIsHome?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();
  const es = locale === "es";
  const close = () => { setOpen(false); setMobile(false); };
  useEffect(() => () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }, []);
  useEffect(() => {
    if (!open && !mobile) return;
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) { setOpen(false); setMobile(false); }
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      setMobile(false);
      (mobile ? mobileTrigger : trigger).current?.focus();
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open, mobile]);
  return <div ref={root} className="order-last w-full lg:order-none lg:w-auto" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) close(); }} onMouseEnter={() => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }} onMouseLeave={() => { leaveTimer.current = setTimeout(() => setOpen(false), 180); }}>
    <div className="flex items-center justify-between gap-5">
      <nav aria-label={es ? "Principal" : "Main"} className="hidden items-center gap-5 text-sm lg:flex">
        {links.map((link, i) => services.length > 0 && i === 0 ? <button key={link.href} ref={trigger} type="button" onMouseEnter={() => setOpen(true)} onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls={`${id}-services`} className="flex cursor-pointer items-center gap-1 py-4 hover:text-brand-blue-bright">{link.label}<ChevronDown size={15} aria-hidden /></button> : <Link key={link.href} href={link.href} onMouseEnter={() => setOpen(false)} className="py-4 no-underline hover:underline">{link.label}</Link>)}
      </nav>
      <button ref={mobileTrigger} type="button" className="flex items-center gap-2 rounded-md2 border border-cream-border px-3 py-2 text-sm lg:hidden" aria-expanded={mobile} aria-controls={`${id}-mobile`} onClick={() => setMobile(v => !v)}>{mobile ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}{es ? "Menú" : "Menu"}</button>
      {alternatePath && <Link href={alternatePath} hrefLang={es ? "en" : "es"} lang={es ? "en" : "es"} className="text-sm" aria-label={alternateIsHome ? (es ? "English home" : "Inicio en español") : (es ? "Read this page in English" : "Leer esta página en español")}>{es ? "English" : "Español"}</Link>}
    </div>
    {open && <nav id={`${id}-services`} aria-label={es ? "Servicios de mudanza" : "Moving services"} className="absolute inset-x-0 top-full hidden max-h-[75dvh] overflow-auto border-b border-cream-border bg-white p-8 shadow-menu lg:block">
      <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[.65fr_2fr]">
        <div><p className="mb-3 text-xs tracking-widest uppercase">{es ? "Su próximo capítulo" : "Your next chapter"}</p><p className="font-display text-3xl font-extrabold">{es ? "Una mudanza comienza con un buen plan." : "Every move starts with a good plan."}</p><Link href={links[0].href} onClick={close} className="mt-5 inline-block text-sm">{es ? "Ver todos los servicios →" : "Explore all services →"}</Link></div>
        <div className="grid gap-3 sm:grid-cols-2">{services.map((link, i) => <Link key={link.href} href={link.href} onClick={close} className="flex items-center gap-4 rounded-xl border border-cream-border bg-cream p-5 no-underline transition-colors hover:border-brand-blue hover:bg-brand-yellow-soft"><span className="text-xs text-brand-blue/60">0{i + 1}</span><span className="flex-1">{link.label}</span><ArrowUpRight size={18} aria-hidden /></Link>)}</div>
      </div>
    </nav>}
    {mobile && <nav id={`${id}-mobile`} aria-label={es ? "Navegación móvil" : "Mobile navigation"} className="absolute inset-x-0 top-full max-h-[70dvh] overflow-auto border-b border-cream-border bg-white p-5 shadow-menu lg:hidden"><div className="mb-5 flex flex-wrap gap-5">{links.map(link => <Link key={link.href} href={link.href} onClick={close}>{link.label}</Link>)}</div><div className="grid gap-2 sm:grid-cols-2">{services.map(link => <Link key={link.href} href={link.href} onClick={close} className="flex items-center justify-between rounded-xl bg-cream p-4 no-underline">{link.label}<ArrowUpRight size={16} aria-hidden /></Link>)}</div></nav>}
  </div>;
}
