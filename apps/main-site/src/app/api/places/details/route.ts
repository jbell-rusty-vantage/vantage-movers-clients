import { NextResponse } from "next/server";
import { getGoogleAccessToken } from "../google-auth";

export const runtime = "nodejs";

interface PlaceDetailsResponse {
  formattedAddress?: string;
  addressComponents?: Array<{
    longText?: string;
    shortText?: string;
    types?: string[];
  }>;
}

function getPostalCode(place: PlaceDetailsResponse) {
  const postalCode = place.addressComponents?.find((component) =>
    component.types?.includes("postal_code"),
  );

  return postalCode?.longText || postalCode?.shortText || "";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const placeId = url.searchParams.get("placeId")?.trim();
  const sessionToken = url.searchParams.get("sessionToken")?.trim();
  const locale = url.searchParams.get("locale") === "es-US" ? "es-US" : "en-US";

  if (!placeId) {
    return NextResponse.json({ error: "placeId is required" }, { status: 400 });
  }

  try {
    const token = await getGoogleAccessToken();
    const detailsUrl = new URL(`https://places.googleapis.com/v1/places/${placeId}`);
    if (sessionToken) detailsUrl.searchParams.set("sessionToken", sessionToken);
    detailsUrl.searchParams.set("languageCode", locale);

    const res = await fetch(detailsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Goog-FieldMask": "formattedAddress,addressComponents",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Place details request failed" }, { status: 502 });
    }

    const place = (await res.json()) as PlaceDetailsResponse;
    return NextResponse.json({
      formattedAddress: place.formattedAddress,
      postalCode: getPostalCode(place),
    });
  } catch (error) {
    console.error("[places/details]", error);
    return NextResponse.json({ error: "Place details unavailable" }, { status: 500 });
  }
}
