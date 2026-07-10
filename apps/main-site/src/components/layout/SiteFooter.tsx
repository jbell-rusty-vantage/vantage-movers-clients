import { getMovingCarriers } from "@vantage/api-client";
import { Footer } from "./Footer";
import { MovingCarriersSection } from "./MovingCarriersSection";

export async function SiteFooter() {
  const carriers = await getMovingCarriers().catch((error) => {
    console.error("[main-site moving-carriers]", error);
    return [];
  });

  return (
    <>
      <Footer />
      <MovingCarriersSection carriers={carriers} defaultOpen />
    </>
  );
}
