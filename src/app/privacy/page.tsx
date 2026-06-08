import type { Metadata } from "next";
import { privacyPolicy } from "@/content/legal/privacy";
import { PolicyPage } from "@/components/policy/PolicyPage";

export const metadata: Metadata = {
  title: `${privacyPolicy.title} — Vantage Movers`,
  description: privacyPolicy.description,
};

export default function Privacy() {
  return <PolicyPage doc={privacyPolicy} />;
}
