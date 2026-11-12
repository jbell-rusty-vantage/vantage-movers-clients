"use client";

import { useEffect, useRef, useState } from "react";
import { parseDestination, type ConfirmedDestination, type QuoteLocale } from "@/lib/quote-journey";

const copy = {
  en: { locate: "Suggest my pickup ZIP", share: "Share approximate location", working: "Finding a nearby ZIP…", notice: "Share your approximate location with Google Maps for a ZIP suggestion. You can confirm the ZIP before it’s used.", confirm: "Use this pickup ZIP", fallback: "Location is unavailable. Enter your pickup ZIP above.", decline: "Enter it myself" },
  es: { locate: "Sugerir mi código postal de origen", share: "Compartir ubicación aproximada", working: "Buscando un código postal cercano…", notice: "Comparta su ubicación aproximada con Google Maps para recibir una sugerencia. Podrá confirmar el código postal antes de usarlo.", confirm: "Usar este código postal de origen", fallback: "La ubicación no está disponible. Escriba su código postal de origen arriba.", decline: "Escribirlo yo" },
} as const;

export function PickupLocationSuggestion({ locale, inputId, onConfirm }: { locale: QuoteLocale; inputId: string; onConfirm: (zip: string) => void }) {
  const text = copy[locale];
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [suggestion, setSuggestion] = useState<ConfirmedDestination | null>(null);
  const pending = useRef<AbortController | null>(null);
  useEffect(() => () => pending.current?.abort(), []);

  function close() {
    pending.current?.abort();
    setOpen(false);
    setBusy(false);
    setFailed(false);
    setSuggestion(null);
  }

  function returnToZip() {
    close();
    document.getElementById(inputId)?.focus();
  }

  async function locate() {
    if (pending.current && !pending.current.signal.aborted) return;
    const controller = new AbortController();
    pending.current = controller;
    setBusy(true); setFailed(false); setSuggestion(null);
    try {
      if (!navigator.geolocation) throw new Error("Unavailable");
      const position = await new Promise<GeolocationPosition>((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: false, timeout: 8000, maximumAge: 0 }));
      if (controller.signal.aborted) return;
      if (position.coords.accuracy > 20000) throw new Error("Too imprecise");
      const response = await fetch("/api/places/pickup-location", {
        method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store",
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(18000)]),
        body: JSON.stringify({ latitude: Number(position.coords.latitude.toFixed(3)), longitude: Number(position.coords.longitude.toFixed(3)), locale }),
      });
      if (!response.ok) throw new Error("Unavailable");
      const place = parseDestination((await response.json()).suggestion);
      if (!place) throw new Error("No US ZIP");
      if (!controller.signal.aborted) setSuggestion(place);
    } catch { if (!controller.signal.aborted) setFailed(true); }
    finally { if (!controller.signal.aborted) setBusy(false); controller.abort(); }
  }

  const panelId = `${inputId}-location-suggestion`;
  const noticeId = `${inputId}-location-notice`;
  const actionClass = "min-h-6 text-left font-semibold text-brand-blue underline";

  return (
    <div className="mt-1 text-xs text-slate-600">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={open ? close : () => setOpen(true)}
        className={actionClass}
      >
        {text.locate}
      </button>
      {open && (
        <div id={panelId} className="rounded border border-cream-border bg-white p-2">
          {!suggestion && <p id={noticeId}>{text.notice}</p>}
          <div role="status">
            {busy && <p className="mt-1">{text.working}</p>}
            {failed && <p className="mt-1">{text.fallback}</p>}
            {suggestion && (
              <>
                <p>{suggestion.postalCode} · {[suggestion.city, suggestion.state].filter(Boolean).join(", ")}</p>
                <p translate="no" className="my-1 whitespace-nowrap text-xs font-normal not-italic tracking-normal text-[#5e5e5e]">Google Maps</p>
              </>
            )}
          </div>
          <button
            type="button"
            aria-disabled={busy}
            aria-describedby={suggestion ? undefined : noticeId}
            onClick={() => {
              if (busy) return;
              if (suggestion) {
                onConfirm(suggestion.postalCode);
                returnToZip();
              } else {
                void locate();
              }
            }}
            className={`${actionClass} mt-1 mr-3 aria-disabled:opacity-60`}
          >
            {suggestion ? text.confirm : text.share}
          </button>
          <button type="button" className="min-h-6 underline" onClick={returnToZip}>
            {text.decline}
          </button>
        </div>
      )}
    </div>
  );
}
