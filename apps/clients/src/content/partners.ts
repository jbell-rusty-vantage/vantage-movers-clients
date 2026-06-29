import type { CSSProperties } from "react";

/**
 * Lead-source / partner configuration.
 *
 * Each landing-page URL segment maps to a partner company: the slug determines
 * which logo is juxtaposed with the Vantage Home Movers logo in the header and which
 * `source_company` is sent to vantage-main-server when a form lead is captured.
 *
 * The bare root (`/`) is the canonical Vantage site (`main_site`) and renders no
 * partner logo. `source_company` values must match the server's `SOURCE_COMPANIES`
 * union (see vantage-main-server/api/config/domain/sources.ts).
 */

export type SourceCompany =
  | "tbm_leads"
  | "tbm_prime_leads"
  | "top10_leads"
  | "get_movers_leads"
  | "main_site";

export interface PartnerConfig {
  /** URL segment, "" for the canonical root. */
  slug: string;
  /** Display name of the partner / source company. */
  name: string;
  /** Value sent to the API as `source_company`. */
  sourceCompany: SourceCompany;
  /** Origin site recorded as `source_company_site`. */
  sourceCompanySite: string;
  /** Partner logo path under /public, omitted for the canonical site. */
  logo?: string;
  /** Source-specific public phone number, defaults to the site phone when omitted. */
  phone?: string;
  /** Intrinsic logo width (px) for next/image. */
  logoWidth?: number;
  /** Intrinsic logo height (px) for next/image. */
  logoHeight?: number;
  /** Optional header-only sizing tweaks for unusually shaped partner logos. */
  logoStyle?: CSSProperties;
  /** Accessible label for the partner logo. */
  alt?: string;
}

export const MAIN_SITE: PartnerConfig = {
  slug: "",
  name: "Vantage Home Movers",
  sourceCompany: "main_site",
  sourceCompanySite: "vantagequotes.com",
};

export const PARTNERS: Record<string, PartnerConfig> = {
  tbm: {
    slug: "tbm",
    name: "TBM",
    sourceCompany: "tbm_leads",
    sourceCompanySite: "vantagequotes.com/tbm",
    logo: "/partnerlogos/tbm_leads.svg",
    logoWidth: 190,
    logoHeight: 50,
    alt: "TBM",
  },
  "tbm-primes": {
    slug: "tbm-primes",
    name: "TBM Prime",
    sourceCompany: "tbm_prime_leads",
    sourceCompanySite: "vantagequotes.com/tbm-primes",
    logo: "/partnerlogos/tbm_prime_leads.svg",
    logoWidth: 134,
    logoHeight: 40,
    alt: "TBM Prime",
  },
  top10: {
    slug: "top10",
    name: "Top 10",
    sourceCompany: "top10_leads",
    sourceCompanySite: "vantagequotes.com/top10",
    logo: "/partnerlogos/top10.svg",
    logoWidth: 130,
    logoHeight: 36,
    alt: "Top 10 Moving Companies",
  },
  getmovers: {
    slug: "getmovers",
    name: "GetMovers",
    sourceCompany: "get_movers_leads",
    sourceCompanySite: "vantagequotes.com/getmovers",
    logo: "/partnerlogos/getmovers.svg",
    phone: "(888) 397-1005",
    logoWidth: 207,
    logoHeight: 20,
    logoStyle: { height: "auto", width: "190px" },
    alt: "GetMovers",
  },
};

/** All partner slugs that have a dedicated landing route. */
export const PARTNER_SLUGS = Object.keys(PARTNERS);

/**
 * Resolve a partner config from a pathname (e.g. "/tbm/") or a bare slug
 * (e.g. "tbm"). Unknown / root paths resolve to the canonical Vantage site.
 */
export function resolvePartner(input: string | null | undefined): PartnerConfig {
  if (!input) {
    return MAIN_SITE;
  }
  const slug = input.replace(/^\/+|\/+$/g, "").split("/")[0]?.toLowerCase() ?? "";
  return PARTNERS[slug] ?? MAIN_SITE;
}
