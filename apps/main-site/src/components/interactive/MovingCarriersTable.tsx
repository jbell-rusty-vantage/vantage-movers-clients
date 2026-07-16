"use client";

import { useMemo, useState } from "react";
import type { MovingCarrier } from "@vantage/api-client";
import { ExternalLink, Search, ShieldCheck, X } from "lucide-react";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";

type MovingCarriersTableProps = {
  carriers: MovingCarrier[];
};

function saferUrl(dotNumber: string) {
  const query = new URLSearchParams({
    query_param: "USDOT",
    query_string: dotNumber,
    query_type: "queryCarrierSnapshot",
    searchtype: "ANY",
  });

  return `https://safer.fmcsa.dot.gov/query.asp?${query.toString()}`;
}

function matchesSearch(carrier: MovingCarrier, query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return true;

  return [carrier.name, carrier.dot_number, carrier.mc_number].some((value) =>
    value.toLocaleLowerCase().includes(normalizedQuery),
  );
}

function CarrierIdentity({ carrier }: { carrier: MovingCarrier }) {
  return (
    <>
      <div>
        <p className={`${heroHeadingFont.className} font-extrabold text-brand-blue`}>
          {carrier.name}
        </p>
        <p className="mt-1 text-xs leading-5 text-[#64748B]">
          Active carrier listed in the Vantage network
        </p>
      </div>
      <a
        href={saferUrl(carrier.dot_number)}
        target="_blank"
        rel="noreferrer"
        className={`${heroHeadingFont.className} inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue-bright no-underline hover:underline`}
        aria-label={`View ${carrier.name} in FMCSA SAFER`}
      >
        FMCSA record
        <ExternalLink className="size-3.5" strokeWidth={2.25} aria-hidden />
      </a>
    </>
  );
}

export function MovingCarriersTable({ carriers }: MovingCarriersTableProps) {
  const [search, setSearch] = useState("");
  const filteredCarriers = useMemo(
    () => carriers.filter((carrier) => matchesSearch(carrier, search)),
    [carriers, search],
  );

  if (carriers.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-[22px] border border-[#D7E4F5] bg-white/90 shadow-[0_18px_45px_rgba(2,71,153,.08)]">
      <div className="grid gap-5 px-5 py-6 sm:px-7 lg:grid-cols-[1fr_minmax(280px,380px)] lg:items-end">
        <div className="max-w-2xl">
          <div className="mb-2 flex flex-wrap items-center gap-2.5">
            <span
              className={`${heroHeadingFont.className} inline-flex items-center gap-1.5 rounded-full bg-brand-yellow-soft px-3 py-1.5 text-xs font-extrabold tracking-[.08em] text-brand-blue uppercase`}
            >
              <ShieldCheck className="size-3.5" strokeWidth={2.4} aria-hidden />
              Active Moving Carriers
            </span>
            <span
              className={`${heroHeadingFont.className} rounded-full bg-[#EDF5FF] px-3 py-1.5 text-xs font-extrabold text-brand-blue-bright`}
              aria-label={`${carriers.length} active carriers`}
            >
              {carriers.length} carriers
            </span>
          </div>
          <h2
            className={`${heroHeadingFont.className} text-[clamp(24px,3vw,34px)] leading-tight font-extrabold text-brand-blue`}
          >
            Vantage Carrier Network
          </h2>
          <p className={`${heroBodyFont.className} mt-2 text-sm leading-6 text-[#64748B]`}>
            Search the active carrier list by company name, USDOT number, or MC number.
            Each USDOT number links to the carrier&apos;s official FMCSA record.
          </p>
        </div>

        <label className="block">
          <span className={`${heroHeadingFont.className} mb-2 block text-sm font-bold text-brand-blue`}>
            Find a carrier
          </span>
          <span className="relative block">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#64748B]"
              strokeWidth={2.2}
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Name, USDOT, or MC number"
              className={`${heroBodyFont.className} w-full rounded-xl border border-[#C9D9ED] bg-white py-3 pr-11 pl-11 text-sm text-[#1E293B] outline-none transition placeholder:text-[#94A3B8] focus:border-brand-blue-bright focus:ring-4 focus:ring-[#2E86DE]/10`}
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute top-1/2 right-2.5 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-lg border-0 bg-transparent text-[#64748B] transition hover:bg-[#EDF5FF] hover:text-brand-blue"
                aria-label="Clear carrier search"
              >
                <X className="size-4" strokeWidth={2.2} aria-hidden />
              </button>
            ) : null}
          </span>
        </label>
      </div>

      <div className="border-t border-[#D7E4F5] bg-[#F8FBFF] px-5 py-3 sm:px-7">
        <p
          className={`${heroBodyFont.className} text-sm font-semibold text-[#475569]`}
          aria-live="polite"
        >
          Showing {filteredCarriers.length} of {carriers.length} active carriers
        </p>
      </div>

      {filteredCarriers.length > 0 ? (
        <>
          <div className="grid gap-3 bg-[#F8FBFF] p-4 sm:p-5 md:hidden">
            {filteredCarriers.map((carrier) => (
              <article
                key={`${carrier.dot_number}-${carrier.mc_number}`}
                className="rounded-2xl border border-[#DCE7F4] bg-white p-4 shadow-[0_8px_24px_rgba(2,71,153,.06)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <CarrierIdentity carrier={carrier} />
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[#E8EFF8] pt-4">
                  <div>
                    <dt
                      className={`${heroHeadingFont.className} text-[11px] font-extrabold tracking-[.1em] text-[#64748B] uppercase`}
                    >
                      USDOT
                    </dt>
                    <dd className={`${heroBodyFont.className} mt-1 font-bold text-[#334155]`}>
                      {carrier.dot_number}
                    </dd>
                  </div>
                  <div>
                    <dt
                      className={`${heroHeadingFont.className} text-[11px] font-extrabold tracking-[.1em] text-[#64748B] uppercase`}
                    >
                      MC
                    </dt>
                    <dd className={`${heroBodyFont.className} mt-1 font-bold text-[#334155]`}>
                      {carrier.mc_number}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden overflow-hidden md:block">
            <table
              className={`${heroBodyFont.className} min-w-full border-collapse text-left text-sm`}
            >
              <caption className="sr-only">
                Active Vantage moving carriers with USDOT and MC identification numbers
              </caption>
              <thead className="bg-[#F4F8FE] text-xs tracking-[.08em] text-brand-blue uppercase">
                <tr>
                  <th className="px-7 py-4 font-extrabold">Carrier</th>
                  <th className="px-5 py-4 font-extrabold">USDOT</th>
                  <th className="px-5 py-4 font-extrabold">MC</th>
                  <th className="px-7 py-4 text-right font-extrabold">Official record</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EFF8] bg-white text-[#334155]">
                {filteredCarriers.map((carrier) => (
                  <tr
                    key={`${carrier.dot_number}-${carrier.mc_number}`}
                    className="transition hover:bg-[#F8FBFF]"
                  >
                    <td className="px-7 py-4">
                      <p className={`${heroHeadingFont.className} font-extrabold text-brand-blue`}>
                        {carrier.name}
                      </p>
                    </td>
                    <td className="px-5 py-4 font-bold tabular-nums">{carrier.dot_number}</td>
                    <td className="px-5 py-4 font-bold tabular-nums">{carrier.mc_number}</td>
                    <td className="px-7 py-4 text-right">
                      <a
                        href={saferUrl(carrier.dot_number)}
                        target="_blank"
                        rel="noreferrer"
                        className={`${heroHeadingFont.className} inline-flex items-center gap-1.5 font-bold text-brand-blue-bright no-underline hover:underline`}
                        aria-label={`View ${carrier.name} in FMCSA SAFER`}
                      >
                        View FMCSA
                        <ExternalLink className="size-3.5" strokeWidth={2.25} aria-hidden />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="border-t border-[#E8EFF8] bg-white px-6 py-14 text-center">
          <Search className="mx-auto size-8 text-[#94A3B8]" strokeWidth={1.8} aria-hidden />
          <h3 className={`${heroHeadingFont.className} mt-3 text-lg font-extrabold text-brand-blue`}>
            No carriers found
          </h3>
          <p className={`${heroBodyFont.className} mt-1 text-sm text-[#64748B]`}>
            Try another company name, USDOT number, or MC number.
          </p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className={`${heroHeadingFont.className} mt-5 cursor-pointer rounded-lg bg-brand-blue-bright px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-blue`}
          >
            Clear search
          </button>
        </div>
      )}

      <div className="border-t border-[#D7E4F5] bg-white px-5 py-4 sm:px-7">
        <p className={`${heroBodyFont.className} text-xs leading-5 text-[#64748B]`}>
          Carrier participation may change. USDOT and MC numbers are shown for identification;
          consult the linked FMCSA record for current federal registration information.
        </p>
      </div>
    </section>
  );
}
