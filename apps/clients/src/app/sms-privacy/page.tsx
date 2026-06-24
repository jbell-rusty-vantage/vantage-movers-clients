import type { Metadata } from "next";
import { site } from "@/content/site";
import { smsPrivacyPolicy } from "@/content/legal/sms-privacy";
import { PolicyPage } from "@/components/policy/PolicyPage";

export const metadata: Metadata = {
  title: `${smsPrivacyPolicy.title} — ${site.name}`,
  description: smsPrivacyPolicy.description,
};

export default function SmsPrivacy() {
  return <PolicyPage doc={smsPrivacyPolicy} />;
}
