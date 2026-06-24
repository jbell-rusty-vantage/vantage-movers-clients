import "server-only";

/**
 * Server-only seam to the production vantage-main-server API.
 *
 * This is the single place the site talks to vantage-main-server. It runs
 * exclusively on the server (Server Components + route handlers) so the
 * `VANTAGE_API_SECRET` is never shipped to the browser. The `x-api-secret`
 * header is required by the API's `requireApiSecret` middleware.
 */

const API_BASE_URL =
  process.env.VANTAGE_API_BASE_URL?.replace(/\/+$/, "") ??
  "https://vantage-movers-main-server.vercel.app";

const API_SECRET = process.env.VANTAGE_API_SECRET;

const FORM_LEAD_ROUTE =
  process.env.FORM_LEAD_ROUTE?.replace(/^\/+/, "") ?? "api/v1/form-leads";

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
  quoted?: boolean;
  sms_consent?: boolean;
}

export interface CreateFormLeadResult {
  ok: boolean;
  status: number;
  data?: unknown;
  error?: string;
}

function requireSecret(): string {
  if (!API_SECRET) {
    throw new Error("VANTAGE_API_SECRET is not set");
  }
  return API_SECRET;
}

function authHeaders(): HeadersInit {
  return {
    "content-type": "application/json",
    "x-api-secret": requireSecret(),
  };
}

/**
 * Fetch published testimonials. Returns an empty array (never throws) so the
 * caller can gracefully fall back to static reviews if the API is unavailable.
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
    return body.data?.items ?? [];
  } catch (error) {
    console.error("[vantage] testimonials fetch error:", error);
    return [];
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
