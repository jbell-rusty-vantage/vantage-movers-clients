import { z } from "zod";
import { getGoogleAccessToken } from "../google-auth";
import { parseDestination } from "@/lib/quote-journey";

export const runtime = "nodejs";
const inputSchema = z.object({
  latitude: z.number().min(-90).max(90), longitude: z.number().min(-180).max(180),
  locale: z.enum(["en", "es"]),
}).strict();
const resultSchema = z.object({ results: z.array(z.object({ addressComponents: z.array(z.object({
  longText: z.string().optional(), shortText: z.string().optional(), types: z.array(z.string()),
})).optional() })).optional() });
const respond = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "private, no-store" } });

// Advisory lookup only. Coordinates never enter Lead payloads, analytics, shared caches or logs.
export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if ((origin && origin !== new URL(req.url).origin) || req.headers.get("sec-fetch-site") === "cross-site") return respond({ suggestion: null }, 403);
  let input;
  try {
    const raw = await req.text();
    if (raw.length > 1024) return respond({ suggestion: null }, 400);
    input = inputSchema.safeParse(JSON.parse(raw));
  } catch { return respond({ suggestion: null }, 400); }
  if (!input.success) return respond({ suggestion: null }, 400);
  try {
    const { latitude, longitude, locale } = input.data;
    const token = await getGoogleAccessToken("pickup-location");
    // Google's server API requires a URL location; never expose that URL to the browser.
    const url = new URL(`https://geocode.googleapis.com/v4/geocode/location/${latitude.toFixed(3)},${longitude.toFixed(3)}`);
    url.searchParams.set("languageCode", locale === "es" ? "es" : "en");
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000), headers: {
      Authorization: `Bearer ${token}`, "X-Goog-FieldMask": "results.addressComponents",
    } });
    if (!response.ok) return respond({ suggestion: null }, 503);
    const data = resultSchema.parse(await response.json());
    for (const result of data.results ?? []) {
      const component = (type: string, short = false) => {
        const item = result.addressComponents?.find(value => value.types.includes(type));
        return (short ? item?.shortText : item?.longText) || "";
      };
      const suggestion = parseDestination({ postalCode: component("postal_code"), city: component("locality") || component("postal_town"), state: component("administrative_area_level_1", true), country: component("country", true) });
      if (suggestion) return respond({ suggestion });
    }
    return respond({ suggestion: null });
  } catch { return respond({ suggestion: null }, 503); }
}
