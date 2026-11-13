import type { EditorialEntry, EditorialLocale } from "./types";

export const editorialAuthor = { en: "Vantage Movers Editorial Team", es: "Equipo editorial de Vantage Movers" };
export const resourceTopics = [
  { id: "all", en: "All articles", es: "Todos los artículos" },
  { id: "planning", en: "Moving tips", es: "Consejos de mudanza" },
  { id: "costs", en: "Cost & pricing", es: "Costos y presupuestos" },
  { id: "packing", en: "Packing & preparation", es: "Embalaje y preparación" },
  { id: "paperwork", en: "Paperwork & rights", es: "Documentos y derechos" },
] as const;
export type ResourceTopic = typeof resourceTopics[number]["id"];
const topics: Record<string, ResourceTopic> = {
  "before-the-inventory-call": "planning", "comparing-moving-estimates": "costs",
  "who-handles-my-move": "planning", "moving-cost-guide": "costs",
  "items-to-check-before-packing": "packing", "moving-paperwork-guide": "paperwork",
};
export function resourceTopic(entry: EditorialEntry) {
  return resourceTopics.find(topic => topic.id === topics[entry.id]) ?? resourceTopics[1];
}
function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim();
}
export function filterResources(entries: EditorialEntry[], query: string, topic: ResourceTopic) {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  return entries.filter(entry => {
    if (topic !== "all" && resourceTopic(entry).id !== topic) return false;
    const haystack = normalizeSearch([entry.title, entry.navLabel, entry.description, resourceTopic(entry)[entry.locale], ...entry.sections.flatMap(section => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])])].join(" "));
    return terms.every(term => haystack.includes(term));
  });
}
// Dates on drafts never imply publication or approval.
const posters: Record<string, string> = {
  "before-the-inventory-call": "inventory.webp",
  "comparing-moving-estimates": "estimates.webp",
  "who-handles-my-move": "roles.webp",
  "moving-cost-guide": "costs.webp",
  "items-to-check-before-packing": "packing.webp",
  "moving-paperwork-guide": "paperwork.webp",
};
export function articleDetails(entry: EditorialEntry) {
  const words = [entry.title, entry.description, ...entry.sections.flatMap(s => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]), ...(entry.worksheet ? [entry.worksheet.caption, entry.worksheet.conclusion, ...entry.worksheet.rows.flatMap(r => [r.label, r.a, r.b])] : [])].join(" ").trim().split(/\s+/).length;
  const published = entry.review.status === "reviewed" && Boolean(entry.review.reviewer) && /^\d{4}-\d{2}-\d{2}$/.test(entry.publishedAt ?? "") && Number.isFinite(Date.parse(`${entry.publishedAt}T00:00:00Z`));
  return { published, poster: `/images/editorial/still-life-20261112/${posters[entry.id] ?? "inventory.webp"}`, minutes: Math.max(1, Math.ceil(words / 200)), date: published ? entry.publishedAt! : entry.updatedAt ?? entry.review.checkedAt, updatedAt: entry.updatedAt ?? entry.review.checkedAt };
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
