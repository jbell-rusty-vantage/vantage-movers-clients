import { CmsText } from "@/components/cms/Content";
import { Container } from "@/components/ui/Container";
import { CoverageMap } from "@/components/interactive/CoverageMap";
import { CmsLink as Link } from "@/components/cms/Content";
import { directoryPathFor } from "@/lib/publication";

export function CoverageSection({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  const locations = directoryPathFor(locale, "location");
  return (
    <section id="map" className="bg-white py-24">
      <Container>
        <CoverageMap locale={locale} />
        {locations && <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-card bg-cream p-6 sm:p-8">
          <div><h3 className="mb-2 font-display text-2xl font-bold text-brand-blue"><CmsText scope="components/sections/CoverageSection.tsx">{es ? "¿Cuál es su próximo destino?" : "Where will your next chapter take you?"}</CmsText></h3>
            <p className="text-ink-soft"><CmsText scope="components/sections/CoverageSection.tsx">{es ? "Explore los 50 estados y empiece a planificar su mudanza." : "Explore all 50 states and start planning your move."}</CmsText></p></div>
          <Link scope="components/sections/CoverageSection.tsx" className="editorial-cta" href={locations}><CmsText scope="components/sections/CoverageSection.tsx">{es ? "Ver todos los destinos →" : "Explore all locations →"}</CmsText></Link>
        </div>}
      </Container>
    </section>
  );
}
