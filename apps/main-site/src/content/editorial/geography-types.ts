/** Authored state/route content. Geography never implies service availability. */
export interface StateAnchor {
  code: string;
  name: string;
  /** Anchor in the checked-in Census/us-atlas map coordinates; never a street address. */
  x: number;
  y: number;
  planningNote?: string;
}

export interface GeographyContent {
  origin: StateAnchor;
  destination?: StateAnchor;
  eyebrow: string;
  quoteTitle: string;
  quoteDescription: string;
  planningTitle: string;
  planningCards: { title: string; body: string }[];
  citiesTitle: string;
  citiesDescription: string;
  cities: { name: string; detail: string }[];
  serviceTitle: string;
  serviceIntro: string;
  serviceNotes: Record<string, string>;
  coordinationCards?: { title: string; body: string; serviceId: string }[];
  challengesTitle?: string;
  preparationTitle: string;
  routeTitle: string;
  routeIntro: string;
  relatedRouteIds: string[];
}
