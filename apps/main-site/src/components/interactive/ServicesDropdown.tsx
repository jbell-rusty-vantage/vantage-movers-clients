"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { services } from "@/lib/content";
import { SERVICE_ICONS } from "@/lib/icons";

const CLOSE_DELAY_MS = 200;

interface ServicesDropdownProps {
  triggerClassName?: string;
  triggerStyle?: React.CSSProperties;
}

export function ServicesDropdown({
  triggerClassName = "px-3.5 py-2.5",
  triggerStyle,
}: ServicesDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className={`flex cursor-pointer items-center gap-1.5 rounded-none border-none bg-transparent font-semibold text-brand-blue ${triggerClassName}`}
        style={triggerStyle}
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={openMenu}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
            scheduleClose();
          }
        }}
      >
        Services
        <ChevronDown size={14} strokeWidth={2.4} aria-hidden />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 z-50 pt-2"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <div className="grid w-[520px] max-w-[calc(100vw-56px)] grid-cols-2 gap-1 rounded-card border border-cream-border bg-white p-3.5 shadow-menu">
            {services.map((s) => {
              const Icon = SERVICE_ICONS[s.icon];
              return (
                <Link
                  key={s.title}
                  href={`/#${s.anchorId}`}
                  className="flex items-center gap-[11px] rounded-md2 px-3 py-2.5 text-[14.5px] font-semibold text-brand-blue no-underline transition hover:bg-cream"
                  onClick={() => setOpen(false)}
                  data-analytics-location="services_dropdown"
                  data-analytics-move-type={s.title}
                >
                  <span className="grid size-[30px] flex-none place-items-center rounded-chip bg-brand-yellow-soft text-brand-blue-bright">
                    <Icon size={17} aria-hidden />
                  </span>
                  {s.title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
