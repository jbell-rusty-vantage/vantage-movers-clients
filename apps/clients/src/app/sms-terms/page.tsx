import type { Metadata } from "next";
import { site } from "@/content/site";
import { smsTerms } from "@/content/legal/sms-terms";
import { PolicyPage } from "@/components/policy/PolicyPage";

export const metadata: Metadata = {
  title: `${smsTerms.title} — ${site.name}`,
  description: smsTerms.description,
};

export default function SmsTerms() {
  return <PolicyPage doc={smsTerms} />;
}
