import type { MovingCarrier } from "@vantage/api-client";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";

type MovingCarriersTableProps = {
  carriers: MovingCarrier[];
};

export function MovingCarriersTable({ carriers }: MovingCarriersTableProps) {
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
          <h2 className={`${heroHeadingFont.className} mt-1 text-xl font-extrabold text-brand-blue`}>
            Vantage Carrier Network
          </h2>
        </div>
      </div>

      <div className="border-t border-[#D7E4F5] px-3 pb-4 sm:px-5">
        <div className="overflow-hidden rounded-[18px] border border-[#E1EAF6] bg-white">
          <div>
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
    </section>
  );
}
