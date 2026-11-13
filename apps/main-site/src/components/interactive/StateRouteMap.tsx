"use client";
import { CmsText, CmsElement } from "@/components/cms/Content";


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
  return <figure className="editorial-route-map overflow-hidden rounded-3xl border border-cream-border bg-white shadow-card">
    <div className="flex items-center justify-between gap-3 p-5 sm:px-7"><span className="text-xs font-bold tracking-widest text-brand-blue uppercase"><CmsText scope="components/interactive/StateRouteMap.tsx">{es ? "Su ruta, en perspectiva" : "Your move, in perspective"}</CmsText></span><MapPin className="text-brand-blue-bright" size={20} aria-hidden /></div>
    <svg viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} role="img" aria-labelledby={`${id}-title ${id}-desc`} className="block aspect-[460/385] w-full bg-[var(--editorial-map-water,#edf4f6)]">
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}><CmsText scope="components/interactive/StateRouteMap.tsx">{es ? "Mapa esquemático con estados resaltados. Los puntos representan estados, no domicilios. La conexión no indica una carretera ni un plazo de entrega." : "Schematic map with highlighted states. Pins represent states, not addresses. The connection does not indicate a road route or delivery time."}</CmsText></desc>
      <defs><marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="var(--editorial-map-route, #024799)" /></marker></defs>
      <CmsText scope="components/interactive/StateRouteMap.tsx">{usa.locations.map(state => <path key={state.id} data-state={state.id} d={state.path} fill={anchors.some(a => a.code.toLowerCase() === state.id) ? state.id === selected.code.toLowerCase() ? "var(--editorial-map-selected, #ffc02e)" : "var(--editorial-map-highlight, #abc9e7)" : "var(--editorial-map-land, #dce7e9)"} stroke="#ffffff" strokeWidth="1.5" className="transition-colors duration-200" />)}</CmsText>
      <CmsText scope="components/interactive/StateRouteMap.tsx">{destination && <path d={`M${origin.x},${origin.y} Q${Math.min(origin.x, destination.x) - 100},${(origin.y + destination.y) / 2} ${destination.x},${destination.y + 12}`} fill="none" stroke="var(--editorial-map-route, #024799)" strokeWidth="3" strokeDasharray="6 5" markerEnd={`url(#${id}-arrow)`} />}</CmsText>
      <CmsText scope="components/interactive/StateRouteMap.tsx">{anchors.map((anchor, index) => <g key={anchor.code}>
        <circle cx={anchor.x} cy={anchor.y} r="16" fill="white" fillOpacity=".8" />
        <circle cx={anchor.x} cy={anchor.y} r="10" fill="var(--editorial-map-route, #024799)" stroke="white" strokeWidth="3" />
        <text x={anchor.x} y={anchor.y + 3.5} textAnchor="middle" fontSize="9" fontWeight="800" fill="white"><CmsText scope="components/interactive/StateRouteMap.tsx">{index + 1}</CmsText></text>
        <rect x={anchor.x - 31} y={anchor.y + 21} width="62" height="26" rx="13" fill="white" />
        <text x={anchor.x} y={anchor.y + 38} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--editorial-map-route, #024799)"><CmsText scope="components/interactive/StateRouteMap.tsx">{anchor.code}</CmsText></text>
      </g>)}</CmsText>
    </svg>
    <div className="p-5 sm:p-7">
      <CmsElement element="div" scope="components/interactive/StateRouteMap.tsx" className="flex flex-wrap items-center gap-2" aria-label={es ? "Estados del mapa" : "Map states"}><CmsText scope="components/interactive/StateRouteMap.tsx">{anchors.map((anchor, index) => <span key={anchor.code} className="contents"><CmsText scope="components/interactive/StateRouteMap.tsx">{index > 0 && <ArrowRight size={16} aria-hidden className="text-brand-blue" />}</CmsText><button type="button" onClick={() => setSelectedCode(anchor.code)} aria-pressed={selected.code === anchor.code} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-bold ${selected.code === anchor.code ? "border-brand-blue bg-brand-blue text-white" : "border-cream-border bg-white text-brand-blue"}`}><CmsText scope="components/interactive/StateRouteMap.tsx">{anchor.name}</CmsText></button></span>)}</CmsText></CmsElement>
      <p className="mt-4 min-h-12 text-sm leading-relaxed text-ink-soft" aria-live="polite"><CmsText scope="components/interactive/StateRouteMap.tsx">{selected.planningNote ?? (es ? `Prepare ambos códigos postales y las reglas de acceso del domicilio en ${selected.name}.` : `Prepare both ZIP codes and the access details at your ${selected.name} address.`)}</CmsText></p>
      <figcaption className="mt-4 border-t border-cream-border pt-4 text-xs leading-relaxed text-ink-soft"><CmsText scope="components/interactive/StateRouteMap.tsx">{es ? "Conexión ilustrativa entre estados. No indica cobertura, oficinas, recorrido del camión ni tiempo de tránsito." : "Illustrative state connection. Not service coverage, office locations, the truck’s route or a transit-time estimate."}</CmsText><span className="mt-2 block"><CmsText scope="components/interactive/StateRouteMap.tsx">{es ? "Geografía" : "Geography"}</CmsText><CmsText scope="components/interactive/StateRouteMap.tsx">{": U.S. Census · "}</CmsText><CmsElement element="a" scope="components/interactive/StateRouteMap.tsx" href="/licenses/us-atlas.txt"><CmsText scope="components/interactive/StateRouteMap.tsx">{"us-atlas"}</CmsText></CmsElement></span></figcaption>
    </div>
  </figure>;
}
