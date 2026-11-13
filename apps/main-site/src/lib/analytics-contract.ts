import { websiteDesign } from "./website-design";

/** Public, bounded dimensions only. Never serialize arbitrary DOM text or form values. */
export type AnalyticsProperties = Record<string, string | number | boolean | null>;
export type SafeEvent = { name: string; properties: { context: string; detail: string } };

const serviceSlugs = {
  "long-distance-moving": "mudanzas-larga-distancia",
  "auto-transport": "transporte-de-autos",
  "military-moving": "mudanzas-militares",
  "residential-moving": "mudanzas-residenciales",
  "corporate-office-moving": "mudanzas-de-oficina",
  "packing-services": "servicios-de-embalaje",
  "storage-options": "opciones-de-almacenamiento",
  "senior-moving": "mudanzas-para-personas-mayores",
};

const pagePaths: Record<string, string> = {
  "/locations/florida-movers": "florida", "/es/destinos/florida": "florida",
  "/moving-routes": "moving-routes", "/es/rutas": "moving-routes",
  "/moving-routes/florida-to-north-carolina": "florida-to-north-carolina", "/es/rutas/florida-a-carolina-del-norte": "florida-to-north-carolina",
  "/": "home", "/es": "home",
  "/services": "services", "/es/servicios": "services",
  "/locations": "locations", "/es/destinos": "locations",
  "/resources": "resources", "/es/recursos": "resources",
  "/resources/moving-cost-guide": "moving-cost-guide", "/es/recursos/costos-de-mudanza": "moving-cost-guide",
  "/resources/items-to-check-before-packing": "items-to-check-before-packing", "/es/recursos/articulos-antes-de-embalar": "items-to-check-before-packing",
  "/resources/moving-paperwork-guide": "moving-paperwork-guide", "/es/recursos/documentos-de-mudanza": "moving-paperwork-guide",
  "/contact": "contact", "/es/contacto": "contact",
  "/resources/before-the-inventory-call": "before-the-inventory-call",
  "/es/recursos/preparar-inventario": "before-the-inventory-call",
  "/resources/comparing-moving-estimates": "comparing-moving-estimates",
  "/es/recursos/comparar-presupuestos": "comparing-moving-estimates",
  "/resources/who-handles-my-move": "who-handles-my-move",
  "/es/recursos/quien-organiza-mi-mudanza": "who-handles-my-move",
  "/locations/wisconsin-movers": "wisconsin",
  "/es/destinos/wisconsin": "wisconsin",
  "/locations/wisconsin-movers/madison": "madison-wisconsin",
  "/es/destinos/wisconsin/madison": "madison-wisconsin",
  "/carrier-contacts": "carrier-contacts", "/consumer-information": "consumer-information",
  "/privacy": "privacy", "/terms": "terms", "/sms-privacy": "sms-privacy",
  "/sms-terms": "sms-terms", "/cancellation": "cancellation", "/accessibility": "accessibility",
};
for (const [id, es] of Object.entries(serviceSlugs)) {
  pagePaths[`/services/${id}`] = id;
  pagePaths[`/es/servicios/${es}`] = id;
}

const eventNames = new Set([
  "site_visit", "site_engaged", "site_lead_intent", "site_bounce",
  "calendar_or_date_picker_opened", "cta_clicked", "email_clicked", "phone_clicked",
  "form_started", "form_step_viewed", "form_step_completed", "form_submit_attempted",
  "form_submit_success", "form_submit_failed", "form_validation_error", "quote_estimate_viewed",
  "moving_responsibilities_pdf_clicked", "nav_link_clicked", "privacy_policy_clicked",
  "sms_privacy_clicked", "sms_terms_clicked", "zip_lookup_failed", "zip_not_recognized",
]);
const fields = new Set(["pickup", "dest", "date", "size", "name", "phone", "email", "smsConsent"]);
const errors = new Set(["required", "invalid", "lead_capture_failed"]);
const locations = new Set([
  "floating_call", "header", "header_nav", "header_mobile", "hero_primary", "hero_secondary", "service_feature",
  "service_card", "services_dropdown", "footer", "footer_services", "footer_company", "footer_legal",
  "contact", "final_cta", "resources", "service", "mobile_nav", "quote_confirmation",
]);

export function pageIdentity(pathname: string): { id: string; locale: "en" | "es" } {
  // A raw browser path may contain personal data; unknown paths never leave the browser.
  const path = pathname.replace(/\/$/, "") || "/";
  return { id: pagePaths[path] ?? "other", locale: path === "/es" || path.startsWith("/es/") ? "es" : "en" };
}

export function sanitizeAnalyticsEvent(
  name: string,
  properties: AnalyticsProperties,
  pathname: string,
  production: boolean,
): SafeEvent | null {
  if (!eventNames.has(name)) return null;
  const page = pageIdentity(pathname);
  const detail: string[] = [];
  if (properties.step_number === 1 || properties.step_number === 2 || properties.step_number === 3 || properties.step_number === 4) {
    detail.push(`step:${properties.step_number}`);
  }
  if (typeof properties.field_name === "string" && fields.has(properties.field_name)) detail.push(`field:${properties.field_name}`);
  if (typeof properties.error_type === "string" && errors.has(properties.error_type)) detail.push(`error:${properties.error_type}`);
  const location = properties.cta_location ?? properties.link_location;
  if (typeof location === "string" && locations.has(location)) detail.push(`at:${location}`);
  return {
    name,
    properties: {
      context: `${websiteDesign.id}|${production ? "production" : "preview"}|${page.id}|${page.locale}`,
      detail: detail.join("|") || "none",
    },
  };
}

/** Applies to automatic pageviews and Web Vitals as well as custom events. */
export function sanitizeTelemetryUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol) || pageIdentity(url.pathname).id === "other") return null;
    url.search = "";
    url.hash = "";
    url.username = "";
    url.password = "";
    return url.href;
  } catch {
    return null;
  }
}
