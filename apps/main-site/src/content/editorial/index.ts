import { locationEntries } from "./locations";
import { resourceEntries } from "./resources";
import { serviceEntries } from "./services";
import type { EditorialEntry } from "./types";

export const editorialEntries: EditorialEntry[] = [...serviceEntries, ...resourceEntries, ...locationEntries];
export { editorialSources, editorialClaims } from "./sources";
export type { EditorialEntry, EditorialLocale, EditorialKind, EditorialSource, EditorialClaim } from "./types";
