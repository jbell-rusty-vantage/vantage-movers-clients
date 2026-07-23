const apiSecret = process.env.VANTAGE_API_SECRET?.trim();
const defaultApiBaseUrl = "https://vantage-movers-main-server.vercel.app";

function resolveApiBaseUrl(value) {
  const configured = value?.trim().replace(/^(['"])(.*)\1$/, "$2");
  if (!configured) {
    return defaultApiBaseUrl;
  }

  const url = new URL(
    /^[a-z][a-z\d+.-]*:\/\//i.test(configured) ? configured : `https://${configured}`,
  );
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("VANTAGE_API_BASE_URL must use http or https");
  }
  if (url.search || url.hash) {
    throw new Error("VANTAGE_API_BASE_URL cannot contain a query string or fragment");
  }
  return url.toString().replace(/\/+$/, "");
}

const apiBaseUrl = resolveApiBaseUrl(process.env.VANTAGE_API_BASE_URL);

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
