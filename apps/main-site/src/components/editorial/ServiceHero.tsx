import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { HeroFacts } from "@/components/sections/HeroFacts";
import { Suspense } from "react";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";
import { guideLinksFor } from "@/lib/editorial-journey";
import Link from "next/link";
import type { EditorialEntry } from "@/content/editorial/types";
import { Container } from "@/components/ui/Container";
import { directoryPaths } from "@/lib/publication";
import { servicePreparation } from "@/content/editorial/service-preparation";

const serviceImages: Record<string, string> = {
  "long-distance-moving": "/long_distance_traffic.webp",
  "residential-moving": "/images/preview/home-inventory.webp",
  "packing-services": "/images/preview/packing-detail.webp",
  "corporate-office-moving": "/images/preview/office-preparation.webp",
  "auto-transport": "/sitepictures/autotransport.jpg",
  "military-moving": "/images/preview/service-military-family-preparation-20261112.webp",
  "storage-options": "/images/preview/service-storage-preparation-20261112.webp",
  "senior-moving": "/images/preview/service-senior-downsizing-20261112.webp",
};

export function ServiceHero({ entry }: { entry: EditorialEntry }) {
  const es = entry.locale === "es";
  const paths = directoryPaths[entry.locale];
  const preparation = servicePreparation(entry.id, entry.locale);
  return <section className="overflow-hidden bg-brand-blue">
    <div className="relative isolate">
      <HeroBackdrop src={serviceImages[entry.id] ?? "/images/preview/home-inventory.webp"} position={entry.id === "corporate-office-moving" ? "50% 15%" : entry.id === "senior-moving" ? "50% 20%" : "50% 25%"} mobilePosition={entry.id === "residential-moving" ? "65% 20%" : "50% 15%"} />
      <Container className="relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <div className="pt-44 text-white sm:pt-48 lg:pt-40">
          <nav aria-label={es ? "Ruta de navegación" : "Breadcrumb"} className="mb-8 flex gap-3 text-sm"><Link className="text-white" href={paths.home}>{es ? "Inicio" : "Home"}</Link><span aria-hidden>/</span><Link className="text-white" href={paths.service}>{es ? "Servicios" : "Services"}</Link></nav>
          <p className="mb-4 text-sm font-bold tracking-widest text-brand-yellow uppercase">Vantage Movers · {entry.navLabel}</p>
          <h1 className="font-display text-[clamp(30px,3.5vw,50px)] leading-[1.1] font-extrabold">{entry.title}</h1>
          <p className="mt-6 text-lg leading-relaxed">{entry.description}</p>
          <p className="mt-6 text-sm leading-relaxed">{es ? "Vantage coordina mudanzas interestatales como intermediario. El transportista asignado realiza la recogida, el transporte y la entrega." : "Vantage coordinates interstate moves as a broker. Your assigned motor carrier performs pickup, transport and delivery."}</p>
          <Link href="#service-details" className="mt-7 inline-block font-semibold text-white">{es ? "Explore el servicio" : "Explore this service"} ↓</Link>
          <div className="mt-7"><HeroFacts locale={entry.locale} /></div>
          <p className="mt-5 text-xs text-white/75">{es ? "Imagen ilustrativa" : "Illustrative image"}</p>
        </div>
        <div id="quote" tabIndex={-1} className="quote-entry min-w-0 scroll-mt-36"><Suspense><QuoteWizard formId={`quote-${entry.id}`} locale={entry.locale} serviceId={entry.id} guideLinks={guideLinksFor(entry.locale)} /></Suspense></div>
      </Container>
    </div>
    <div className="border-y border-cream-border bg-white"><Container className="grid gap-4 py-5 text-sm font-semibold text-brand-blue sm:grid-cols-3">{(preparation?.steps ?? []).map((text, index) => <p key={text}>{String(index + 1).padStart(2, "0")} · {text}</p>)}</Container></div>
  </section>;
}
