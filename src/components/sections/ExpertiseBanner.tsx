import { expertiseBanner } from "@/content/sections";
import { Banner } from "./Banner";
import { Phone } from "@/components/ui/Phone";
import { Button } from "@/components/ui/Button";

export function ExpertiseBanner({ image }: { image?: string } = {}) {
  return (
    <Banner content={expertiseBanner} image={image}>
      <Phone dark />
      <Button variant="gold" href="#quote">
        Get a Quote
      </Button>
    </Banner>
  );
}
