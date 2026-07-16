"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";

export function ServiceFaqs({ items }: { items: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q} className="overflow-hidden rounded-xl border border-[#d7e4f5] bg-white">
            <h3>
              <button
                type="button"
                className={`${heroHeadingFont.className} flex w-full cursor-pointer items-center justify-between gap-5 border-0 bg-white px-5 py-5 text-left text-base font-extrabold text-brand-blue focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-brand-yellow sm:px-6`}
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                {item.q}
                {expanded ? <Minus className="size-5 shrink-0" aria-hidden /> : <Plus className="size-5 shrink-0" aria-hidden />}
              </button>
            </h3>
            {expanded ? (
              <p className={`${heroBodyFont.className} px-5 pb-5 leading-7 text-[#52647a] sm:px-6`}>{item.a}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
