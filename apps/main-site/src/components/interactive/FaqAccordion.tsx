"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { radiusClasses } from "@/lib/playground/layout-playground";
import { trackEvent } from "@/lib/analytics";

/** Playground args promoted to production — see FaqSection.stories.tsx Playground. */
const QUESTION_FONT_SIZE = 17;
const ANSWER_FONT_SIZE = 15.5;
const TOGGLE_SIZE = 30;

export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-3.5">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`overflow-hidden border border-cream-border-2 bg-white shadow-[0_2px_10px_rgba(2,71,153,.04)] ${radiusClasses.md2}`}
          >
            <button
              type="button"
              onClick={() => {
                setOpen(isOpen ? -1 : i);
                trackEvent(isOpen ? "faq_closed" : "faq_opened", {
                  question: f.q.slice(0, 80),
                  faq_index: i,
                });
              }}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-6 py-[22px] text-left font-bold text-brand-blue ${heroHeadingFont.className}`}
              style={{ fontSize: `${QUESTION_FONT_SIZE}px` }}
            >
              {f.q}
              <span
                className={`grid flex-none place-items-center bg-cream text-xl font-bold text-brand-blue-bright ${radiusClasses.md2}`}
                style={{ width: `${TOGGLE_SIZE}px`, height: `${TOGGLE_SIZE}px` }}
              >
                {isOpen ? "\u2212" : "+"}
              </span>
            </button>
            {isOpen && (
              <div
                className={`px-6 pb-6 leading-[1.65] text-[#64748B] ${heroBodyFont.className}`}
                style={{ fontSize: `${ANSWER_FONT_SIZE}px` }}
              >
                {f.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
