"use client";

import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { stateNames, coverageCopy } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function CoverageMap() {
  const [active, setActive] = useState("FL");
  const abbrs = Object.keys(stateNames);
  const selName = stateNames[active]!;

  return (
    <div className="grid items-center gap-14 max-md:grid-cols-1 md:grid-cols-[.95fr_1.05fr]">
      <div>
        <Eyebrow>Nationwide Coverage</Eyebrow>
        <h2 className="mb-4 text-balance font-display text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold -tracking-[.02em] text-brand-blue">
          Find Long-Distance Moving Support By State
        </h2>
        <p className="mb-7 text-[17px] leading-[1.6] text-[#64748B]">
          Vantage helps customers coordinate interstate moves across the United States.
          Select your state to see how we help match you with authorized motor carriers.
        </p>
        <div className="rounded-card border border-cream-border bg-cream p-[26px] shadow-card">
          <div className="mb-3 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg2 bg-brand-blue">
              <MapPin className="size-[22px] text-brand-yellow" strokeWidth={2} aria-hidden />
            </span>
            <h3 className="m-0 font-display text-[23px] font-extrabold text-brand-blue">
              {selName}
            </h3>
          </div>
          <p className="mb-[18px] text-[15px] leading-[1.6] text-[#64748B]">
            {coverageCopy(selName)}
          </p>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 rounded-lg2 bg-brand-blue-bright px-5 py-3 font-display text-sm font-bold tracking-[.04em] text-white uppercase no-underline transition hover:bg-brand-blue"
          >
            Get a {selName} Quote <ArrowRight size={15} strokeWidth={2.4} aria-hidden />
          </a>
        </div>
      </div>

      <div className="rounded-panel border border-cream-border bg-cream p-6">
        <div className="mb-3.5 text-center font-mono text-[11px] text-[#94a3b8]">
          interactive-coverage-map · click a state
        </div>
        <div className="grid grid-cols-8 gap-[7px]">
          {abbrs.map((ab) => {
            const isActive = active === ab;
            return (
              <button
                key={ab}
                type="button"
                title={stateNames[ab]}
                onClick={() => setActive(ab)}
                className={
                  "cursor-pointer rounded-chip py-[9px] font-display text-xs transition " +
                  (isActive
                    ? "border-none bg-brand-blue font-extrabold text-brand-yellow shadow-[0_4px_12px_rgba(2,71,153,.25)]"
                    : "border border-cream-border bg-white font-bold text-[#475569]")
                }
              >
                {ab}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
