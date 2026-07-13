const apiSecret = process.env.VANTAGE_API_SECRET?.trim();
const apiBaseUrl =
  process.env.VANTAGE_API_BASE_URL?.trim().replace(/\/+$/, "") ||
  "https://vantage-movers-main-server.vercel.app";

if (!apiSecret) {
  throw new Error("VANTAGE_API_SECRET is required to build the main site");
}

const checks = [
  {
    name: "published testimonials",
    path: "/api/v1/testimonials?published=true&limit=1",
  },
  {
    name: "active moving carriers",
    path: "/api/v1/moving-carriers?active=true&limit=1&page=1",
  },
];

for (const check of checks) {
  const response = await fetch(`${apiBaseUrl}${check.path}`, {
    headers: {
      "x-api-secret": apiSecret,
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`${check.name} API check failed with HTTP ${response.status}`);
  }

  const body = await response.json();
  const items = body?.data?.items;

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error(`${check.name} API check returned no items`);
  }

  console.log(`Verified ${check.name}`);
}
