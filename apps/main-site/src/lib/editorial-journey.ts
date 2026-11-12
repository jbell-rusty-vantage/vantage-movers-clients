import type { EditorialLocale } from "@/content/editorial/types";
import { destinationResources } from "@/content/editorial/destination-registry";
import { entryById, directoryPaths } from "./publication";

export function guideLinksFor(locale: EditorialLocale, mode = process.env.VERCEL_ENV): Record<string, string> {
  const visiblePath = (id: string) => entryById(id, locale, mode)?.path ?? entryById(id, "en", mode)?.path;
  const generic = visiblePath("who-handles-my-move") ?? directoryPaths[locale].resource;
  return Object.fromEntries([
    ["generic", generic],
    ...destinationResources.map(resource => {
      const parent = destinationResources.find(candidate => candidate.key === resource.fallbackKey);
      return [resource.key, visiblePath(resource.entryId) ?? (parent && visiblePath(parent.entryId)) ?? generic];
    }),
  ]);
}
