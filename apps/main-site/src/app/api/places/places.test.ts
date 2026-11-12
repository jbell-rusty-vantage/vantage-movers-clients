import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("./google-auth", () => ({ getGoogleAccessToken: vi.fn().mockResolvedValue("synthetic-token") }));
import { GET as autocomplete } from "./autocomplete/route";
import { GET as details } from "./details/route";

afterEach(() => vi.unstubAllGlobals());

describe("localized advisory Places seam", () => {
  it.each([["es", "es-US"], ["en", "en-US"], ["invalid", "en-US"]])("allowlists %s autocomplete language", async (locale, language) => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ suggestions: [] }));
    vi.stubGlobal("fetch", fetchMock);
    expect((await autocomplete(new Request(`http://localhost/api/places/autocomplete?input=53703&locale=${locale}`))).status).toBe(200);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).languageCode).toBe(language);
  });
  it("returns structured city/state identity independently of translated display text", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ formattedAddress: "Madison, Wisconsin, EE. UU.", addressComponents: [
      { longText: "53703", types: ["postal_code"] }, { longText: "Madison", types: ["locality"] },
      { longText: "Wisconsin", shortText: "WI", types: ["administrative_area_level_1"] },
      { longText: "Estados Unidos", shortText: "US", types: ["country"] },
    ] }));
    vi.stubGlobal("fetch", fetchMock);
    const response = await details(new Request("http://localhost/api/places/details?placeId=synthetic&locale=es"));
    expect(await response.json()).toMatchObject({ city: "Madison", state: "WI", country: "US", postalCode: "53703" });
    expect(String(fetchMock.mock.calls[0][0])).toContain("languageCode=es-US");
  });
  it("does not request incomplete ZIPs or missing place IDs", async () => {
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
    expect(await (await autocomplete(new Request("http://localhost/api/places/autocomplete?input=537"))).json()).toEqual({ suggestions: [] });
    expect((await details(new Request("http://localhost/api/places/details"))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
