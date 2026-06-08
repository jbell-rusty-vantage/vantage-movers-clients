import type { SiteConfig } from "@/types";

/**
 * Central site configuration. This is the single place to update brand
 * details, the public phone number, license numbers, and the footer
 * disclaimer. Values here are PLACEHOLDERS pending the real ones.
 */
export const site: SiteConfig = {
  name: "Vantage Movers",
  phone: "(800) 555-0199",
  email: "admin@vantagemovers.com",
  hours: "Mon–Sun · 8am–11pm",
  address: {
    line1: "7789 NW Beacon Square Blvd",
    line2: "Boca Raton, FL 33487",
  },
  license: {
    dot: "DOT: 4078939",
    mc: "MC: 1551322",
  },
  tagline: "Nationwide Moving Network",
  copyrightYear: 2026,
  brokerDisclaimer:
    "Please note that a properly licensed interstate broker, such as Vantage Movers, is not a motor carrier and will not transport an individual shipper's household goods, but will coordinate and arrange for the transportation of household goods by an FMCSA-authorized motor carrier. All estimated charges and final actual charges will be based upon the carrier's tariff, which is available for inspection from the carrier upon reasonable request.",
};

/** tel: href helper kept here so the formatting rule lives with the config. */
export const telHref = (phone: string = site.phone) =>
  `tel:${phone.replace(/[^0-9]/g, "")}`;
