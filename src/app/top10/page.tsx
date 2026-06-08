import { LandingPage } from "@/components/LandingPage";
import { PARTNERS } from "@/content/partners";
import { getTestimonials } from "@/lib/vantage/server";

export default async function Top10Landing() {
  const testimonials = await getTestimonials();
  return <LandingPage source={PARTNERS.top10} testimonials={testimonials} />;
}
