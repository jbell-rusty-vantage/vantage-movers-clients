import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { Container } from "@/components/ui/Container";
import { EditorialCards } from "@/components/editorial/EditorialCards";
import { entriesFor } from "@/lib/publication";
export const metadata = { title: "Prepare su mudanza interestatal", alternates: { canonical: "/es", languages: { en: "/", es: "/es" } }, robots: { index: false, follow: false } };
export default function SpanishHome() {
  const entries = entriesFor("es");
  if (!entries.length) notFound();
  return <><Header locale="es" alternatePath="/" /><main id="main-content" data-content-id="home"><HeroSection locale="es" />
    <section className="bg-cream py-16"><Container><h2 className="mb-8 font-display text-3xl font-extrabold text-brand-blue">Encuentre el servicio que necesita</h2><EditorialCards entries={entries.filter(e => e.kind === "service")} /></Container></section>
    <HowItWorksSection locale="es" />
    <section className="py-16"><Container><h2 className="mb-8 font-display text-3xl font-extrabold text-brand-blue">Prepare su inventario y compare propuestas</h2><EditorialCards entries={entries.filter(e => e.kind === "resource")} /></Container></section>
    <section className="bg-cream py-16"><Container><h2 className="mb-8 font-display text-3xl font-extrabold text-brand-blue">Conozca su destino</h2><EditorialCards entries={entries.filter(e => e.kind === "state" || e.kind === "city")} /></Container></section>
  </main><SiteFooter locale="es" /></>;
}
