import { aRouteCopy as copy } from "@/content/a-route";
import { business } from "@/lib/content";

export function RouteFooter() {
  return (
    <footer className="route-footer-173">
      <div className="wrap route-services-77">
        <div className="route-footer-174">
          <div className="route-footer-175">
            <a
              href="#top"
              aria-label="Vantage Movers home"
              className="route-footer-176"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                aria-hidden="true"
              >
                <rect
                  x="0.75"
                  y="0.75"
                  width="28.5"
                  height="28.5"
                  rx="9"
                  fill="none"
                  stroke="#2f3f3a"
                  strokeWidth="1.5"
                ></rect>
                <path
                  d="M8 21c0-5 4-5 7-7.5S20 9 22 9"
                  fill="none"
                  stroke="#e9eeea"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="2 2.6"
                ></path>
                <circle cx="8" cy="21" r="2.6" fill="#e9eeea"></circle>
                <circle cx="22" cy="9" r="3" fill="#ff5b2e"></circle>
              </svg>
              <span className="route-footer-177">
                {copy.footerVantage}
                <span className="route-licensing-105">{copy.footerMovers}</span>
              </span>
            </a>
            <address className="route-footer-178">
              {copy.footerBusinessAddress0}
              <br />
              {copy.footerBusinessAddress1}
            </address>
            <div className="route-footer-179">
              <a href={business.phoneHref} className="route-footer-180">
                {copy.footerBusinessPhoneDisplay}
              </a>
              <span className="route-licensing-105">
                {copy.footerMonSun8am12am}
              </span>
              <a
                href="mailto:support@vantagehomemovers.com"
                className="route-footer-181"
              >
                {copy.footerBusinessEmail}
              </a>
            </div>
          </div>
          <nav aria-label="Services" className="route-footer-182">
            <span className="route-footer-183">{copy.footerServices}</span>
            <a href="#services" className="route-footer-184">
              {copy.footerLongDistance}
            </a>
            <a href="#services" className="route-footer-184">
              {copy.footerInterstate}
            </a>
            <a href="#services" className="route-footer-184">
              {copy.footerResidential}
            </a>
            <a href="#services" className="route-footer-184">
              {copy.footerCorporateRelocation}
            </a>
            <a href="#services" className="route-footer-184">
              {copy.footerCommercialOffice}
            </a>
            <a href="#services" className="route-footer-184">
              {copy.footerMilitary}
            </a>
            <a href="#services" className="route-footer-184">
              {copy.footerSenior}
            </a>
            <a href="#services" className="route-footer-184">
              {copy.footerPacking}
            </a>
            <a href="#services" className="route-footer-184">
              {copy.footerLoadingUnloading}
            </a>
            <a href="#services" className="route-footer-184">
              {copy.footerMovingCoordination}
            </a>
          </nav>
          <nav aria-label="Company" className="route-footer-182">
            <span className="route-footer-183">{copy.footerCompany}</span>
            <a href="/carrier-contacts" className="route-footer-184">
              {copy.footerJoinOurCarrierNetwork}
            </a>
            <a href="/consumer-information" className="route-footer-184">
              {copy.footerConsumerInformation}
            </a>
            <a href="#coordination" className="route-footer-184">
              {copy.footerAbout}
            </a>
            <a href="#coverage" className="route-footer-184">
              {copy.footerServiceAreas}
            </a>
            <a href="#faq" className="route-footer-184">
              {copy.footerFAQs}
            </a>
            <a href="#contact" className="route-footer-184">
              {copy.footerContact}
            </a>
          </nav>
          <nav aria-label="Legal" className="route-footer-185">
            <span className="route-footer-183">{copy.footerLegal}</span>
            <a href="/privacy" className="route-footer-184">
              {copy.footerPrivacy}
            </a>
            <a href="/terms" className="route-footer-184">
              {copy.footerTerms}
            </a>
            <a href="/sms-privacy" className="route-footer-184">
              {copy.footerSMSPrivacy}
            </a>
            <a href="/sms-terms" className="route-footer-184">
              {copy.footerSMSTerms}
            </a>
            <a href="/cancellation" className="route-footer-184">
              {copy.footerCancellationPolicy}
            </a>
            <a href="/your-rights" className="route-footer-184">
              {copy.footerYourRightsResponsibilities}
            </a>
            <a href="/ready-to-move" className="route-footer-184">
              {copy.footerReadyToMove}
            </a>
            <a href="/privacy#dns" className="route-footer-184">
              {copy.footerDoNotSellMyInfo}
            </a>
          </nav>
        </div>
        <div className="route-footer-186">
          <p className="route-footer-187">{business.brokerDisclaimer}</p>
          <div className="route-footer-188">
            <span className="route-footer-189">
              {copy.footerDOTBusinessDotMCBusinessMc}
            </span>
            <span className="route-footer-183">{business.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
