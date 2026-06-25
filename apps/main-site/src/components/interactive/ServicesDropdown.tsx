"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { services } from "@/lib/content";
import { SERVICE_ICONS } from "@/lib/icons";

export function ServicesDropdown() {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className="flex cursor-pointer items-center gap-1.5 rounded-lg2 border-none bg-transparent px-3.5 py-2.5 font-display font-semibold text-brand-blue"
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
        }}
      >
        Services
        <ChevronDown size={14} strokeWidth={2.4} aria-hidden />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 grid w-[520px] max-w-[calc(100vw-56px)] grid-cols-2 gap-1 rounded-card border border-cream-border bg-white p-3.5 shadow-menu">
          {services.map((s) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <Link
                key={s.title}
                href="/#services"
                className="flex items-center gap-[11px] rounded-md2 px-3 py-2.5 text-[14.5px] font-semibold text-brand-blue no-underline transition hover:bg-cream"
              >
                <span className="grid size-[30px] flex-none place-items-center rounded-chip bg-brand-yellow-soft text-brand-blue-bright">
                  <Icon size={17} aria-hidden />
                </span>
                {s.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
