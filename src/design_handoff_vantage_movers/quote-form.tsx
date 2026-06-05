"use client";

import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { Btn, Icon } from "./components";
import {
  MOVE_SIZES,
  emptyQuote,
  quoteDetailsSchema,
  quoteLocationSchema,
  type QuoteFormValues,
  type QuoteResult,
} from "./quote-form.schema";

type Step = 0 | 1 | 2;
type FieldErrors = Partial<Record<keyof QuoteFormValues, string>>;

function StepDots({ step }: { step: Step }) {
  const labels = ["Location", "Details", "Quote"];

  return (
    <div className="qf__steps">
      {labels.map((label, index) => (
        <span className="qf__step-wrap" key={label}>
          <span className={`qf__step${index === step ? " is-active" : ""}${index < step ? " is-done" : ""}`}>
            <span className="qf__step-num">
              {index < step ? <Icon name="check" style={{ width: 15, height: 15 }} /> : index + 1}
            </span>
            <span className="qf__step-label">{label}</span>
          </span>
          {index < 2 ? <span className={`qf__step-bar${index < step ? " is-done" : ""}`} /> : null}
        </span>
      ))}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className={`qf__field${error ? " has-error" : ""}`}>
      <span className="qf__label">{label}</span>
      {children}
      {error ? <span className="qf__err">{error}</span> : null}
    </label>
  );
}

function zodErrorsToFields(error: { issues: Array<{ path: PropertyKey[]; message: string }> }): FieldErrors {
  return error.issues.reduce<FieldErrors>((acc, issue) => {
    const field = issue.path[0] as keyof QuoteFormValues | undefined;
    if (field && !acc[field]) {
      acc[field] = issue.message;
    }
    return acc;
  }, {});
}

function estimateQuote(data: QuoteFormValues): QuoteResult {
  const seed = data.pickup.length * 7 + data.dest.length * 13 + data.size.length * 5;
  const baseBySize: Record<QuoteFormValues["size"], number> = {
    "Studio / 1 Bed": 1200,
    "2 Bedroom": 1850,
    "3 Bedroom": 2650,
    "4+ Bedroom": 3600,
    Office: 3100,
  };
  const miles = 380 + (seed % 9) * 110;
  const low = Math.round((baseBySize[data.size] + miles * 1.6) / 50) * 50;
  const high = Math.round((low * 1.34) / 50) * 50;

  return { low, high, miles };
}

export function QuoteForm({ phone = "(800) 555-0199", compact }: { phone?: string; compact?: boolean }) {
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<QuoteFormValues>(emptyQuote);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const setField =
    (field: keyof QuoteFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setData((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };

  function handleEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      void next();
    }
  }

  async function next() {
    if (step === 0) {
      const parsed = quoteLocationSchema.safeParse(data);
      if (!parsed.success) {
        setErrors(zodErrorsToFields(parsed.error));
        return;
      }
      setStep(1);
      return;
    }

    if (step === 1) {
      const parsed = quoteDetailsSchema.safeParse(data);
      if (!parsed.success) {
        setErrors(zodErrorsToFields(parsed.error));
        return;
      }

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 700));
      setResult(estimateQuote(data));
      setLoading(false);
      setStep(2);
    }
  }

  function reset() {
    setStep(0);
    setData(emptyQuote);
    setResult(null);
    setErrors({});
  }

  return (
    <div className={`qf${compact ? " qf--compact" : ""}`}>
      <div className="qf__head">
        <h3>Get Instant Quote</h3>
        <p>Receive your free moving quote in seconds</p>
      </div>
      <StepDots step={step} />

      <div className="qf__body">
        {step === 0 ? (
          <div className="qf__pane">
            <Field label="Pickup location" error={errors.pickup}>
              <div className="qf__input-ico">
                <Icon name="pin" />
                <input
                  value={data.pickup}
                  onChange={setField("pickup")}
                  placeholder="City or ZIP Code"
                  onKeyDown={handleEnter}
                />
              </div>
            </Field>
            <Field label="Destination" error={errors.dest}>
              <div className="qf__input-ico">
                <Icon name="pin" />
                <input
                  value={data.dest}
                  onChange={setField("dest")}
                  placeholder="City or ZIP Code"
                  onKeyDown={handleEnter}
                />
              </div>
            </Field>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="qf__pane">
            <div className="qf__row">
              <Field label="Move date" error={errors.date}>
                <input type="date" min={today} value={data.date} onChange={setField("date")} />
              </Field>
              <Field label="Move size" error={errors.size}>
                <select value={data.size} onChange={setField("size")}>
                  {MOVE_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Full name" error={errors.name}>
              <input value={data.name} onChange={setField("name")} placeholder="Jane Doe" />
            </Field>
            <Field label="Email address" error={errors.email}>
              <input
                type="email"
                value={data.email}
                onChange={setField("email")}
                placeholder="jane@email.com"
                onKeyDown={handleEnter}
              />
            </Field>
          </div>
        ) : null}

        {step === 2 && result ? (
          <div className="qf__pane qf__result">
            <div className="qf__result-badge">
              <Icon name="check" style={{ width: 20, height: 20 }} />
            </div>
            <p className="qf__result-cap">Estimated cost for your move</p>
            <div className="qf__price">
              ${result.low.toLocaleString()}
              <span>-${result.high.toLocaleString()}</span>
            </div>
            <div className="qf__result-meta">
              <span>
                <Icon name="pin" style={{ width: 15, height: 15 }} /> {data.pickup} to {data.dest}
              </span>
              <span>
                <Icon name="truck" style={{ width: 15, height: 15 }} /> ~{result.miles} mi · {data.size}
              </span>
            </div>
            <p className="qf__result-note">
              A moving specialist will call {data.name.split(" ")[0]} shortly to confirm your exact rate and
              book your date.
            </p>
            <button className="qf__reset" onClick={reset} type="button">
              Start a new quote
            </button>
          </div>
        ) : null}
      </div>

      {step < 2 ? (
        <div className="qf__foot">
          {step > 0 ? (
            <button className="qf__back" onClick={() => setStep(0)} disabled={loading} type="button">
              Back
            </button>
          ) : null}
          <Btn block onClick={() => void next()} disabled={loading}>
            {loading ? "Calculating..." : step === 1 ? "Get Free Quote" : "Continue"}
            {!loading ? <Icon name="arrowRight" style={{ width: 17, height: 17 }} /> : null}
          </Btn>
        </div>
      ) : null}

      <a href={`tel:${phone.replace(/[^0-9]/g, "")}`} className="qf__phone">
        <Icon name="phone" style={{ width: 16, height: 16 }} /> {phone}
      </a>

      <p className="qf__legal">
        By submitting this form, you acknowledge that Vantage Movers may contact you with updates, offers, and
        information relevant to your moving process. You also agree to our privacy policy.
      </p>
    </div>
  );
}

