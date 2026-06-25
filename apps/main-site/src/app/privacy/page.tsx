import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { privacyPolicy } from "@/content/legal/docs";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
};

export default function PrivacyPage() {
  return <PolicyPage doc={privacyPolicy} />;
}
