import { CmsText } from "@/components/cms/Content";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { HeroFacts } from "@/components/sections/HeroFacts";
import { Suspense } from "react";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";
import { guideLinksFor } from "@/lib/editorial-journey";
import { CmsLink as Link } from "@/components/cms/Content";
import type { EditorialEntry } from "@/content/editorial/types";
import { Container } from "@/components/ui/Container";
import { SERVICE_IMAGES } from "@/lib/images";

export function ServiceHero({ entry }: { entry: EditorialEntry }) {
  const es = entry.locale === "es";
  const image = SERVICE_IMAGES[entry.id] ?? SERVICE_IMAGES["residential-moving"];
  return <section className="overflow-hidden bg-brand-blue">
    <div className="relative isolate">
      <HeroBackdrop {...image} />
      <Container className="relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <div className="pt-44 text-white sm:pt-48 lg:pt-40">
          <h1 className="font-display text-[clamp(30px,3.5vw,50px)] leading-[1.1] font-extrabold"><CmsText scope="components/editorial/ServiceHero.tsx">{entry.navLabel}</CmsText></h1>
          <p className="mt-6 text-lg leading-relaxed"><CmsText scope="components/editorial/ServiceHero.tsx">{entry.description}</CmsText></p>
          <p className="mt-6 text-sm leading-relaxed"><CmsText scope="components/editorial/ServiceHero.tsx">{es ? "Vantage coordina mudanzas interestatales como intermediario. El transportista asignado realiza la recogida, el transporte y la entrega." : "Vantage coordinates interstate moves as a broker. Your assigned motor carrier performs pickup, transport and delivery."}</CmsText></p>
          <Link scope="components/editorial/ServiceHero.tsx" href="#service-details" className="mt-7 inline-block font-semibold text-white"><CmsText scope="components/editorial/ServiceHero.tsx">{es ? "Explore el servicio" : "Explore this service"}</CmsText><CmsText scope="components/editorial/ServiceHero.tsx">{" ↓"}</CmsText></Link>
          <div className="mt-7"><HeroFacts locale={entry.locale} /></div>
          <p className="mt-5 text-xs text-white/75"><CmsText scope="components/editorial/ServiceHero.tsx">{es ? "Imagen ilustrativa" : "Illustrative image"}</CmsText></p>
        </div>
        <div id="quote" tabIndex={-1} className="quote-entry min-w-0 scroll-mt-36"><Suspense><QuoteWizard formId={`quote-${entry.id}`} locale={entry.locale} serviceId={entry.id} guideLinks={guideLinksFor(entry.locale)} /></Suspense></div>
      </Container>
    </div>
  </section>;
}
