import { HomePage } from "@/components/HomePage";
import { getTestimonials } from "@vantage/api-client";

export default async function Home() {
  const testimonials = (await getTestimonials()).filter((item) => item.published);
  return <HomePage testimonials={testimonials} />;
}
