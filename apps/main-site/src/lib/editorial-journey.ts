import type { EditorialLocale } from "@/content/editorial/types";
import { entryById, directoryPaths } from "./publication";
export function guideLinksFor(locale: EditorialLocale) {
  const generic = entryById("who-handles-my-move", locale)?.path ?? directoryPaths[locale].resource;
  return {
    madison: entryById("madison-wisconsin", locale)?.path ?? entryById("wisconsin", locale)?.path ?? generic,
    wisconsin: entryById("wisconsin", locale)?.path ?? generic,
    generic,
  };
}

