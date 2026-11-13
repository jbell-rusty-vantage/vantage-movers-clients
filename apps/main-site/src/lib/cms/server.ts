import "server-only";
import { cache } from "react";
import { getPreviewSiteContent } from "@vantage/api-client";
import catalog from "@/content/cms/catalog.json";
import { contentBindings } from "./snapshot";

/** Only changed bindings cross the RSC boundary; the full inventory stays server-side. */
export const getSiteContent = cache(async () => {
  const content = await getPreviewSiteContent();
  return { revision: content.revision, ...contentBindings(catalog, content.values) };
});
