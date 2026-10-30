import { aRouteCopy as copy } from "@/content/a-route";
import { business } from "@/lib/content";
import { RouteFaqs } from "./RouteFaqs";

export function RouteFaqSection() {
  return (
    <section id="faq" className="route-services-76">
      <div className="wrap route-faqsection-149">
        <div className="route-faqsection-150">
          <span className="route-hero-31">{copy.faqsectionFAQs}</span>
          <h2 className="route-howitworks-111">
            {copy.faqsectionQuestionsBeforeYouMove}
          </h2>
          <p className="route-faqsection-151">
            {copy.faqsectionCanTFindYourAnswerA}
          </p>
          <div className="route-faqsection-152">
            <span className="route-hero-44">
              {copy.faqsectionCallACoordinator}
            </span>
            <a href={business.phoneHref} className="route-faqsection-153">
              {copy.faqsectionBusinessPhoneDisplay}
            </a>
            <span className="route-hero-44">
              {copy.faqsectionMonSun8am12am}
              <a
                href="mailto:support@vantagehomemovers.com"
                className="route-header-5"
              >
                {copy.faqsectionBusinessEmail}
              </a>
            </span>
          </div>
        </div>
        <div className="route-faqsection-154">
          <RouteFaqs />
        </div>
      </div>
    </section>
  );
}
