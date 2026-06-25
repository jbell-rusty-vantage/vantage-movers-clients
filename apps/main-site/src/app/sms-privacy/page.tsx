import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { smsPrivacyPolicy } from "@/content/legal/docs";

export const metadata: Metadata = {
  title: smsPrivacyPolicy.title,
  description: smsPrivacyPolicy.description,
};

export default function SmsPrivacyPage() {
  return <PolicyPage doc={smsPrivacyPolicy} />;
}
