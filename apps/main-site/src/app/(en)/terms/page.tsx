import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { termsConditions } from "@/content/legal/docs";

export const metadata: Metadata = {
  title: termsConditions.title,
  description: termsConditions.description,
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return <PolicyPage doc={termsConditions} />;
}
