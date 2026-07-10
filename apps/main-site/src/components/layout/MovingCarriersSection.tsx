import { getMovingCarriers } from "@vantage/api-client";
import { Suspense } from "react";
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
  defaultOpen?: boolean;
};

async function MovingCarriersSectionContent({
  defaultOpen = true,
}: MovingCarriersSectionProps) {
  const carriers = await getMovingCarriers();

  if (carriers.length === 0) {
    return null;
  }

  return (
    <MovingCarriersTable
      carriers={carriers}
      displayMode="collapsible"
      defaultOpen={defaultOpen}
    />
  );
}

export function MovingCarriersSection({ defaultOpen = true }: MovingCarriersSectionProps) {
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
        <Suspense fallback={null}>
          <MovingCarriersSectionContent defaultOpen={defaultOpen} />
        </Suspense>
      </Container>
    </section>
  );
}
