import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("../google-auth", () => ({ getGoogleAccessToken: vi.fn().mockResolvedValue("synthetic-token") }));
import { POST } from "./route";
import { getGoogleAccessToken } from "../google-auth";
const input = { latitude: 43.074712345, longitude: -89.384212345, locale: "es" };
const request = (value: unknown, origin = "https://preview.example") => new Request("https://preview.example/api/places/pickup-location", { method: "POST", headers: { origin }, body: JSON.stringify(value) });
const components = [
  { types: ["postal_code"], longText: "53703" }, { types: ["locality"], longText: "Madison" },
  { types: ["administrative_area_level_1"], shortText: "WI" }, { types: ["country"], shortText: "US" },
  { types: ["street_number"], longText: "SYNTHETIC-PRIVATE-STREET" },
];
afterEach(() => { vi.unstubAllGlobals(); vi.clearAllMocks(); });
describe("optional pickup location", () => {
  it("returns only US ZIP/city/state, reduces coordinate precision, uses restricted scope and no cache", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ results: [{ addressComponents: components }], plusCode: "private" }));
    vi.stubGlobal("fetch", fetchMock);
    const response = await POST(request(input));
    expect(await response.json()).toEqual({ suggestion: { postalCode: "53703", city: "Madison", state: "WI", country: "US" } });
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(String(fetchMock.mock.calls[0][0])).toBe("https://geocode.googleapis.com/v4/geocode/location/43.075,-89.384?languageCode=es");
    expect(fetchMock.mock.calls[0][1].cache).toBe("no-store");
    expect(getGoogleAccessToken).toHaveBeenCalledWith("pickup-location");
  });
  it.each([{ ...input, latitude: 91 }, { ...input, longitude: "-89" }, { ...input, locale: "xx" }, { ...input, email: "private" }])("rejects invalid input before provider access", async value => {
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
    expect((await POST(request(value))).status).toBe(400); expect(fetchMock).not.toHaveBeenCalled();
  });
  it("rejects cross-origin requests", async () => {
    expect((await POST(request(input, "https://other.example"))).status).toBe(403);
    expect(getGoogleAccessToken).not.toHaveBeenCalled();
  });
  it("does not suggest foreign or incomplete locations", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ results: [{ addressComponents: components.map(value => value.types[0] === "country" ? { ...value, shortText: "CA" } : value) }, { addressComponents: [] }] })));
    expect(await (await POST(request(input))).json()).toEqual({ suggestion: null });
  });
  it("returns a generic fallback without upstream secrets, URLs or location errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("secret-coordinate-url")));
    const response = await POST(request(input));
    expect(response.status).toBe(503); expect(await response.json()).toEqual({ suggestion: null });
  });
});
