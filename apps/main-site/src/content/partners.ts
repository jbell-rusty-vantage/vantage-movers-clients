export type SourceCompany =
  | "tbm_leads"
  | "tbm_prime_leads"
  | "top10_leads"
  | "main_site";

export interface PartnerConfig {
  slug: string;
  name: string;
  sourceCompany: SourceCompany;
  sourceCompanySite: string;
}

export const MAIN_SITE: PartnerConfig = {
  slug: "",
  name: "Vantage Home Movers",
  sourceCompany: "main_site",
  sourceCompanySite: "vantagequotes.com",
};
