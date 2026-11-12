import { locationEntries } from "./locations";
import { floridaEntries } from "./florida";
import { movingRouteEntries } from "./moving-routes";
import { resourceEntries } from "./resources";
import { serviceEntries } from "./services";
import { planningResources } from "./planning-resources";
import type { EditorialEntry } from "./types";

export const editorialEntries: EditorialEntry[] = [...serviceEntries, ...resourceEntries, ...planningResources, ...locationEntries, ...floridaEntries, ...movingRouteEntries];
export { editorialSources, editorialClaims } from "./sources";
export type { EditorialEntry, EditorialLocale, EditorialKind, EditorialSource, EditorialClaim } from "./types";
