export type TelemetryMode = "local" | "preview" | "production";

/** CI supplies its source SHA; local preview sessions keep collection disabled. */
export function telemetryMode(environment?: string, deploymentSha?: string): TelemetryMode {
  if (environment === "production") return "production";
  if (environment === "preview" && /^[a-f0-9]{40}$/.test(deploymentSha ?? "")) return "preview";
  return "local";
}
