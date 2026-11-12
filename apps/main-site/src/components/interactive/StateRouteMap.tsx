"use client";

import { useId, useState } from "react";
import usa from "@/content/geography/usa-map.json";
import { ArrowRight, MapPin } from "lucide-react";
import type { StateAnchor } from "@/content/editorial/geography-types";
import type { EditorialLocale } from "@/content/editorial/types";

/** A schematic state connection, never navigation, mileage or live tracking. */
export function StateRouteMap({ origin, destination, locale }: { origin: StateAnchor; destination?: StateAnchor; locale: EditorialLocale }) {
  const [selectedCode, setSelectedCode] = useState(origin.code);
  const id = useId();
  const es = locale === "es";
  const anchors = destination ? [origin, destination] : [origin];
  const selected = anchors.find(anchor => anchor.code === selectedCode) ?? origin;
  const title = destination ? `${origin.name} → ${destination.name}` : origin.name;
  const minX = Math.max(0, Math.min(...anchors.map(a => a.x)) - 230);
  const minY = Math.max(0, Math.min(...anchors.map(a => a.y)) - 110);
  const maxX = Math.min(975, Math.max(...anchors.map(a => a.x)) + 150);
  const maxY = Math.min(610, Math.max(...anchors.map(a => a.y)) + 110);
  return <figure className="overflow-hidden rounded-3xl border border-cream-border bg-white shadow-card">
    <div className="flex items-center justify-between gap-3 p-5 sm:px-7"><span className="text-xs font-bold tracking-widest text-brand-blue uppercase">{es ? "Su ruta, en perspectiva" : "Your move, in perspective"}</span><MapPin className="text-brand-blue-bright" size={20} aria-hidden /></div>
    <svg viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} role="img" aria-labelledby={`${id}-title ${id}-desc`} className="block aspect-[460/385] w-full bg-[#edf4f6]">
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{es ? "Mapa esquemático con estados resaltados. Los puntos representan estados, no domicilios. La conexión no indica una carretera ni un plazo de entrega." : "Schematic map with highlighted states. Pins represent states, not addresses. The connection does not indicate a road route or delivery time."}</desc>
      <defs><marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#024799" /></marker></defs>
      {usa.locations.map(state => <path key={state.id} data-state={state.id} d={state.path} fill={anchors.some(a => a.code.toLowerCase() === state.id) ? state.id === selected.code.toLowerCase() ? "#ffc02e" : "#abc9e7" : "#dce7e9"} stroke="#ffffff" strokeWidth="1.5" className="transition-colors duration-200" />)}
      {destination && <path d={`M${origin.x},${origin.y} Q${Math.min(origin.x, destination.x) - 100},${(origin.y + destination.y) / 2} ${destination.x},${destination.y + 12}`} fill="none" stroke="#024799" strokeWidth="3" strokeDasharray="6 5" markerEnd={`url(#${id}-arrow)`} />}
      {anchors.map((anchor, index) => <g key={anchor.code}>
        <circle cx={anchor.x} cy={anchor.y} r="16" fill="white" fillOpacity=".8" />
        <circle cx={anchor.x} cy={anchor.y} r="10" fill="#024799" stroke="white" strokeWidth="3" />
        <text x={anchor.x} y={anchor.y + 3.5} textAnchor="middle" fontSize="9" fontWeight="800" fill="white">{index + 1}</text>
        <rect x={anchor.x - 31} y={anchor.y + 21} width="62" height="26" rx="13" fill="white" />
        <text x={anchor.x} y={anchor.y + 38} textAnchor="middle" fontSize="12" fontWeight="800" fill="#024799">{anchor.code}</text>
      </g>)}
    </svg>
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-2" aria-label={es ? "Estados del mapa" : "Map states"}>{anchors.map((anchor, index) => <span key={anchor.code} className="contents">{index > 0 && <ArrowRight size={16} aria-hidden className="text-brand-blue" />}<button type="button" onClick={() => setSelectedCode(anchor.code)} aria-pressed={selected.code === anchor.code} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-bold ${selected.code === anchor.code ? "border-brand-blue bg-brand-blue text-white" : "border-cream-border bg-white text-brand-blue"}`}>{anchor.name}</button></span>)}</div>
      <p className="mt-4 min-h-12 text-sm leading-relaxed text-ink-soft" aria-live="polite">{selected.planningNote ?? (es ? `Prepare ambos códigos postales y las reglas de acceso del domicilio en ${selected.name}.` : `Prepare both ZIP codes and the access details at your ${selected.name} address.`)}</p>
      <figcaption className="mt-4 border-t border-cream-border pt-4 text-xs leading-relaxed text-ink-soft">{es ? "Conexión ilustrativa entre estados. No indica cobertura, oficinas, recorrido del camión ni tiempo de tránsito." : "Illustrative state connection. Not service coverage, office locations, the truck’s route or a transit-time estimate."}<span className="mt-2 block">{es ? "Geografía" : "Geography"}: U.S. Census · <a href="/licenses/us-atlas.txt">us-atlas</a></span></figcaption>
    </div>
  </figure>;
}
