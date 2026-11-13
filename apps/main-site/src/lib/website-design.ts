import { CANYON_WEBSITE_DESIGN, WEBSITE_DESIGN } from "@vantage/api-client/website-attribution";
import { sitePresentation } from "@/lib/presentation";

const designs = { optimized: WEBSITE_DESIGN, canyon: CANYON_WEBSITE_DESIGN };

export const websiteDesign = designs[sitePresentation.id];
