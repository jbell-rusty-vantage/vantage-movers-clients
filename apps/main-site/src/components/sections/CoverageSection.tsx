import { CmsText } from "@/components/cms/Content";
import { Container } from "@/components/ui/Container";
import { CoverageMap } from "@/components/interactive/CoverageMap";
import { CmsLink as Link } from "@/components/cms/Content";
import { entryById } from "@/lib/publication";

export function CoverageSection({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  return (
    <section id="map" className="bg-white py-24">
      <Container>
        <CoverageMap locale={locale} />
        <CmsText scope="components/sections/CoverageSection.tsx">{entryById("wisconsin", locale) && <div className="mt-8 rounded-card bg-cream p-6"><h3 className="mb-3 font-display text-xl font-bold text-brand-blue"><CmsText scope="components/sections/CoverageSection.tsx">{es ? "Prepare su llegada" : "Prepare for arrival"}</CmsText></h3><p className="mb-4"><CmsText scope="components/sections/CoverageSection.tsx">{es ? "Explore las guías de Wisconsin y Madison. Una guía no confirma disponibilidad del servicio; consulte su ruta con Vantage." : "Explore our Wisconsin and Madison guides. Guide availability is separate from service coverage; confirm your route with Vantage."}</CmsText></p><Link scope="components/sections/CoverageSection.tsx" href={es ? "/es/destinos" : "/locations"}><CmsText scope="components/sections/CoverageSection.tsx">{es ? "Explore las guías de destinos →" : "Browse destination guides →"}</CmsText></Link></div>}</CmsText>
      </Container>
    </section>
  );
}
