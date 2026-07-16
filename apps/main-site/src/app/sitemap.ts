import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { servicePages } from "@/content/services/registry";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/carrier-contacts", priority: 0.7, changeFrequency: "monthly" },
  { path: "/consumer-information", priority: 0.5, changeFrequency: "weekly" },
  { path: "/accessibility", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cancellation", priority: 0.3, changeFrequency: "yearly" },
  { path: "/sms-privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/sms-terms", priority: 0.2, changeFrequency: "yearly" },
] satisfies Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [...routes, ...servicePages.map((service) => ({ path: service.path, priority: 0.8, changeFrequency: "monthly" as const }))].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
