import type { EditorialEntry, EditorialLocale } from "./types";

// Editorial dates describe drafts. Publication requires a separate reviewed date.
const posters: Record<string, string> = {
  "before-the-inventory-call": "home-inventory.webp",
  "comparing-moving-estimates": "review-estimate.webp",
  "who-handles-my-move": "carrier-paperwork.webp",
  "moving-cost-guide": "inventory-call.webp",
  "items-to-check-before-packing": "packing-detail.webp",
  "moving-paperwork-guide": "carrier-paperwork.webp",
};
export function articleDetails(entry: EditorialEntry) {
  const words = [entry.title, entry.description, ...entry.sections.flatMap(s => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]), ...(entry.worksheet ? [entry.worksheet.caption, entry.worksheet.conclusion, ...entry.worksheet.rows.flatMap(r => [r.label, r.a, r.b])] : [])].join(" ").trim().split(/\s+/).length;
  const published = entry.review.status === "reviewed" && Boolean(entry.review.reviewer) && /^\d{4}-\d{2}-\d{2}$/.test(entry.publishedAt ?? "") && Number.isFinite(Date.parse(`${entry.publishedAt}T00:00:00Z`));
  return { published, poster: `/images/preview/${posters[entry.id] ?? "home-inventory.webp"}`, minutes: Math.max(1, Math.ceil(words / 200)), date: published ? entry.publishedAt! : entry.review.checkedAt };
}
export function resourceTypes(locale: EditorialLocale) {
  const es = locale === "es";
  const base = es ? "/es/recursos" : "/resources";
  return [
    { id: "articles", label: es ? "Artículos" : "Articles", description: es ? "Lecturas para preparar su próxima mudanza." : "Practical reading for your next move." },
    { id: "moving-guides", label: es ? "Guías de mudanza" : "Moving Guides", description: es ? "Costos, embalaje y documentos, paso a paso." : "Costs, packing and paperwork, step by step." },
    { id: "checklists", label: es ? "Listas y hojas de trabajo" : "Checklists & Worksheets", description: es ? "Prepare su inventario y compare propuestas." : "Build your inventory and compare estimates." },
    { id: "moving-authorities", label: es ? "Autoridades de mudanzas" : "Moving Authorities", description: es ? "Consulte registros y fuentes oficiales." : "Check registrations and official guidance." },
  ].map(type => ({ ...type, href: `${base}#${type.id}` }));
}
