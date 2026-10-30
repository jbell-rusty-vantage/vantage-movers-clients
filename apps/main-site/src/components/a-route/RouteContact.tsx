import { aRouteCopy as copy } from "@/content/a-route";
import { business } from "@/lib/content";
import { Suspense } from "react";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";

export function RouteContact() {
  return (
    <section id="contact" className="route-howitworks-109">
      <div className="wrap route-faqsection-149">
        <div className="route-contact-155">
          <span className="route-hero-31">{copy.contactGetInTouch}</span>
          <h2 className="route-howitworks-111">
            {copy.contactReadyToPlanYourMove}
          </h2>
          <p className="route-contact-156">
            {copy.contactSendYourDetailsAndACoordinator}
          </p>
          <dl className="route-contact-157">
            <div className="route-contact-158">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="i route-contact-159"
              >
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"></path>
              </svg>
              <div className="route-hero-43">
                <dt className="route-hero-44">{copy.contactPhone}</dt>
                <dd className="route-contact-160">
                  <a href={business.phoneHref} className="route-contact-161">
                    {copy.contactBusinessPhoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
            <div className="route-contact-158">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="i route-contact-159"
              >
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 7v5l3 2"></path>
              </svg>
              <div className="route-hero-43">
                <dt className="route-hero-44">{copy.contactHours}</dt>
                <dd className="route-contact-162">
                  {copy.contactMonSun8am12am}
                </dd>
              </div>
            </div>
            <div className="route-contact-158">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="i route-contact-159"
              >
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <path d="M3 7l9 6 9-6"></path>
              </svg>
              <div className="route-hero-43">
                <dt className="route-hero-44">{copy.contactEmail}</dt>
                <dd className="route-contact-160">
                  <a
                    href="mailto:support@vantagehomemovers.com"
                    className="route-contact-163"
                  >
                    {copy.contactBusinessEmail}
                  </a>
                </dd>
              </div>
            </div>
            <div className="route-contact-158">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="i route-contact-159"
              >
                <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"></path>
                <circle cx="12" cy="10" r="2.2"></circle>
              </svg>
              <div className="route-hero-43">
                <dt className="route-hero-44">{copy.contactOffice}</dt>
                <dd className="route-contact-162">
                  {copy.contactBusinessAddress0}
                  <br />
                  {copy.contactBusinessAddress1}
                </dd>
              </div>
            </div>
          </dl>
        </div>
        <div className="route-contact-164">
          <Suspense fallback={<p>Loading quote form…</p>}>
            <div className="route-quote">
              <QuoteWizard variant="panel" formId="a-route-contact" />
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
