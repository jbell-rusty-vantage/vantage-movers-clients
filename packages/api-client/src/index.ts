import "server-only";

/**
 * Server-only seam to the production vantage-main-server API.
 *
 * This is the single place the site talks to vantage-main-server. It runs
 * exclusively on the server (Server Components + route handlers) so the
 * `VANTAGE_API_SECRET` is never shipped to the browser. The `x-api-secret`
 * header is required by the API's `requireApiSecret` middleware.
 */

const DEFAULT_API_BASE_URL = "https://vantage-movers-main-server.vercel.app";

function resolveApiBaseUrl(value: string | undefined): string {
  const configured = value?.trim().replace(/^(['"])(.*)\1$/, "$2");
  if (!configured) {
    return DEFAULT_API_BASE_URL;
  }

  try {
    const url = new URL(
      /^[a-z][a-z\d+.-]*:\/\//i.test(configured) ? configured : `https://${configured}`,
    );
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error(`unsupported protocol ${url.protocol}`);
    }
    if (url.search || url.hash) {
      throw new Error("query strings and fragments are not allowed");
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    console.warn(
      "[vantage] VANTAGE_API_BASE_URL is invalid; using the production API URL",
    );
    return DEFAULT_API_BASE_URL;
  }
}

const API_BASE_URL = resolveApiBaseUrl(process.env.VANTAGE_API_BASE_URL);

const API_SECRET = process.env.VANTAGE_API_SECRET?.trim();

const FORM_LEAD_ROUTE =
  process.env.FORM_LEAD_ROUTE?.trim().replace(/^\/+|\/+$/g, "") || "api/v1/form-leads";

type NextFetchInit = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] };
};

export interface Testimonial {
  id: string;
  source: string;
  reviewer_name: string;
  review_date: string;
  rating: number;
  review_text: string;
  business_response: { responded_at: string; text: string } | null;
  published: boolean;
  featured: boolean;
}

export interface MovingCarrier {
  id: string;
  _id: string;
  name: string;
  dot_number: string;
  mc_number: string;
  active: boolean;
}

interface TestimonialListResponse {
  ok: boolean;
  data?: {
    items: Testimonial[];
    page: number;
    limit: number;
    total: number;
    has_next_page: boolean;
  };
  error?: string;
}

interface MovingCarrierListResponse {
  ok: boolean;
  data?: {
    items: MovingCarrier[];
    page: number;
    limit: number;
    total: number;
    has_next_page: boolean;
  };
  error?: string;
}

export interface CreateFormLeadInput {
  source_company: string;
  source_company_site?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number: string;
  pickup_zip: string;
  destination_zip: string;
  move_size: string;
  move_date?: string;
  ref_no?: string;
  lid?: string;
  post_to_granot?: boolean;
  quoted?: boolean;
  sms_consent?: boolean;
}

export interface CreateFormLeadResult {
  ok: boolean;
  status: number;
  data?: unknown;
  error?: string;
}

function readApiSecret(): string | null {
  const secret = API_SECRET;
  if (!secret) {
    console.error("[vantage] moving carriers fetch skipped: VANTAGE_API_SECRET is not set");
    return null;
  }
  return secret;
}

function authHeaders(): HeadersInit {
  const secret = readApiSecret();
  if (!secret) {
    throw new Error("VANTAGE_API_SECRET is not set");
  }

  return {
    "content-type": "application/json",
    "x-api-secret": secret,
  };
}

/**
 * Fetch published testimonials. Returns an empty array (never throws) when the
 * API is unavailable; callers should hide the testimonials UI rather than show
 * placeholder copy.
 */
export async function getTestimonials(
  options: { limit?: number; featured?: boolean } = {},
): Promise<Testimonial[]> {
  const { limit = 24, featured } = options;
  const params = new URLSearchParams({ published: "true", limit: String(limit) });
  if (featured !== undefined) {
    params.set("featured", String(featured));
  }

  try {
    const init: NextFetchInit = {
      method: "GET",
      headers: authHeaders(),
      // Testimonials change rarely; cache and revalidate every 5 minutes.
      next: { revalidate: 300 },
    };
    const res = await fetch(`${API_BASE_URL}/api/v1/testimonials?${params.toString()}`, init);

    if (!res.ok) {
      console.error(`[vantage] testimonials fetch failed: ${res.status}`);
      return [];
    }

    const body = (await res.json()) as TestimonialListResponse;
    return (body.data?.items ?? []).filter((item) => item.published);
  } catch (error) {
    console.error("[vantage] testimonials fetch error:", error);
    return [];
  }
}

/** Fetch all active moving carriers; revalidate frequently so the footer stays current. */
export async function getMovingCarriers(options: { pageSize?: number } = {}): Promise<MovingCarrier[]> {
  const { pageSize = 250 } = options;
  const carriers: MovingCarrier[] = [];

  if (!readApiSecret()) {
    return [];
  }

  try {
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const params = new URLSearchParams({
        active: "true",
        limit: String(pageSize),
        page: String(page),
      });

      const init: NextFetchInit = {
        method: "GET",
        headers: authHeaders(),
        // The footer is rendered during prerender/build, so use ISR instead of
        // `no-store` to keep pages static while still refreshing the carrier list.
        next: { revalidate: 300, tags: ["moving-carriers"] },
      };

      const res = await fetch(`${API_BASE_URL}/api/v1/moving-carriers?${params.toString()}`, init);

      if (!res.ok) {
        const errorBody = await res.text().catch(() => "");
        console.error(
          `[vantage] moving carriers fetch failed: ${res.status} ${res.statusText} (${API_BASE_URL})`,
          errorBody.slice(0, 200),
        );
        return page === 1 ? [] : carriers;
      }

      const body = (await res.json()) as MovingCarrierListResponse;
      carriers.push(...(body.data?.items ?? []).filter((item) => item.active));
      hasNextPage = body.data?.has_next_page === true;
      page += 1;
    }

    return carriers;
  } catch (error) {
    console.error("[vantage] moving carriers fetch error:", error);
    return carriers;
  }
}

/** Create a form lead in vantage-main-server. */
export async function createFormLead(
  input: CreateFormLeadInput,
): Promise<CreateFormLeadResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/${FORM_LEAD_ROUTE}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(input),
      cache: "no-store",
    });

    const data = await res.json().catch(() => undefined);

    if (!res.ok) {
      const error =
        (data as { error?: string } | undefined)?.error ?? `Request failed (${res.status})`;
      return { ok: false, status: res.status, error };
    }

    return { ok: true, status: res.status, data };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}
