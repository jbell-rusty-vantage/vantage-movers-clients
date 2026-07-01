import { promoBanner, URGENCY_TEXT } from "@/content/sections";
import { Banner } from "./Banner";
import { Button } from "@/components/ui/Button";

export function PromoBanner() {
  return (
    <Banner content={promoBanner}>
      <Button variant="gold" size="lg" href="#quote">
        GET QUOTE
      </Button>
      <span className="urgency">
        <span className="urgency__dot" />
        {URGENCY_TEXT}
      </span>
    </Banner>
  );
}
