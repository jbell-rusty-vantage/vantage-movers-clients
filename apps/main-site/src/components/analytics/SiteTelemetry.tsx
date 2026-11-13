"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { sanitizeTelemetryUrl } from "@/lib/analytics-contract";
import { SiteAnalytics } from "./SiteAnalytics";
import type { TelemetryMode } from "@/lib/telemetry-mode";

function beforeSend<T extends { url: string }>(event: T): T | null {
  const url = sanitizeTelemetryUrl(event.url);
  return url ? { ...event, url } : null;
}

export function SiteTelemetry({ mode }: { mode: TelemetryMode }) {
  return <>
    <SiteAnalytics mode={mode} />
    {mode !== "local" && <><Analytics beforeSend={beforeSend} /><SpeedInsights beforeSend={beforeSend} /></>}
  </>;
}
