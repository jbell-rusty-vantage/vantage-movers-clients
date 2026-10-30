import { faqs } from "@/lib/content";

export function RouteFaqs() {
  return faqs.map((item, index) => (
    <details
      className="route-faq"
      key={item.q}
      open={index === 0}
      name="a-route-faq"
    >
      <summary>
        <span className="route-faq-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>{item.q}</span>
        <span className="route-faq-icon" aria-hidden="true" />
      </summary>
      <p>{item.a}</p>
    </details>
  ));
}
