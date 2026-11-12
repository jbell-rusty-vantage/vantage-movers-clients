"use client";

import { useEffect, useRef, useState } from "react";
import { parseDestination, type ConfirmedDestination, type QuoteLocale } from "@/lib/quote-journey";

const copy = {
  en: { locate: "Suggest my pickup ZIP", working: "Finding a nearby ZIP…", notice: "Optional: share your approximate location with Google Maps to suggest a ZIP. Confirm it before use, or enter your ZIP above.", confirm: "Use this pickup ZIP", fallback: "Location is unavailable. Enter your pickup ZIP above.", decline: "Enter it myself" },
  es: { locate: "Sugerir mi código postal de origen", working: "Buscando un código postal cercano…", notice: "Opcional: comparta su ubicación aproximada con Google Maps para sugerir un código postal. Confírmelo antes de usarlo o escríbalo arriba.", confirm: "Usar este código postal de origen", fallback: "La ubicación no está disponible. Escriba su código postal de origen arriba.", decline: "Escribirlo yo" },
} as const;

export function PickupLocationSuggestion({ locale, inputId, onConfirm }: { locale: QuoteLocale; inputId: string; onConfirm: (zip: string) => void }) {
  const text = copy[locale];
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [suggestion, setSuggestion] = useState<ConfirmedDestination | null>(null);
  const pending = useRef<AbortController | null>(null);
  useEffect(() => () => pending.current?.abort(), []);

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

  return <div className="mt-2 text-xs text-slate-600">
    <button type="button" disabled={busy} onClick={locate} aria-describedby={`${inputId}-location-notice`} className="text-left font-semibold text-brand-blue underline disabled:opacity-60">{busy ? text.working : text.locate}</button>
    <p id={`${inputId}-location-notice`} className="mt-1">{text.notice}</p>
    <div role="status" aria-live="polite">
      {failed && <p className="mt-1">{text.fallback}</p>}
      {suggestion && <div className="mt-2 rounded border border-cream-border bg-white p-2">
        <p>{suggestion.postalCode} · {suggestion.city || suggestion.state}, {suggestion.state}</p>
        <p translate="no" className="my-1 whitespace-nowrap text-xs font-normal not-italic tracking-normal text-[#5e5e5e]">Google Maps</p>
        <button type="button" className="mr-3 text-left font-semibold text-brand-blue underline" onClick={() => { onConfirm(suggestion.postalCode); document.getElementById(inputId)?.focus(); }}>{text.confirm}</button>
        <button type="button" className="underline" onClick={() => { setSuggestion(null); document.getElementById(inputId)?.focus(); }}>{text.decline}</button>
      </div>}
    </div>
  </div>;
}
