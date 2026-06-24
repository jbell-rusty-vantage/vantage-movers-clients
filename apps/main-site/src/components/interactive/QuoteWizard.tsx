"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { moveSizes, serviceTypes } from "@/lib/content";

const STEPS = [
  { n: 1, label: "Location" },
  { n: 2, label: "Details" },
  { n: 3, label: "Contact" },
] as const;

const labelCls =
  "mb-[7px] block font-display text-[13.5px] font-semibold text-brand-blue";
const inputCls =
  "mb-4 w-full rounded-lg2 border-[1.5px] border-cream-border bg-cream px-3.5 py-[13px] text-[15px] text-ink outline-none transition focus:border-[#2E86DE] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,134,222,.16)]";
const yellowBtn =
  "cursor-pointer rounded-lg2 border-none bg-brand-yellow font-display text-base font-bold tracking-[.04em] text-black uppercase shadow-[0_8px_22px_rgba(255,192,46,.3)] transition hover:-translate-y-0.5";
const ghostBtn =
  "cursor-pointer rounded-lg2 border-[1.5px] border-cream-border bg-white font-display text-[15px] font-bold tracking-[.04em] text-brand-blue uppercase";

export function QuoteWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep((s) => Math.min(3, s + 1) as 1 | 2 | 3);
  const back = () => setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3);

  return (
    <div
      id="quote"
      className="rounded-panel bg-white px-[30px] pt-[30px] pb-[26px] shadow-form-card"
    >
      <div className="mb-2 text-center">
        <h2 className="mb-1.5 font-display text-[25px] font-extrabold -tracking-[.02em] text-brand-blue">
          Get an Instant Estimate
        </h2>
        <p className="m-0 text-[14.5px] text-[#64748B]">
          Free, no-obligation quote in three quick steps.
        </p>
      </div>

      <div className="my-[22px] mb-6 flex items-center justify-center">
        {STEPS.map((s, i) => {
          const current = step === s.n;
          const done = step >= s.n;
          const dot = current
            ? "bg-brand-yellow text-black shadow-[0_4px_12px_rgba(255,192,46,.4)]"
            : done
              ? "bg-brand-blue-bright text-white"
              : "bg-cream-border-2 text-[#94a3b8]";
          return (
            <div key={s.n} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`grid size-[34px] place-items-center rounded-full font-display text-[15px] font-extrabold ${dot}`}
                >
                  {s.n}
                </span>
                <span className="text-xs font-semibold text-[#64748B]">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="mx-1.5 mb-[18px] h-0.5 w-[46px] bg-cream-border" />
              )}
            </div>
          );
        })}
      </div>

      {submitted ? (
        <div className="px-2 pt-6 pb-3.5 text-center">
          <span className="mx-auto mb-4 grid size-[60px] place-items-center rounded-full bg-success-bg">
            <Check className="text-success" size={30} strokeWidth={2.5} />
          </span>
          <h3 className="mb-2 font-display text-[21px] font-extrabold text-brand-blue">
            Request Received
          </h3>
          <p className="mb-[18px] text-[14.5px] leading-[1.55] text-[#64748B]">
            A Vantage moving coordinator will reach out shortly to help plan your
            long-distance move.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
            className="cursor-pointer rounded-lg2 border-[1.5px] border-cream-border bg-cream px-5 py-[11px] font-display text-sm font-bold tracking-[.04em] text-brand-blue uppercase"
          >
            Start Over
          </button>
        </div>
      ) : (
        <>
          {step === 1 && (
            <div>
              <label className={labelCls}>Moving From</label>
              <input className={inputCls} placeholder="Pickup ZIP or City, State" />
              <label className={labelCls}>Moving To</label>
              <input className={inputCls} placeholder="Destination ZIP or City, State" />
              <label className={labelCls}>Estimated Move Date</label>
              <input className={`${inputCls} text-[#64748B]`} type="date" />
              <button type="button" onClick={next} className={`${yellowBtn} w-full py-[15px]`}>
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className={labelCls}>Move Size</label>
              <select className={inputCls} defaultValue={moveSizes[0]}>
                {moveSizes.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <label className={labelCls}>Service Type</label>
              <select className={inputCls} defaultValue={serviceTypes[0]}>
                {serviceTypes.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <label className={labelCls}>
                Notes <span className="font-normal text-[#94a3b8]">(optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Tell us about special items, stairs, storage needs…"
                className={`${inputCls} resize-none`}
              />
              <div className="flex gap-3">
                <button type="button" onClick={back} className={`${ghostBtn} px-5 py-3.5`}>
                  Back
                </button>
                <button type="button" onClick={next} className={`${yellowBtn} flex-1 py-3.5`}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className={labelCls}>Full Name</label>
              <input className={inputCls} placeholder="Your name" />
              <label className={labelCls}>Email</label>
              <input className={inputCls} type="email" placeholder="you@email.com" />
              <label className={labelCls}>Phone</label>
              <input className={`${inputCls} mb-3.5`} type="tel" placeholder="(000) 000-0000" />
              <p className="mb-4 text-[11.5px] leading-[1.5] text-[#94a3b8]">
                By submitting, I consent to receive calls/SMS from Vantage Movers about my
                moving quote. Msg &amp; data rates may apply. Reply STOP to opt out. See our{" "}
                <a href="#" className="text-brand-blue-bright">
                  Privacy Policy
                </a>{" "}
                &amp;{" "}
                <a href="#" className="text-brand-blue-bright">
                  Terms
                </a>
                .
              </p>
              <div className="flex gap-3">
                <button type="button" onClick={back} className={`${ghostBtn} px-5 py-3.5`}>
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="flex-1 cursor-pointer rounded-lg2 border-none bg-brand-blue-bright py-3.5 font-display text-base font-bold tracking-[.04em] text-white uppercase shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-blue"
                >
                  Get Free Quote
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <p className="mt-4 flex items-center justify-center gap-[7px] text-center text-[12.5px] text-[#94a3b8]">
        <Check className="text-success" size={13} strokeWidth={2.5} aria-hidden />
        Free estimate · No obligation · Under a minute
      </p>
    </div>
  );
}
