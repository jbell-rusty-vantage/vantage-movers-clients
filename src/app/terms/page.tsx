import type { Metadata } from "next";
import { site } from "@/content/site";
import { termsConditions } from "@/content/legal/terms";
import { PolicyPage } from "@/components/policy/PolicyPage";

export const metadata: Metadata = {
  title: `${termsConditions.title} — ${site.name}`,
  description: termsConditions.description,
};

export default function Terms() {
  return <PolicyPage doc={termsConditions} />;
}
