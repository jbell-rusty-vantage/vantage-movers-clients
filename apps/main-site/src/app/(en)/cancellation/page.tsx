import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { cancellationPolicy } from "@/content/legal/docs";

export const metadata: Metadata = {
  title: cancellationPolicy.title,
  description: cancellationPolicy.description,
  alternates: {
    canonical: "/cancellation",
  },
};

export default function CancellationPage() {
  return <PolicyPage doc={cancellationPolicy} />;
}
