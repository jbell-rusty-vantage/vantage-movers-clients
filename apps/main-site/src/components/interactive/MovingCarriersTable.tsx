"use client";

import { useState } from "react";
import type { MovingCarrier } from "@vantage/api-client";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";

type MovingCarriersTableProps = {
  carriers: MovingCarrier[];
  displayMode?: "collapsible" | "expanded";
  defaultOpen?: boolean;
};

export function MovingCarriersTable({
  carriers,
  displayMode = "collapsible",
  defaultOpen = false,
}: MovingCarriersTableProps) {
  const [open, setOpen] = useState(defaultOpen || displayMode === "expanded");
  const isCollapsible = displayMode === "collapsible";
  const showTable = !isCollapsible || open;

  if (carriers.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[22px] border border-[#D7E4F5] bg-white/85 shadow-[0_18px_45px_rgba(2,71,153,.08)]">
      <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p
            className={`${heroHeadingFont.className} text-xs font-extrabold tracking-[.14em] text-brand-blue-bright uppercase`}
          >
            Active Moving Carriers
          </p>
          <h3 className={`${heroHeadingFont.className} mt-1 text-xl font-extrabold text-brand-blue`}>
            Current Vantage carrier network
          </h3>
          <p className={`${heroBodyFont.className} mt-2 max-w-3xl text-sm leading-6 text-[#607086]`}>
            This list is refreshed directly from our carrier collection and includes the DOT and MC
            identifiers used for carrier verification.
          </p>
        </div>
        {isCollapsible ? (
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className={`${heroHeadingFont.className} inline-flex items-center justify-center rounded-full bg-brand-blue px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_22px_rgba(2,71,153,.18)] transition hover:bg-brand-blue-bright`}
            aria-expanded={open}
          >
            {open ? "Hide carriers" : `View ${carriers.length} carriers`}
          </button>
        ) : null}
      </div>

      {showTable ? (
        <div className="border-t border-[#D7E4F5] px-3 pb-4 sm:px-5">
          <div className="overflow-hidden rounded-[18px] border border-[#E1EAF6] bg-white">
            <div className="max-h-[520px] overflow-auto">
              <table className={`${heroBodyFont.className} min-w-full border-collapse text-left text-sm`}>
                <thead className="sticky top-0 bg-[#F4F8FE] text-xs tracking-[.08em] text-brand-blue uppercase">
                  <tr>
                    <th className="px-4 py-3 font-extrabold">Carrier</th>
                    <th className="px-4 py-3 font-extrabold">DOT</th>
                    <th className="px-4 py-3 font-extrabold">MC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EFF8] text-[#334155]">
                  {carriers.map((carrier) => (
                    <tr key={`${carrier.dot_number}-${carrier.mc_number}`} className="hover:bg-[#F8FBFF]">
                      <td className="px-4 py-3 font-bold text-brand-blue">{carrier.name}</td>
                      <td className="px-4 py-3 font-semibold">{carrier.dot_number}</td>
                      <td className="px-4 py-3 font-semibold">{carrier.mc_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
