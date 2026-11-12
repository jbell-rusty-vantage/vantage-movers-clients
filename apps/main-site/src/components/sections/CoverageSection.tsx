import { Container } from "@/components/ui/Container";
import { CoverageMap } from "@/components/interactive/CoverageMap";
import Link from "next/link";
import { entryById } from "@/lib/publication";

export function CoverageSection({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  return (
    <section id="map" className="bg-white py-24">
      <Container>
        <CoverageMap locale={locale} />
        {entryById("wisconsin", locale) && <div className="mt-8 rounded-card bg-cream p-6"><h3 className="mb-3 font-display text-xl font-bold text-brand-blue">{es ? "Prepare su llegada" : "Prepare for arrival"}</h3><p className="mb-4">{es ? "Explore las guías de Wisconsin y Madison. Una guía no confirma disponibilidad del servicio; consulte su ruta con Vantage." : "Explore our Wisconsin and Madison guides. Guide availability is separate from service coverage; confirm your route with Vantage."}</p><Link href={es ? "/es/destinos" : "/locations"}>{es ? "Explore las guías de destinos →" : "Browse destination guides →"}</Link></div>}
      </Container>
    </section>
  );
}
