/** Navigation groups for the locations directory; not carrier availability. */
export const stateRegions = [
  { id: "northeast", en: "Northeast", es: "Noreste", states: ["CT", "DE", "ME", "MD", "MA", "NH", "NJ", "NY", "PA", "RI", "VT"] },
  { id: "southeast", en: "Southeast", es: "Sureste", states: ["AL", "AR", "FL", "GA", "KY", "LA", "MS", "NC", "SC", "TN", "VA", "WV"] },
  { id: "midwest", en: "Midwest", es: "Medio Oeste", states: ["IL", "IN", "IA", "KS", "MI", "MN", "MO", "NE", "ND", "OH", "SD", "WI"] },
  { id: "southwest", en: "South & Southwest", es: "Sur y Suroeste", states: ["AZ", "NM", "OK", "TX"] },
  { id: "west", en: "West", es: "Oeste", states: ["AK", "CA", "CO", "HI", "ID", "MT", "NV", "OR", "UT", "WA", "WY"] },
] as const;

export const directoryStateCodes = new Set<string>(stateRegions.flatMap(region => [...region.states]));
