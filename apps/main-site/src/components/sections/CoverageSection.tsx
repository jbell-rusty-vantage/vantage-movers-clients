import { Container } from "@/components/ui/Container";
import { CoverageMap } from "@/components/interactive/CoverageMap";
import Link from "next/link";
import { entryById } from "@/lib/publication";

export function CoverageSection() {
  return (
    <section id="map" className="bg-white py-24">
      <Container>
        <CoverageMap />
        {entryById("wisconsin", "en") && <div className="mt-8 rounded-card bg-cream p-6"><h3 className="mb-3 font-display text-xl font-bold text-brand-blue">Prepare for arrival</h3><p className="mb-4">Explore our Wisconsin and Madison guides. Guide availability is separate from service coverage; confirm your route with Vantage.</p><Link href="/locations">Browse destination guides →</Link></div>}
      </Container>
    </section>
  );
}
