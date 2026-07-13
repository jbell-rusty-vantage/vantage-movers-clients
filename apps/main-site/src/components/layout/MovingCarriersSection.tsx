import type { MovingCarrier } from "@vantage/api-client";
import { heroBodyFont } from "@/lib/fonts";
import { Container } from "@/components/ui/Container";
import { MovingCarriersTable } from "@/components/interactive/MovingCarriersTable";
import {
  footerPaddingScale,
  resolveFooterColors,
} from "@/lib/playground/footer-playground";

const PADDING = footerPaddingScale.default;
const colors = resolveFooterColors("light", {});

type MovingCarriersSectionProps = {
  carriers: MovingCarrier[];
};

export function MovingCarriersSection({ carriers }: MovingCarriersSectionProps) {
  if (carriers.length === 0) {
    return null;
  }

  return (
    <section
      className={`${heroBodyFont.className} border-t px-7`}
      style={{
        backgroundColor: colors.footerBg,
        borderColor: colors.borderColor,
        paddingTop: `${PADDING.pt}px`,
        paddingBottom: `${PADDING.pb}px`,
      }}
      aria-label="Active moving carriers"
    >
      <Container className="px-0">
        <MovingCarriersTable carriers={carriers} />
      </Container>
    </section>
  );
}
