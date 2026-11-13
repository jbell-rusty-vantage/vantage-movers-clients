import usa from "@/content/geography/usa-map.json";
import type { StateAnchor } from "./geography-types";

/** Selects an authored state identity; adding an anchor does not publish a guide. */
function stateAnchor(code: string): StateAnchor {
  const state = usa.locations.find(location => location.id === code.toLowerCase());
  if (!state) throw new Error(`Missing state map geometry: ${code}`);
  return { code, name: state.name, x: state.anchor[0], y: state.anchor[1] };
}

export const floridaAnchor = stateAnchor("FL");
export const northCarolinaAnchor = stateAnchor("NC");
