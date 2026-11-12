"use client";

import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { business } from "@/lib/content";
import type { EditorialLocale } from "@/content/editorial/types";

export function FloatingCall({ locale }: { locale: EditorialLocale }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 480 && !document.activeElement?.matches("input, textarea, select, [contenteditable=true]"));
    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    update();
    return () => { window.removeEventListener("scroll", update); document.removeEventListener("focusin", update); document.removeEventListener("focusout", update); };
  }, []);
  if (!visible || dismissed) return null;
  const es = locale === "es";
  return <div data-floating-call className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex max-w-[calc(100%-2rem)] items-center overflow-hidden rounded-full border border-white/30 bg-brand-blue text-white shadow-lg">
    <a href={business.phoneHref} data-analytics-location="floating_call" className="flex min-h-12 items-center gap-2 px-4 text-sm font-semibold text-white no-underline"><Phone size={17} aria-hidden />{es ? "Llame a Vantage" : "Call Vantage"}</a>
    <button type="button" onClick={() => setDismissed(true)} aria-label={es ? "Ocultar botón de llamada" : "Dismiss call button"} className="grid min-h-12 min-w-11 place-items-center border-l border-white/25"><X size={16} aria-hidden /></button>
  </div>;
}
