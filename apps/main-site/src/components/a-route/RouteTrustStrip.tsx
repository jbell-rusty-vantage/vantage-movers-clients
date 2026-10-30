import { aRouteCopy as copy } from "@/content/a-route";

export function RouteTrustStrip() {
  return (
    <section aria-label="Trusted by" className="route-truststrip-61">
      <div className="wrap route-truststrip-62">
        <span className="route-truststrip-63">{copy.truststripTrustedBy}</span>
        <ul className="route-truststrip-64">
          <li className="route-truststrip-65">{copy.truststripTBM}</li>
          <li className="route-truststrip-66">
            <span className="route-truststrip-67">
              {copy.truststripTBMLabel}
            </span>
            <span className="route-truststrip-68">{copy.truststripPRIME}</span>
          </li>
          <li className="route-truststrip-69">
            <span className="route-truststrip-70">{copy.truststrip10}</span>
            <span className="route-truststrip-71">
              <span>{copy.truststripTop10}</span>
              <span>{copy.truststripMovingCompanies}</span>
            </span>
          </li>
          <li className="route-truststrip-72">
            {copy.truststripConsumer}
            <span className="route-truststrip-73">{copy.truststripVoice}</span>
          </li>
          <li className="route-truststrip-74">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="i route-truststrip-75"
            >
              <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <circle cx="17" cy="17" r="2"></circle>
            </svg>
            {copy.truststripGetmovers}
          </li>
        </ul>
      </div>
    </section>
  );
}
