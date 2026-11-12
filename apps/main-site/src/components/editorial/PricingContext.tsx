import Link from "next/link";
import type { EditorialLocale } from "@/content/editorial/types";
import { entryById } from "@/lib/publication";

export function PricingContext({ locale }: { locale: EditorialLocale }) {
  const es = locale === "es";
  const guide = entryById("moving-cost-guide", locale);
  const rows = es ? [
    ["Transporte con embalaje propio", "Usted prepara las cajas; confirme el inventario y la protección de muebles.", "Materiales, escaleras, distancias de acarreo y servicios adicionales."],
    ["Transporte con ayuda de embalaje", "Solicite por escrito qué artículos, materiales y mano de obra se incluyen.", "Embalaje parcial o completo, artículos frágiles y desembalaje."],
    ["Mudanza con almacenamiento", "Explique cualquier intervalo entre la recogida y la entrega.", "Duración, manipulación, acceso y cargos de entrega posteriores."],
  ] : [
    ["Transport with self-packing", "You prepare the boxes; confirm the inventory and furniture protection.", "Materials, stairs, carrying distances and additional services."],
    ["Transport with packing help", "Ask which items, materials and labor are included in writing.", "Partial or full packing, fragile items and unpacking."],
    ["Moving with storage", "Explain any gap between pickup and delivery.", "Duration, handling, access and later delivery charges."],
  ];
  return <section className="mb-12 rounded-3xl border border-cream-border bg-cream p-6 sm:p-9" aria-labelledby="pricing-context">
    <p className="mb-3 text-xs font-bold tracking-widest text-brand-blue uppercase">{es ? "Contexto de precios" : "Pricing context"}</p>
    <h2 id="pricing-context" className="mb-5 font-display text-3xl font-extrabold text-brand-blue">{es ? "¿Cuánto cuesta una mudanza de larga distancia?" : "How much does a long-distance move cost?"}</h2>
    <p className="mb-6 max-w-4xl leading-relaxed text-ink-soft">{es ? "La distancia es solo una parte del presupuesto. El inventario, los accesos, las fechas y los servicios solicitados también importan. Compare propuestas con el mismo inventario y solicite una estimación por escrito para su ruta." : "Distance is only one part of the estimate. Your inventory, access, dates and requested services also matter. Compare estimates using the same inventory and ask for a written estimate for your route."}</p>
    <div className="overflow-x-auto"><table className="w-full text-left text-sm"><caption className="mb-4 text-left font-semibold">{es ? "Opciones habituales para conversar; no son paquetes ni precios garantizados." : "Common options to discuss; these are not packages or guaranteed prices."}</caption><thead><tr>{(es ? ["Opción", "Qué confirmar", "Factores de costo"] : ["Option", "What to confirm", "Cost considerations"]).map(label => <th key={label} scope="col" className="border-b border-cream-border p-3">{label}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row[0]}><th scope="row" className="border-b border-cream-border p-3 align-top font-semibold">{row[0]}</th>{row.slice(1).map(cell => <td key={cell} className="border-b border-cream-border p-3 align-top leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div>
    <p className="mt-6 text-sm leading-relaxed">{es ? "Confirme el tipo de estimación, los servicios excluidos y el procedimiento para cambios de inventario. Una solicitud de cotización no reserva una fecha ni un transportista." : "Confirm the estimate type, excluded services and how inventory changes are handled. A quote request does not reserve a date or carrier."}</p>
    {guide && <Link className="mt-5 inline-block font-semibold" href={guide.path}>{es ? "Lea la guía de costos →" : "Read the moving cost guide →"}</Link>}
  </section>;
}
