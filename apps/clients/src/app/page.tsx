import { LandingPage } from "@/components/LandingPage";
import { MAIN_SITE } from "@/content/partners";
import { getTestimonials } from "@vantage/api-client";

export default async function Home() {
  const testimonials = await getTestimonials();
  return <LandingPage source={MAIN_SITE} testimonials={testimonials} />;
}
