import { NextResponse } from "next/server";
import { getGoogleAccessToken } from "../google-auth";

export const runtime = "nodejs";

interface PlacesAutocompleteResponse {
  suggestions?: Array<{
    placePrediction?: {
      placeId?: string;
      text?: {
        text?: string;
      };
      types?: string[];
    };
  }>;
}

function normalizeZip(input: string) {
  return input.replace(/\D/g, "").slice(0, 5);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const input = normalizeZip(url.searchParams.get("input") || "");
  const sessionToken = url.searchParams.get("sessionToken")?.trim();

  if (input.length !== 5) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const token = await getGoogleAccessToken();
    const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Goog-FieldMask": "suggestions.placePrediction.placeId,suggestions.placePrediction.text",
      },
      body: JSON.stringify({
        input,
        includedRegionCodes: ["us"],
        includedPrimaryTypes: ["postal_code"],
        languageCode: "en-US",
        sessionToken,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Places autocomplete request failed" }, { status: 502 });
    }

    const data = (await res.json()) as PlacesAutocompleteResponse;
    const suggestions =
      data.suggestions
        ?.map((suggestion) => suggestion.placePrediction)
        .filter((prediction) => prediction?.placeId && prediction.text?.text)
        .map((prediction) => ({
          placeId: prediction?.placeId,
          text: prediction?.text?.text,
          postalCode: prediction?.text?.text?.match(/\b\d{5}\b/)?.[0] ?? input,
        })) ?? [];

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("[places/autocomplete]", error);
    return NextResponse.json({ error: "Places autocomplete unavailable" }, { status: 500 });
  }
}
