"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";

export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-3.5">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className="overflow-hidden rounded-card border border-cream-border-2 bg-white shadow-[0_2px_10px_rgba(2,71,153,.04)]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-6 py-[22px] text-left font-display text-[17px] font-bold text-brand-blue"
            >
              {f.q}
              <span className="grid size-[30px] flex-none place-items-center rounded-full bg-cream text-xl font-bold text-brand-blue-bright">
                {isOpen ? "\u2212" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-[15.5px] leading-[1.65] text-[#64748B]">{f.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
