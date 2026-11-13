"use client";
import { CmsText, CmsElement } from "@/components/cms/Content";


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
      fill: `var(--coverage-state-active, ${COVERAGE_COLORS.mapActiveFill})`,
      stroke: `var(--coverage-state-active-line, ${COVERAGE_COLORS.mapActiveStroke})`,
      strokeWidth: 1.6,
      filter: "url(#coverage-state-shadow)",
    };
  }

  if (isHovered) {
    return {
      fill: `var(--coverage-state-hover, ${COVERAGE_COLORS.mapHoverFill})`,
      stroke: `var(--coverage-state-hover-line, ${COVERAGE_COLORS.mapHoverStroke})`,
      strokeWidth: 1.2,
      filter: undefined,
    };
  }

  return {
    fill: `var(--coverage-state, ${COVERAGE_COLORS.mapDefaultFill})`,
    stroke: `var(--coverage-state-line, ${COVERAGE_COLORS.mapDefaultStroke})`,
    strokeWidth: 0.85,
    filter: undefined,
  };
}

function getLabelFill(abbr: string, active: string, hovered: string | null) {
  const isActive = active === abbr;
  const isHovered = hovered === abbr && !isActive;

  if (isActive) return `var(--coverage-active-label, ${COVERAGE_COLORS.mapActiveLabel})`;
  if (isHovered) return `var(--coverage-hover-label, ${COVERAGE_COLORS.mapHoverLabel})`;
  return `var(--coverage-label, ${COVERAGE_COLORS.mapDefaultLabel})`;
}

export function CoverageMap({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
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
    <div className="coverage-layout grid items-center gap-14 max-md:grid-cols-1 md:grid-cols-[.95fr_1.05fr]">
      <div className="coverage-copy">
        <div className="coverage-intro">
          <Eyebrow className={`coverage-eyebrow ${heroHeadingFont.className}`}><CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{es ? "Planifique su destino" : coverageSection.eyebrow}</CmsText></Eyebrow>
          <h2
            className={`mb-4 text-balance leading-[1.08] font-extrabold -tracking-[.02em] ${heroHeadingFont.className}`}
            style={{
              fontSize: `clamp(30px, 3.4vw, ${HEADING_FONT_SIZE}px)`,
              color: `var(--coverage-heading, ${COVERAGE_COLORS.headingColor})`,
            }}
          >
            <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{es ? "Hablemos de su ruta" : coverageSection.title}</CmsText>
          </h2>
          <p
            className={`mb-7 leading-[1.6] ${heroBodyFont.className}`}
            style={{ fontSize: `${INTRO_FONT_SIZE}px`, color: `var(--coverage-body, ${COVERAGE_COLORS.bodyColor})` }}
          >
            <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{es ? "Seleccione un estado para preparar las preguntas sobre su mudanza. Confirme la disponibilidad y las condiciones de su ruta con un coordinador." : coverageSection.body}</CmsText>
          </p>
        </div>
        <div
          key={active}
          className={`coverage-detail border p-[26px] shadow-card ${radiusClasses.none}`}
          style={{
            backgroundColor: `var(--coverage-detail-bg, ${COVERAGE_COLORS.detailCardBg})`,
            borderColor: `var(--coverage-detail-line, ${COVERAGE_COLORS.detailCardBorder})`,
          }}
        >
          <div className="mb-3 flex items-center gap-3">
            <span
              className={`grid size-11 place-items-center ${radiusClasses.lg2}`}
              style={{ backgroundColor: `var(--coverage-detail-icon-bg, ${COVERAGE_COLORS.detailIconBg})` }}
            >
              <MapPin
                className="size-[22px]"
                style={{ color: `var(--coverage-detail-icon, ${COVERAGE_COLORS.detailIconColor})` }}
                strokeWidth={2}
                aria-hidden
              />
            </span>
            <h3
              className={`m-0 text-[23px] font-extrabold ${heroHeadingFont.className}`}
              style={{ color: `var(--coverage-detail-title, ${COVERAGE_COLORS.detailTitleColor})` }}
            >
              <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{selName}</CmsText>
            </h3>
          </div>
          <p
            className={`mb-[18px] text-[15px] leading-[1.6] ${heroBodyFont.className}`}
            style={{ color: `var(--coverage-detail-text, ${COVERAGE_COLORS.bodyColor})` }}
          >
            <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{es ? `¿Su destino es ${selName}? Confirme el acceso, las fechas y los servicios para su ruta. El mapa no confirma cobertura ni una oficina local.` : coverageCopy(selName)}</CmsText>
          </p>
          <CmsElement element="a" scope="components/interactive/CoverageMap.tsx|lib/content.ts"
            href="#quote"
            className={`coverage-action inline-flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-[.04em] uppercase no-underline transition hover:opacity-90 ${radiusClasses.md2} ${heroHeadingFont.className}`}
            style={{
              backgroundColor: `var(--coverage-action-bg, ${COVERAGE_COLORS.ctaBg})`,
              color: COVERAGE_COLORS.ctaText,
            }}
          >
            <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{es ? "Consulte su ruta" : "Discuss Your Route"}</CmsText> <ArrowRight size={15} strokeWidth={2.4} aria-hidden />
          </CmsElement>
        </div>
      </div>

      <div
        className={`coverage-map-panel border p-5 shadow-card sm:p-6 ${radiusClasses.md2}`}
        style={{
          backgroundColor: `var(--coverage-panel-bg, ${COVERAGE_COLORS.mapPanelBg})`,
          borderColor: `var(--coverage-panel-line, ${COVERAGE_COLORS.mapPanelBorder})`,
        }}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <p
            className={`m-0 text-sm font-bold tracking-[.06em] uppercase ${heroHeadingFont.className}`}
            style={{ color: `var(--coverage-heading, ${COVERAGE_COLORS.headingColor})` }}
          >
            <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{es ? "Mapa de destinos" : "Destination Map"}</CmsText>
          </p>
          <p
            className={`m-0 truncate text-right text-sm font-extrabold transition-opacity duration-150 ${heroHeadingFont.className}`}
            style={{ color: `var(--coverage-heading, ${COVERAGE_COLORS.headingColor})` }}
            aria-live="polite"
          >
            <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{previewName}</CmsText>
            <span className="ml-1.5 font-bold" style={{ color: `var(--coverage-body, ${COVERAGE_COLORS.bodyColor})` }}>
              <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{previewAbbr}</CmsText>
            </span>
          </p>
        </div>

        <div
          className={`relative overflow-hidden border p-3 sm:p-4 ${radiusClasses.none}`}
          style={{
            background: `var(--coverage-map-bg, ${COVERAGE_COLORS.mapInnerBg})`,
            borderColor: `var(--coverage-panel-line, ${COVERAGE_COLORS.detailCardBorder})`,
          }}
        >
          <CmsElement element="svg" scope="components/interactive/CoverageMap.tsx|lib/content.ts"
            ref={svgRef}
            viewBox={usa.viewBox}
            className="mx-auto block h-auto w-full max-h-[min(52vw,420px)]"
            role="img"
            aria-label="United States destination planning map. Select a state for planning questions, not confirmed service availability."
          >
            <defs>
              <filter id="coverage-state-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="2.5"
                  floodColor="var(--coverage-shadow, #024799)"
                  floodOpacity="0.28"
                />
              </filter>
            </defs>

            <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{statePaths.map(({ abbr, name, path }) => {
              const styles = getStateStyles(abbr, active, hovered);
              const isActive = active === abbr;
              const label = labelPositions[abbr];

              return (
                <CmsElement element="g" scope="components/interactive/CoverageMap.tsx|lib/content.ts"
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
                  onKeyDown={(e: React.KeyboardEvent<SVGPathElement>) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectState(abbr);
                    }
                  }}
                >
                  <path
                    id={`coverage-state-${abbr}`}
                    d={path}
                    fill={styles.fill}
                    stroke={styles.stroke}
                    strokeWidth={styles.strokeWidth}
                    filter={styles.filter}
                    className="transition-[fill,stroke,stroke-width,filter] duration-150 ease-out focus:outline-none"
                  />
                  <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{label ? (
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
                      <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{abbr}</CmsText>
                    </text>
                  ) : null}</CmsText>
                </CmsElement>
              );
            })}</CmsText>
          </CmsElement>
        </div>

        <p
          className={`mt-3.5 mb-0 text-center text-[13px] ${heroBodyFont.className}`}
          style={{ color: `var(--coverage-body, ${COVERAGE_COLORS.bodyColor})` }}
        >
          <CmsText scope="components/interactive/CoverageMap.tsx|lib/content.ts">{es ? "Seleccione un estado para explorar" : "Hover to preview · Click to select your state"}</CmsText>
        </p>
      </div>
    </div>
  );
}
