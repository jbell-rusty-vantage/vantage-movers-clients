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
  en: { home: "/", service: "/services", resource: "/resources", location: "/locations", route: "/moving-routes", contact: "/contact" },
  es: { home: "/es", service: "/es/servicios", resource: "/es/recursos", location: "/es/destinos", route: "/es/rutas", contact: "/es/contacto" },
} as const;

export const directoryKinds = ["service", "resource", "location", "route"] as const;
export type DirectoryKind = (typeof directoryKinds)[number];

export function entriesForDirectory(locale: EditorialLocale, kind: DirectoryKind, mode = process.env.VERCEL_ENV) {
  return entriesFor(locale, mode).filter(entry =>
    kind === "location" ? entry.kind === "state" || entry.kind === "city" : entry.kind === kind,
  );
}

export function directoryPathFor(locale: EditorialLocale, kind: DirectoryKind, mode = process.env.VERCEL_ENV) {
  return entriesForDirectory(locale, kind, mode).length ? directoryPaths[locale][kind] : undefined;
}

export function alternateFor(entry: EditorialEntry) {
  return entryById(entry.id, entry.locale === "en" ? "es" : "en");
}

export function navigationFor(locale: EditorialLocale, mode = process.env.VERCEL_ENV) {
  const es = locale === "es";
  const paths = directoryPaths[locale];
  const locations = directoryPathFor(locale, "location", mode);
  const routes = directoryPathFor(locale, "route", mode);
  const geographyLink = locations
    ? { href: locations, label: es ? "Destinos" : "Locations" }
    : routes && { href: routes, label: es ? "Rutas de mudanza" : "Moving routes" };
  return [
    ...(directoryPathFor(locale, "service", mode) ? [{ href: paths.service, label: es ? "Servicios" : "Services" }] : []),
    ...(geographyLink ? [geographyLink] : []),
    ...(directoryPathFor(locale, "resource", mode) ? [{ href: paths.resource, label: es ? "Recursos" : "Resources" }] : []),
    { href: `${paths.home}#faq`, label: es ? "Preguntas" : "FAQ" },
    { href: paths.contact, label: es ? "Contacto" : "Contact" },
  ];
}
