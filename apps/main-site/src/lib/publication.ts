import type { EditorialEntry, EditorialLocale } from "@/content/editorial/types";
import { editorialEntries } from "@/content/editorial";

// Preview is an explicit deployment mode. Unknown/development modes fail closed.
export function canRenderEntry(entry: EditorialEntry, mode = process.env.VERCEL_ENV) {
  return mode === "preview" || (entry.review.status === "reviewed" && Boolean(entry.review.reviewer));
}

export function entriesFor(locale: EditorialLocale, mode = process.env.VERCEL_ENV) {
  return editorialEntries.filter((entry) => entry.locale === locale && canRenderEntry(entry, mode));
}

export function entryAt(path: string, mode = process.env.VERCEL_ENV) {
  return editorialEntries.find((entry) => entry.path === path && canRenderEntry(entry, mode));
}

export function entryById(id: string, locale: EditorialLocale, mode = process.env.VERCEL_ENV) {
  return entriesFor(locale, mode).find((entry) => entry.id === id);
}

export const directoryPaths = {
  en: { home: "/", service: "/services", resource: "/resources", location: "/locations", contact: "/contact" },
  es: { home: "/es", service: "/es/servicios", resource: "/es/recursos", location: "/es/destinos", contact: "/es/contacto" },
} as const;

export function alternateFor(entry: EditorialEntry) {
  return entryById(entry.id, entry.locale === "en" ? "es" : "en");
}

export function navigationFor(locale: EditorialLocale) {
  const es = locale === "es";
  const paths = directoryPaths[locale];
  const entries = entriesFor(locale);
  return [
    ...(entries.some((e) => e.kind === "service") ? [{ href: paths.service, label: es ? "Servicios" : "Services" }] : []),
    ...(entries.some((e) => e.kind === "state") ? [{ href: paths.location, label: es ? "Destinos" : "Locations" }] : []),
    ...(entries.some((e) => e.kind === "resource") ? [{ href: paths.resource, label: es ? "Guías" : "Resources" }] : []),
    { href: paths.contact, label: es ? "Contacto" : "Contact" },
  ];
}
