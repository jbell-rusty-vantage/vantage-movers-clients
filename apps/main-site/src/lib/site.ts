import { business } from "@/lib/content";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://vantagehomemovers.com";

export const siteName = business.name;

export const siteDescription =
  "Licensed interstate moving broker helping families and businesses coordinate long-distance moves with FMCSA-authorized motor carriers.";

export const siteKeywords = [
  "long-distance moving broker",
  "interstate moving broker",
  "nationwide moving services",
  "residential moving coordination",
  "commercial relocation",
  "packing and storage services",
  "auto transport coordination",
];

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteUrl}${normalizedPath}`;
}
