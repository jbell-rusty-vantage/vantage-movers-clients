import Image from "next/image";
import { ShieldCheck, ClipboardList, PhoneCall } from "lucide-react";
import { business, trustStrip } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function TrustStrip({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  const facts = [
    { Icon: ShieldCheck, title: es ? "Sepa con quién está tratando" : "Know who you’re working with", text: `USDOT ${business.dot} · MC ${business.mc}`, href: "/consumer-information" },
    { Icon: ClipboardList, title: es ? "Revise las condiciones por escrito" : "Get the details in writing", text: es ? "Inventario, servicios y condiciones" : "Inventory, services and terms", href: "/your-rights" },
    { Icon: PhoneCall, title: es ? "Hable con un coordinador" : "A conversation about your move", text: business.phoneDisplay, href: business.phoneHref },
  ];
  return <section className="border-b border-cream-border bg-white py-10 sm:py-14">
    <Container>
      <div className="grid items-center gap-8 lg:grid-cols-[.7fr_1.3fr]">
        <div><p className="mb-3 text-xs font-bold tracking-widest text-brand-blue-bright uppercase">{es ? "Conexiones para su mudanza" : "Connections that start a move"}</p><h2 className="font-display text-3xl font-extrabold text-brand-blue">{es ? "Quizá nos conoció aquí." : "You may have found us here."}</h2><p className="mt-3 text-sm leading-relaxed text-ink-soft">{es ? "Directorios y canales de referencia que conectan a los hogares con Vantage." : "Moving directories and referral channels that connect households with Vantage."}</p></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{trustStrip.logos.map(logo => <div key={logo.src} className="flex min-h-24 items-center justify-center rounded-xl border border-cream-border bg-cream/50 p-5"><Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-auto max-h-10 w-auto max-w-full" /></div>)}</div>
      </div>
      <div className="mt-10 grid gap-4 border-t border-cream-border pt-8 md:grid-cols-3">{facts.map(({ Icon, title, text, href }) => <a key={title} href={href} className="flex items-start gap-4 rounded-xl p-3 text-brand-blue no-underline hover:bg-cream"><span className="rounded-full bg-brand-yellow-soft p-3"><Icon size={22} aria-hidden /></span><span><strong className="block text-sm">{title}</strong><span className="mt-2 block text-sm text-ink-soft">{text}</span></span></a>)}</div>
    </Container>
  </section>;
}
