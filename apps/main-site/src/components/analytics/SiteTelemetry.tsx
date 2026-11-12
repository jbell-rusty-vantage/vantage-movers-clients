"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { sanitizeTelemetryUrl } from "@/lib/analytics-contract";
import { SiteAnalytics } from "./SiteAnalytics";

function beforeSend<T extends { url: string }>(event: T): T | null {
  const url = sanitizeTelemetryUrl(event.url);
  return url ? { ...event, url } : null;
}

export function SiteTelemetry({ enabled }: { enabled: boolean }) {
  return <>
    <SiteAnalytics enabled={enabled} />
    {enabled && <><Analytics beforeSend={beforeSend} /><SpeedInsights beforeSend={beforeSend} /></>}
  </>;
}
