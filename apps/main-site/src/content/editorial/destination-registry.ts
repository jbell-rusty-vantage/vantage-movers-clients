/** Resource identity only: a guide is not a coverage or office claim.
 * Add reviewed entries here, never generate routes from a Places response.
 * US states are the expansion scope; DC and territories need separate entries/decisions.
 */
export interface DestinationResource {
  key: string;
  country: "US";
  state: string;
  city?: string;
  entryId: string;
  fallbackKey?: string;
}
export const destinationResources: readonly DestinationResource[] = [
  { key: "florida", country: "US", state: "FL", entryId: "florida" },
  { key: "wisconsin", country: "US", state: "WI", entryId: "wisconsin" },
  { key: "madison", country: "US", state: "WI", city: "madison", entryId: "madison-wisconsin", fallbackKey: "wisconsin" },
];
export function destinationResourceKey(destination: { country: string; state: string; city: string } | null): string {
  if (!destination) return "generic";
  const candidates = destinationResources.filter(resource => resource.country === destination.country && resource.state === destination.state);
  const city = destination.city.trim().toLocaleLowerCase("en-US");
  return candidates.find(resource => resource.city === city)?.key ?? candidates.find(resource => !resource.city)?.key ?? "generic";
}
