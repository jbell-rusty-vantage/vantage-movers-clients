import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { editorialEntries } from "@/content/editorial";
import { canRenderEntry, directoryPaths } from "@/lib/publication";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/carrier-contacts", priority: 0.7, changeFrequency: "monthly" },
  { path: "/consumer-information", priority: 0.5, changeFrequency: "weekly" },
  { path: "/accessibility", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cancellation", priority: 0.3, changeFrequency: "yearly" },
  { path: "/sms-privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/sms-terms", priority: 0.2, changeFrequency: "yearly" },
] satisfies Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const reviewed = editorialEntries.filter(e => canRenderEntry(e, "production"));
  const contentRoutes: MetadataRoute.Sitemap = reviewed.map(e => ({
    url: absoluteUrl(e.path), lastModified: e.review.checkedAt,
    alternates: { languages: Object.fromEntries(reviewed.filter(a => a.id === e.id).map(a => [a.locale, absoluteUrl(a.path)])) },
  }));
  const directories = (["en", "es"] as const).flatMap(locale => (["service", "resource", "location"] as const).filter(kind => reviewed.some(e => e.locale === locale && (kind === "location" ? e.kind === "state" || e.kind === "city" : e.kind === kind))).map(kind => ({ url: absoluteUrl(directoryPaths[locale][kind]) })));
  return [...routes.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  })), ...directories, ...contentRoutes];
}
