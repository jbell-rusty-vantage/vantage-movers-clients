export type ContentValues = Record<string, string>;
export type ContentLocale = "en" | "es";
export type ContentField = { key: string; defaultValue: string; sourceFile: string; locale: string; kind: string };

function isBusinessContact(field: ContentField) {
  return field.sourceFile === "lib/content.ts" && (/^(?:1)?\d{10}$/.test(field.defaultValue.replace(/\D/g, "")) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.defaultValue));
}

/** Resolve only audited copy fields. Unknown/customer-provided strings stay untouched. */
export function resolveContent(value: string, values: ContentValues, scope: string, locale: ContentLocale, kind = "text", fields: ContentField[] = []) {
  const available = fields.filter(field => field.kind === kind && (field.locale === locale || field.locale === "shared" || isBusinessContact(field)));
  const scopes = scope.split("|");
  const matches = new Map<string, Record<string, string>>();
  const candidates = available.filter(field => {
    if (field.defaultValue === value.trim()) return true;
    if (kind !== "text" || !scopes.includes(field.sourceFile) || !/\{\{\d+\}\}/.test(field.defaultValue)) return false;
    const pieces = field.defaultValue.split(/\{\{\d+\}\}/);
    const pattern = pieces.map(piece => piece.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("([\\s\\S]*?)");
    const match = value.trim().match(new RegExp(`^${pattern}$`));
    if (!match) return false;
    matches.set(field.key, Object.fromEntries([...field.defaultValue.matchAll(/\{\{(\d+)\}\}/g)].map((token, index) => [token[1], match[index + 1]])));
    return true;
  }).sort((a, b) => Number(b.defaultValue === value.trim()) - Number(a.defaultValue === value.trim()));
  const field = scopes.flatMap(source => candidates.filter(field => field.sourceFile === source))[0]
    ?? candidates.find(field => /^(content|lib|schemas)\//.test(field.sourceFile));
  if (!field || !Object.hasOwn(values, field.key) && !matches.has(field.key)) return value;
  const replacement = (values[field.key] ?? field.defaultValue).replace(/\{\{(\d+)\}\}/g, (token, index: string) => {
    const capture = matches.get(field.key)?.[index];
    if (capture === undefined) return token;
    const contact = fields.find(candidate => isBusinessContact(candidate) && candidate.defaultValue === capture && Object.hasOwn(values, candidate.key));
    return contact ? values[contact.key] : capture;
  });
  if (kind === "image") return isContentImage(replacement) ? replacement : value;
  return `${value.match(/^\s*/)?.[0] ?? ""}${replacement}${value.match(/\s*$/)?.[0] ?? ""}`;
}

/** Contact copy and its action share one value; arbitrary link destinations are not editable. */
export function resolveContactHref(href: string, values: ContentValues, fields: ContentField[]) {
  if (href.startsWith("tel:")) {
    const digits = href.slice(4).replace(/\D/g, "");
    const field = fields.find(item => item.sourceFile === "lib/content.ts" && item.defaultValue.replace(/\D/g, "") === digits && /\d/.test(item.defaultValue));
    if (field && Object.hasOwn(values, field.key)) {
      const next = values[field.key].replace(/\D/g, "");
      if (/^(?:1)?\d{10}$/.test(next)) return `tel:${next}`;
    }
  }
  if (href.startsWith("mailto:")) {
    const field = fields.find(item => item.sourceFile === "lib/content.ts" && item.defaultValue === href.slice(7));
    if (field && Object.hasOwn(values, field.key) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[field.key])) return `mailto:${values[field.key]}`;
  }
  return href;
}

export function editorialContentScope(entry: { id: string; kind: string }) {
  if (entry.kind === "service") return "content/editorial/services.ts|content/editorial/service-preparation.ts";
  if (entry.kind === "resource") return ["moving-cost-guide", "items-to-check-before-packing", "moving-paperwork-guide"].includes(entry.id) ? "content/editorial/planning-resources.ts" : "content/editorial/resources.ts";
  if (entry.kind === "route") return "content/editorial/moving-routes.ts";
  return entry.id.includes("florida") ? "content/editorial/florida.ts" : "content/editorial/locations.ts";
}

export function isContentImage(value: string) {
  return /^\/api\/site-content\/media\/[a-f0-9]{24}$/.test(value)
    || /^\/(?:images|partnerlogos)\/[a-zA-Z0-9_/-]+\.(?:webp|png|jpe?g|svg|avif)$/.test(value)
    || value === "/vantage-movers-logo-refined-smaller-text.svg";
}

/** Source markup is trusted repository HTML; Owner edits remain escaped text. */
export function resolveLegalMarkup(html: string, values: ContentValues, scope: string, locale: ContentLocale, fields: ContentField[] = []) {
  return html.split(/(<[^>]*>)/g).map(part => {
    if (part.startsWith("<")) return part.replace(/\bhref=(["'])(tel:[^"']+|mailto:[^"']+)\1/g, (attribute, quote: string, href: string) => {
      const updated = resolveContactHref(href, values, fields);
      return updated === href ? attribute : `href=${quote}${updated.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")}${quote}`;
    });
    const resolved = resolveContent(part, values, scope, locale, "text", fields);
    return resolved === part ? part : resolved.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }).join("");
}
