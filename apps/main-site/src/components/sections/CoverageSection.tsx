import { Container } from "@/components/ui/Container";
import { CoverageMap } from "@/components/interactive/CoverageMap";

export function CoverageSection() {
  return (
    <section id="map" className="bg-white py-24">
      <Container>
        <CoverageMap />
      </Container>
    </section>
  );
}
