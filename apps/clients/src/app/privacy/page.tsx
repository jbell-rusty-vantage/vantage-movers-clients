import type { Metadata } from "next";
import { site } from "@/content/site";
import { privacyPolicy } from "@/content/legal/privacy";
import { PolicyPage } from "@/components/policy/PolicyPage";

export const metadata: Metadata = {
  title: `${privacyPolicy.title} — ${site.name}`,
  description: privacyPolicy.description,
};

export default function Privacy() {
  return <PolicyPage doc={privacyPolicy} />;
}
