import { getMovingCarriers } from "@vantage/api-client";
import { MovingCarriersTable } from "@/components/interactive/MovingCarriersTable";

type MovingCarriersBandProps = {
  displayMode?: "collapsible" | "expanded";
  defaultOpen?: boolean;
};

export async function MovingCarriersBand({
  displayMode = "collapsible",
  defaultOpen = false,
}: MovingCarriersBandProps) {
  const carriers = await getMovingCarriers();

  if (carriers.length === 0) {
    return null;
  }

  return (
    <div className="border-b py-8" style={{ borderColor: "rgba(2, 71, 153, 0.14)" }}>
      <MovingCarriersTable
        carriers={carriers}
        displayMode={displayMode}
        defaultOpen={defaultOpen}
      />
    </div>
  );
}
