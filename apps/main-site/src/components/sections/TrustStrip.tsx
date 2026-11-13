"use client";
import { CmsText, CmsElement } from "@/components/cms/Content";

import { useState } from "react";
import { CmsImage as Image } from "@/components/cms/Content";
import { ShieldCheck, ClipboardList, PhoneCall, Pause, Play } from "lucide-react";
import { business, trustStrip } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function TrustStrip({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  const [paused, setPaused] = useState(false);
  const facts = [
    { Icon: ShieldCheck, title: es ? "Sepa con quién está tratando" : "Know who you’re working with", text: `USDOT ${business.dot} · MC ${business.mc}`, href: "/consumer-information" },
    { Icon: ClipboardList, title: es ? "Revise las condiciones por escrito" : "Get the details in writing", text: es ? "Inventario, servicios y condiciones" : "Inventory, services and terms", href: "/your-rights" },
    { Icon: PhoneCall, title: es ? "Hable con un coordinador" : "A conversation about your move", text: business.phoneDisplay, href: business.phoneHref },
  ];
  return <section className="referral-strip border-b border-cream-border bg-white py-7 sm:py-9">
    <Container>
      <h2 className="sr-only"><CmsText scope="components/sections/TrustStrip.tsx">{es ? "Canales de referencia" : "Referral channels"}</CmsText></h2>
      <div className="relative pr-10">
        <CmsElement element="div" scope="components/sections/TrustStrip.tsx" className="referral-window overflow-hidden" aria-label={es ? "Canales de referencia" : "Referral channels"}>
          <div className="referral-track flex w-max" style={{ animationPlayState: paused ? "paused" : undefined }}>
            <CmsText scope="components/sections/TrustStrip.tsx">{[0, 1].map(group => <div key={group} aria-hidden={group === 1 ? true : undefined} className="referral-group flex shrink-0 items-center"><CmsText scope="components/sections/TrustStrip.tsx">{[...trustStrip.logos, ...trustStrip.logos].map((logo, index) => <div key={`${logo.src}-${index}`} aria-hidden={index >= trustStrip.logos.length ? true : undefined} className="referral-logo flex h-20 w-40 shrink-0 items-center justify-center"><Image scope="components/sections/TrustStrip.tsx" src={logo.src} alt={group === 0 && index < trustStrip.logos.length ? logo.alt : ""} width={logo.width} height={logo.height} className="h-auto max-h-11 w-auto max-w-[148px]" /></div>)}</CmsText></div>)}</CmsText>
          </div>
        </CmsElement>
        <CmsElement element="button" scope="components/sections/TrustStrip.tsx" type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? (es ? "Reanudar logos" : "Resume logos") : (es ? "Pausar logos" : "Pause logos")} className="referral-toggle absolute top-1/2 right-0 grid size-9 -translate-y-1/2 place-items-center rounded-full text-brand-blue transition hover:bg-cream"><CmsText scope="components/sections/TrustStrip.tsx">{paused ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}</CmsText></CmsElement>
      </div>
      <div className="referral-facts mt-6 grid gap-4 border-t border-cream-border pt-6 md:grid-cols-3"><CmsText scope="components/sections/TrustStrip.tsx">{facts.map(({ Icon, title, text, href }) => <CmsElement element="a" scope="components/sections/TrustStrip.tsx" key={title} href={href} className="referral-fact flex items-start gap-4 rounded-xl p-3 text-brand-blue no-underline hover:bg-cream"><span className="rounded-full bg-brand-yellow-soft p-3"><Icon size={22} aria-hidden /></span><span><strong className="block text-sm"><CmsText scope="components/sections/TrustStrip.tsx">{title}</CmsText></strong><span className="mt-2 block text-sm text-ink-soft"><CmsText scope="components/sections/TrustStrip.tsx">{text}</CmsText></span></span></CmsElement>)}</CmsText></div>
    </Container>
  </section>;
}
