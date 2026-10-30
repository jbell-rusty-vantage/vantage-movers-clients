import { aRouteCopy as copy } from "@/content/a-route";
import { business } from "@/lib/content";

export function RouteHeader() {
  return (
    <header className="route-header-1">
      <div className="wrap route-header-2">
        <a
          href="#top"
          aria-label="Vantage Movers home"
          className="route-header-3"
        >
          <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
            <rect
              x="0.75"
              y="0.75"
              width="28.5"
              height="28.5"
              rx="9"
              fill="#0f1a17"
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
          <span className="route-header-4">
            {copy.headerVantage}
            <span className="route-header-5">{copy.headerMovers}</span>
          </span>
        </a>
        <nav aria-label="Primary" className="route-header-6">
          <details className="route-menu">
            <summary>{copy.headerServices}</summary>
            <div className="route-menu-items">
              <a href="#services">{copy.headerLongDistance}</a>
              <a href="#services">{copy.headerInterstate}</a>
              <a href="#services">{copy.headerResidential}</a>
              <a href="#services">{copy.headerCommercialOffice}</a>
              <a href="#services">{copy.headerMilitary}</a>
              <a href="#services">{copy.headerSenior}</a>
              <a href="#services">{copy.headerPacking}</a>
              <a href="#services">{copy.headerLoadingUnloading}</a>
              <a href="#services">{copy.headerStorage}</a>
              <a href="#services">{copy.headerAutoTransport}</a>
            </div>
          </details>
          <a href="#coverage" className="nav-a route-header-7">
            {copy.headerLocations}
          </a>
          <a href="#coordination" className="nav-a route-header-7">
            {copy.headerAboutUs}
          </a>
          <a href="#faq" className="nav-a route-header-7">
            {copy.headerFAQs}
          </a>
          <a href="#contact" className="nav-a route-header-7">
            {copy.headerContact}
          </a>
        </nav>
        <div className="route-header-8">
          <a href={business.phoneHref} className="route-header-9">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="i"
            >
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"></path>
            </svg>
            {copy.headerBusinessPhoneDisplay}
          </a>
          <a href="#quote" className="btn-o route-header-10">
            {copy.headerFreeQuote}
          </a>
        </div>
      </div>
    </header>
  );
}
