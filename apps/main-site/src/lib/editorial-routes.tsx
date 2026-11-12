import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternateFor, directoryKinds, directoryPathFor, directoryPaths, entriesFor, entryAt } from "@/lib/publication";
import type { EditorialLocale } from "@/content/editorial/types";
import { EditorialPage } from "@/components/editorial/EditorialPage";
import { LocationPage } from "@/components/editorial/LocationPage";
import { DirectoryPage, directoryTitles } from "@/components/editorial/DirectoryPage";
import { ContactPage } from "@/components/editorial/ContactPage";

function directoryKind(path: string, locale: EditorialLocale) {
  return directoryKinds.find(kind => directoryPaths[locale][kind] === path);
}
export function editorialPaths(locale: EditorialLocale) {
  const directories = directoryKinds.flatMap(kind => {
    const path = directoryPathFor(locale, kind);
    return path ? [path] : [];
  });
  return [...entriesFor(locale).map(e => e.path), ...directories, directoryPaths[locale].contact];
}
export function editorialMetadata(path: string, locale: EditorialLocale): Metadata {
  const entry = entryAt(path);
  const kind = directoryKind(path, locale);
  const otherLocale = locale === "en" ? "es" : "en";
  const alternate = entry ? alternateFor(entry)?.path : kind ? directoryPathFor(otherLocale, kind) : directoryPaths[otherLocale].contact;
  const title = entry?.title ?? (kind ? directoryTitles[locale][kind] : locale === "en" ? "Contact Vantage" : "Contacte con Vantage");
  return { title, description: entry?.description, alternates: { canonical: path, languages: { [locale]: path, ...(alternate ? { [locale === "en" ? "es" : "en"]: alternate } : {}) } }, robots: process.env.VERCEL_ENV !== "production" || entry?.review.status === "draft" ? { index: false, follow: false } : undefined, openGraph: { title, url: path, locale: locale === "es" ? "es_US" : "en_US" } };
}
export function renderEditorialRoute(path: string, locale: EditorialLocale) {
  if (locale === "es" && !entriesFor(locale).length) notFound();
  const entry = entryAt(path);
  if (entry && entry.locale === locale) return entry.geography ? <LocationPage entry={entry} /> : <EditorialPage entry={entry} />;
  const kind = directoryKind(path, locale);
  if (kind) return <DirectoryPage locale={locale} kind={kind} />;
  if (path === directoryPaths[locale].contact) return <ContactPage locale={locale} />;
  notFound();
}
