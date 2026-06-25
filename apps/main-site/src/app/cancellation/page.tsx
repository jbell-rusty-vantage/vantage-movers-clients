import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy/PolicyPage";
import { cancellationPolicy } from "@/content/legal/docs";

export const metadata: Metadata = {
  title: cancellationPolicy.title,
  description: cancellationPolicy.description,
};

export default function CancellationPage() {
  return <PolicyPage doc={cancellationPolicy} />;
}
