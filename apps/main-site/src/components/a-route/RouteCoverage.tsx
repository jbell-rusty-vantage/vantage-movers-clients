"use client";

import { useState } from "react";
import usa from "@svg-maps/usa";
import { coverageCopy, stateNames } from "@/lib/content";
import { aRouteCoverage as copy } from "@/content/a-route";

/** The same state data as the existing site, rendered in A Route's dot-map treatment. */
export function RouteCoverage() {
  const [selected, setSelected] = useState("FL");
  const name = stateNames[selected];
  return (
    <section id="coverage" className="route-coverage">
      <div className="wrap">
        <div className="route-section-heading">
          <div>
            <span className="route-eyebrow">{copy.eyebrow}</span>
            <h2>{copy.title}</h2>
          </div>
          <label className="route-state-picker">
            {copy.selectLabel}
            <select
              value={selected}
              onChange={(event) => setSelected(event.target.value)}
            >
              {Object.entries(stateNames)
                .sort((a, b) => a[1].localeCompare(b[1]))
                .map(([abbr, state]) => (
                  <option key={abbr} value={abbr}>
                    {state}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="route-coverage-grid">
          <figure className="route-map">
            <svg
              viewBox={usa.viewBox}
              role="img"
              aria-label={`United States coverage map, ${name} selected`}
            >
              <defs>
                <pattern
                  id="route-map-dots"
                  width="18"
                  height="18"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="9" cy="9" r="5.5" fill="#c3cac3" />
                </pattern>
                <pattern
                  id="route-selected-dots"
                  width="18"
                  height="18"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="9" cy="9" r="5.5" fill="#ff5b2e" />
                </pattern>
              </defs>
              {usa.locations.map((state) => (
                <path
                  key={state.id}
                  d={state.path}
                  fill={
                    state.id.toUpperCase() === selected
                      ? "url(#route-selected-dots)"
                      : "url(#route-map-dots)"
                  }
                >
                  <title>{state.name}</title>
                </path>
              ))}
            </svg>
            <figcaption>
              <span>● {copy.legend}</span>
              <span className="route-selected-legend">● {name}</span>
            </figcaption>
          </figure>
          <aside className="route-state-card" aria-live="polite">
            <span className="route-eyebrow">
              {copy.stateLabel} · {selected}
            </span>
            <h3>{name}</h3>
            <p>{coverageCopy(name)}</p>
            <dl>
              <div>
                <dt>{copy.servicesLabel}</dt>
                <dd>{copy.services}</dd>
              </div>
              <div>
                <dt>{copy.addOnsLabel}</dt>
                <dd>{copy.addOns}</dd>
              </div>
              <div>
                <dt>{copy.officeLabel}</dt>
                <dd>{copy.office}</dd>
              </div>
            </dl>
            <a href="#quote" className="route-button">
              {copy.cta} {name} →
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
