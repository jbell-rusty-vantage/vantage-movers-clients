import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { smsTerms } from "@/content/legal/docs";

export const metadata: Metadata = {
  title: smsTerms.title,
  description: smsTerms.description,
};

export default function SmsTermsPage() {
  return <PolicyPage doc={smsTerms} />;
}
