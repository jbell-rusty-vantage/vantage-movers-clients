import { LandingPage } from "@/components/LandingPage";
import { PARTNERS } from "@/content/partners";
import { getTestimonials } from "@vantage/api-client";

export default async function TbmPrimesLanding() {
  const testimonials = await getTestimonials();
  return <LandingPage source={PARTNERS["tbm-primes"]} testimonials={testimonials} />;
}
