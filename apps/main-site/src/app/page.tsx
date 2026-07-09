import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { business } from "@/lib/content";
import { siteDescription } from "@/lib/site";
import { getTestimonials } from "@vantage/api-client";

export const metadata: Metadata = {
  title: `${business.name} | Nationwide Long-Distance Moving Broker`,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const testimonialsPromise = getTestimonials()
    .then((items) => items.filter((item) => item.published))
    .catch((error) => {
      console.error("[main-site testimonials]", error);
      return [];
    });

  return <HomePage testimonialsPromise={testimonialsPromise} />;
}
