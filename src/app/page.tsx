import { LandingPage } from "@/components/LandingPage";
import { MAIN_SITE } from "@/content/partners";
import { getTestimonials } from "@/lib/vantage/server";

export default async function Home() {
  const testimonials = await getTestimonials();
  return <LandingPage source={MAIN_SITE} testimonials={testimonials} />;
}
