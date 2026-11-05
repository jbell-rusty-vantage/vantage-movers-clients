"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import usa from "@svg-maps/usa";
import { coverageCopy, coverageSection, stateNames } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { radiusClasses } from "@/lib/playground/layout-playground";
import { resolveCoverageColors } from "@/lib/playground/coverage-playground";

/** Playground args promoted to production — see CoverageSection.stories.tsx Playground. */
const COVERAGE_COLORS = resolveCoverageColors("highContrast", {});
const HEADING_FONT_SIZE = 44;
const INTRO_FONT_SIZE = 17;
const DEFAULT_STATE = "FL";

const nameToAbbr = Object.fromEntries(
  Object.entries(stateNames).map(([abbr, name]) => [name, abbr]),
);

type StatePath = {
  abbr: string;
  name: string;
  path: string;
};

type LabelPosition = {
  x: number;
  y: number;
  fontSize: number;
};

const LABEL_OVERRIDES: Partial<Record<string, Partial<LabelPosition>>> = {
  AK: { x: 260, y: 620, fontSize: 10 },
  HI: { x: 320, y: 520, fontSize: 10 },
  DC: { x: 1088, y: 410, fontSize: 8 },
  MD: { x: 1105, y: 392, fontSize: 8 },
  DE: { x: 1120, y: 372, fontSize: 8 },
  RI: { x: 1148, y: 342, fontSize: 8 },
  CT: { x: 1142, y: 328, fontSize: 8 },
  NJ: { x: 1118, y: 358, fontSize: 9 },
  MA: { x: 1155, y: 310, fontSize: 9 },
  NH: { x: 1158, y: 288, fontSize: 9 },
  VT: { x: 1138, y: 278, fontSize: 9 },
  FL: { x: 1045, y: 545, fontSize: 10 },
  LA: { x: 815, y: 495, fontSize: 10 },
  MI: { x: 955, y: 318, fontSize: 10 },
};

function labelFontSize(width: number, height: number) {
  const size = Math.min(width, height);
  if (size < 36) return 8;
  if (size < 52) return 9;
  if (size < 72) return 10;
  return 11;
}

function getStateStyles(
  abbr: string,
  active: string,
  hovered: string | null,
) {
  const isActive = active === abbr;
  const isHovered = hovered === abbr && !isActive;

  if (isActive) {
    return {
      fill: COVERAGE_COLORS.mapActiveFill,
      stroke: COVERAGE_COLORS.mapActiveStroke,
      strokeWidth: 1.6,
      filter: "url(#coverage-state-shadow)",
    };
  }

  if (isHovered) {
    return {
      fill: COVERAGE_COLORS.mapHoverFill,
      stroke: COVERAGE_COLORS.mapHoverStroke,
      strokeWidth: 1.2,
      filter: undefined,
    };
  }

  return {
    fill: COVERAGE_COLORS.mapDefaultFill,
    stroke: COVERAGE_COLORS.mapDefaultStroke,
    strokeWidth: 0.85,
    filter: undefined,
  };
}

function getLabelFill(abbr: string, active: string, hovered: string | null) {
  const isActive = active === abbr;
  const isHovered = hovered === abbr && !isActive;

  if (isActive) return COVERAGE_COLORS.mapActiveLabel;
  if (isHovered) return COVERAGE_COLORS.mapHoverLabel;
  return COVERAGE_COLORS.mapDefaultLabel;
}

function shouldShowLabel(
  abbr: string,
  position: LabelPosition | undefined,
  active: string,
  hovered: string | null,
) {
  return active === abbr || hovered === abbr || (position?.fontSize ?? 0) >= 10;
}

export function CoverageMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [labelPositions, setLabelPositions] = useState<Record<string, LabelPosition>>({});
  const [active, setActive] = useState(DEFAULT_STATE);
  const [hovered, setHovered] = useState<string | null>(null);

  const statePaths = useMemo<StatePath[]>(
    () =>
      usa.locations
        .map((loc) => {
          const abbr = nameToAbbr[loc.name];
          if (!abbr) return null;
          return { abbr, name: loc.name, path: loc.path };
        })
        .filter((loc): loc is StatePath => loc !== null),
    [],
  );

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const positions: Record<string, LabelPosition> = {};

    for (const { abbr } of statePaths) {
      const pathEl = svg.querySelector<SVGPathElement>(`#coverage-state-${abbr}`);
      if (!pathEl) continue;

      const box = pathEl.getBBox();
      const override = LABEL_OVERRIDES[abbr];

      positions[abbr] = {
        x: override?.x ?? box.x + box.width / 2,
        y: override?.y ?? box.y + box.height / 2,
        fontSize: override?.fontSize ?? labelFontSize(box.width, box.height),
      };
    }

    setLabelPositions(positions);
  }, [statePaths]);

  const selName = stateNames[active]!;
  const previewAbbr = hovered ?? active;
  const previewName = stateNames[previewAbbr] ?? selName;

  const selectState = useCallback((abbr: string) => {
    setActive(abbr);
  }, []);

  return (
    <div className="grid items-center gap-14 max-md:grid-cols-1 md:grid-cols-[.95fr_1.05fr]">
      <div>
        <Eyebrow className={heroHeadingFont.className}>{coverageSection.eyebrow}</Eyebrow>
        <h2
          className={`mb-4 text-balance leading-[1.08] font-extrabold -tracking-[.02em] ${heroHeadingFont.className}`}
          style={{
            fontSize: `clamp(30px, 3.4vw, ${HEADING_FONT_SIZE}px)`,
            color: COVERAGE_COLORS.headingColor,
          }}
        >
          {coverageSection.title}
        </h2>
        <p
          className={`mb-7 leading-[1.6] ${heroBodyFont.className}`}
          style={{ fontSize: `${INTRO_FONT_SIZE}px`, color: COVERAGE_COLORS.bodyColor }}
        >
          {coverageSection.body}
        </p>
        <div
          key={active}
          className={`border p-[26px] shadow-card ${radiusClasses.none}`}
          style={{
            backgroundColor: COVERAGE_COLORS.detailCardBg,
            borderColor: COVERAGE_COLORS.detailCardBorder,
          }}
        >
          <div className="mb-3 flex items-center gap-3">
            <span
              className={`grid size-11 place-items-center ${radiusClasses.lg2}`}
              style={{ backgroundColor: COVERAGE_COLORS.detailIconBg }}
            >
              <MapPin
                className="size-[22px]"
                style={{ color: COVERAGE_COLORS.detailIconColor }}
                strokeWidth={2}
                aria-hidden
              />
            </span>
            <h3
              className={`m-0 text-[23px] font-extrabold ${heroHeadingFont.className}`}
              style={{ color: COVERAGE_COLORS.detailTitleColor }}
            >
              {selName}
            </h3>
          </div>
          <p
            className={`mb-[18px] text-[15px] leading-[1.6] ${heroBodyFont.className}`}
            style={{ color: COVERAGE_COLORS.bodyColor }}
          >
            {coverageCopy(selName)}
          </p>
          <a
            href="#quote"
            className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-[.04em] uppercase no-underline transition hover:opacity-90 ${radiusClasses.md2} ${heroHeadingFont.className}`}
            style={{
              backgroundColor: COVERAGE_COLORS.ctaBg,
              color: COVERAGE_COLORS.ctaText,
            }}
          >
            Get a {selName} Estimate <ArrowRight size={15} strokeWidth={2.4} aria-hidden />
          </a>
        </div>
      </div>

      <div
        className={`border p-4 shadow-card sm:p-5 ${radiusClasses.md2}`}
        style={{
          backgroundColor: COVERAGE_COLORS.mapPanelBg,
          borderColor: COVERAGE_COLORS.mapPanelBorder,
        }}
      >
        <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="grid size-8 place-items-center rounded-full"
              style={{ backgroundColor: COVERAGE_COLORS.detailIconBg }}
            >
              <MapPin
                className="size-4"
                style={{ color: COVERAGE_COLORS.detailIconColor }}
                strokeWidth={2.4}
                aria-hidden
              />
            </span>
            <div>
              <p
                className={`m-0 text-sm font-bold tracking-[.06em] uppercase ${heroHeadingFont.className}`}
                style={{ color: COVERAGE_COLORS.headingColor }}
              >
                Service area
              </p>
              <p
                className={`m-0 truncate text-xs ${heroBodyFont.className}`}
                style={{ color: COVERAGE_COLORS.bodyColor }}
              >
                Nationwide moving coverage
              </p>
            </div>
          </div>
          <p
            className={`m-0 min-w-0 truncate text-right text-sm font-extrabold transition-opacity duration-150 ${heroHeadingFont.className}`}
            style={{ color: COVERAGE_COLORS.headingColor }}
            aria-live="polite"
          >
            {previewName}
            <span className="ml-1.5 font-bold" style={{ color: COVERAGE_COLORS.bodyColor }}>
              {previewAbbr}
            </span>
          </p>
        </div>

        <div
          className={`relative isolate aspect-[16/10] min-h-[220px] overflow-hidden border p-3 sm:p-5 ${radiusClasses.none}`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(2, 71, 153, 0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(2, 71, 153, 0.055) 1px, transparent 1px),
              ${COVERAGE_COLORS.mapInnerBg}
            `,
            backgroundPosition: "center",
            backgroundSize: "24px 24px, 24px 24px, 100% 100%",
            borderColor: COVERAGE_COLORS.detailCardBorder,
          }}
        >
          <div
            className="pointer-events-none absolute top-0 right-0 size-40 -translate-y-1/2 translate-x-1/3 rounded-full blur-2xl"
            style={{ backgroundColor: "rgba(255, 206, 69, 0.3)" }}
            aria-hidden
          />
          <div
            className={`absolute z-20 bottom-3 left-3 border px-2.5 py-1 text-[10px] font-bold tracking-[.08em] uppercase sm:bottom-4 sm:left-4 ${heroHeadingFont.className}`}
            style={{
              backgroundColor: COVERAGE_COLORS.mapPanelBg,
              borderColor: COVERAGE_COLORS.mapPanelBorder,
              color: COVERAGE_COLORS.headingColor,
            }}
          >
            All 50 states
          </div>
          <svg
            ref={svgRef}
            viewBox={usa.viewBox}
            preserveAspectRatio="xMidYMid meet"
            className="relative z-10 mx-auto block size-full"
            role="img"
            aria-label="Interactive map of United States coverage. Click a state to view details."
          >
            <defs>
              <filter id="coverage-state-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="2.5"
                  floodColor="#024799"
                  floodOpacity="0.28"
                />
              </filter>
            </defs>

            {statePaths.map(({ abbr, name, path }) => {
              const styles = getStateStyles(abbr, active, hovered);
              const isActive = active === abbr;
              const label = labelPositions[abbr];
              const isLabelVisible = shouldShowLabel(abbr, label, active, hovered);

              return (
                <g
                  key={abbr}
                  className="coverage-state-group cursor-pointer focus:outline-none"
                  role="button"
                  tabIndex={0}
                  aria-label={name}
                  aria-pressed={isActive}
                  onMouseEnter={() => setHovered(abbr)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(abbr)}
                  onBlur={() => setHovered(null)}
                  onClick={() => selectState(abbr)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectState(abbr);
                    }
                  }}
                >
                  <title>{name}</title>
                  <path
                    id={`coverage-state-${abbr}`}
                    d={path}
                    fill={styles.fill}
                    stroke={styles.stroke}
                    strokeWidth={styles.strokeWidth}
                    filter={styles.filter}
                    className="transition-[fill,stroke,stroke-width,filter] duration-150 ease-out focus:outline-none"
                  />
                  {label && isLabelVisible ? (
                    <text
                      x={label.x}
                      y={label.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      pointerEvents="none"
                      fill={getLabelFill(abbr, active, hovered)}
                      fontSize={label.fontSize}
                      fontWeight={isActive ? 800 : 700}
                      className={`select-none tracking-[.04em] transition-[fill] duration-150 ease-out ${heroHeadingFont.className}`}
                      aria-hidden
                    >
                      {abbr}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
        </div>

        <p
          className={`mt-3.5 mb-0 text-center text-[13px] ${heroBodyFont.className}`}
          style={{ color: COVERAGE_COLORS.bodyColor }}
        >
          Select your state to see local moving details
        </p>
      </div>
    </div>
  );
}
