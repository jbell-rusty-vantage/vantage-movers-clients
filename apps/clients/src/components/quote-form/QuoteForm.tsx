"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import {
  useForm,
  type FieldError,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@vantage/utils";
import { telHref } from "@/lib/format";
import { quoteFormAnalytics, trackEvent, trackZipNotRecognized } from "@/lib/analytics";
import { site } from "@/content/site";
import {
  MOVE_SIZES,
  STEP_FIELDS,
  emptyQuote,
  quoteFormSchema,
  type QuoteFormInput,
  type QuoteFormValues,
  type QuoteResult,
} from "@/schemas/quote-form.schema";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { MoveDatePicker } from "@vantage/ui";
import { usePromo } from "@/components/promo/PromoProvider";
import { StepIndicator } from "./StepIndicator";

type LocationFieldName = "pickup" | "dest";
type StepName = "locations" | "move_details" | "confirmation";

const STEP_ANALYTICS: Record<number, { step_name: StepName; step_number: number }> = {
  0: { step_name: "locations", step_number: 1 },
  1: { step_name: "move_details", step_number: 2 },
  2: { step_name: "confirmation", step_number: 3 },
};

interface ZipSuggestion {
  placeId: string;
  text: string;
  postalCode: string;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("qf__field", error && "has-error")}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <span className="qf__err">{error}</span>}
    </div>
  );
}

function createSessionToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function ZipCompletionField({
  id,
  label,
  fieldName,
  placeholder,
  displayValue,
  onDisplayChange,
  register,
  setValue,
  error,
}: {
  id: string;
  label: string;
  fieldName: LocationFieldName;
  placeholder: string;
  displayValue: string;
  onDisplayChange: (value: string) => void;
  register: UseFormRegister<QuoteFormInput>;
  setValue: UseFormSetValue<QuoteFormInput>;
  error?: FieldError;
}) {
  const [resolvedRegion, setResolvedRegion] = useState("");
  const [lookupWarning, setLookupWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const lastUnrecognizedZip = useRef("");
  const [sessionToken] = useState(createSessionToken);

  useEffect(() => {
    const zip = displayValue.replace(/\D/g, "").slice(0, 5);

    if (zip.length !== 5) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setLookupError("");
      try {
        const res = await fetch(
          `/api/places/autocomplete?input=${encodeURIComponent(zip)}&sessionToken=${encodeURIComponent(sessionToken)}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Unable to resolve ZIP");
        const data = (await res.json()) as { suggestions?: ZipSuggestion[] };
        const match = data.suggestions?.find((suggestion) => suggestion.postalCode === zip);

        if (!match) {
          setValue(fieldName, zip, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
          setResolvedRegion("");
          setLookupWarning(
            "We couldn't verify this ZIP automatically, but you can still continue.",
          );
          if (lastUnrecognizedZip.current !== zip) {
            lastUnrecognizedZip.current = zip;
            trackZipNotRecognized({
              field_name: fieldName,
              zip,
              suggestion_count: data.suggestions?.length ?? 0,
            });
          }
          return;
        }

        lastUnrecognizedZip.current = "";
        setValue(fieldName, match.postalCode, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
        setResolvedRegion(match.text);
        setLookupWarning("");
      } catch {
        if (!controller.signal.aborted) {
          setValue(fieldName, zip, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
          setResolvedRegion("");
          setLookupError("ZIP lookup is unavailable. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [displayValue, fieldName, sessionToken, setValue]);

  return (
    <Field id={id} label={label} error={error?.message || lookupError}>
      <input type="hidden" {...register(fieldName)} />
      <div className="qf__zip">
        <div className="qf__input-ico">
          <Icon name="pin" />
          <Input
            id={id}
            placeholder={placeholder}
            value={displayValue}
            autoComplete="postal-code"
            inputMode="numeric"
            maxLength={5}
            onChange={(e) => {
              const nextZip = e.target.value.replace(/\D/g, "").slice(0, 5);
              onDisplayChange(nextZip);
              setResolvedRegion("");
              setLookupWarning("");
              setLookupError("");
              setLoading(false);
              setValue(fieldName, nextZip, { shouldDirty: true, shouldValidate: false });
            }}
          />
        </div>
        {loading && <span className="qf__zip-status">Resolving ZIP...</span>}
        {!loading && resolvedRegion && (
          <span className="qf__zip-status qf__zip-status--ok">{resolvedRegion}</span>
        )}
        {!loading && lookupWarning && (
          <span className="qf__zip-status qf__zip-status--warning">{lookupWarning}</span>
        )}
      </div>
    </Field>
  );
}

export interface QuoteFormProps {
  compact?: boolean;
  /** Lead source company sent to the API (from the landing-page URL segment). */
  sourceCompany?: string;
  /** Origin site recorded with the lead. */
  sourceCompanySite?: string;
  /** Source-specific public phone number for call CTAs. */
  phone?: string;
}

export function QuoteForm({ compact, sourceCompany, sourceCompanySite, phone }: QuoteFormProps) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pickupZip, setPickupZip] = useState("");
  const [destZip, setDestZip] = useState("");

  // Lead-source ref number passed by partner companies (?ref_no=...).
  const searchParams = useSearchParams();
  const refNo = searchParams.get("ref_no")?.trim() || undefined;
  const { setPromoSuppressed } = usePromo();
  const formStarted = useRef(false);
  const phoneNumber = phone ?? site.phone;

  const {
    register,
    trigger,
    getValues,
    getFieldState,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuoteFormInput, unknown, QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: emptyQuote,
    mode: "onTouched",
  });

  useEffect(() => {
    const stepMeta = STEP_ANALYTICS[step];
    trackEvent("form_step_viewed", {
      ...quoteFormAnalytics,
      ...stepMeta,
    });
  }, [step]);

  function markFormStarted() {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent("form_started", quoteFormAnalytics);
  }

  function trackValidationErrors(stepNumber: number) {
    const stepMeta = STEP_ANALYTICS[stepNumber];
    const values = getValues();
    for (const fieldName of STEP_FIELDS[stepNumber]) {
      const fieldError = getFieldState(fieldName).error;
      if (!fieldError) continue;
      trackEvent("form_validation_error", {
        ...quoteFormAnalytics,
        ...stepMeta,
        field_name: fieldName,
        error_type: values[fieldName] ? "invalid" : "required",
      });
    }
  }

  function safeQuoteMetadata() {
    const values = getValues();
    return {
      ...quoteFormAnalytics,
      move_size: values.size || "unknown",
    };
  }

  async function submitQuote() {
    setPromoSuppressed(true);
    setLoading(true);
    setSubmitError("");
    trackEvent("form_submit_attempted", safeQuoteMetadata());
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...getValues(),
          source_company: sourceCompany,
          source_company_site: sourceCompanySite,
          ref_no: refNo,
          sms_consent: getValues("smsConsent"),
        }),
      });
      if (!res.ok) throw new Error("Quote request failed");
      const data: QuoteResult = await res.json();
      setResult(data);
      trackEvent(data.leadCaptured ? "form_submit_success" : "form_submit_failed", {
        ...safeQuoteMetadata(),
        error_type: data.leadCaptured ? null : "lead_capture_failed",
      });
      trackEvent("quote_estimate_viewed", safeQuoteMetadata());
      setStep(2);
    } catch {
      trackEvent("form_submit_failed", safeQuoteMetadata());
      setSubmitError("Something went wrong. Please try again or give us a call.");
      setPromoSuppressed(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) {
      trackValidationErrors(step);
      return;
    }
    trackEvent("form_step_completed", {
      ...quoteFormAnalytics,
      ...STEP_ANALYTICS[step],
    });
    if (step === 1) {
      await submitQuote();
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleReset() {
    reset(emptyQuote);
    setPickupZip("");
    setDestZip("");
    setResult(null);
    setSubmitError("");
    setPromoSuppressed(false);
    setStep(0);
  }

  return (
    <form
      className={cn("qf", compact && "qf--compact")}
      onSubmit={handleNext}
      onFocusCapture={markFormStarted}
      onChangeCapture={markFormStarted}
      noValidate
    >
      <div className="qf__head">
        <h3>Request Moving Quote</h3>
      </div>

      <StepIndicator step={step} />

      <div className="qf__body">
        {step === 0 && (
          <div className="qf__pane">
            <ZipCompletionField
              id="pickup-zip"
              label="Pickup Zip"
              fieldName="pickup"
              placeholder="Enter pickup ZIP"
              displayValue={pickupZip}
              onDisplayChange={setPickupZip}
              register={register}
              setValue={setValue}
              error={errors.pickup}
            />
            <ZipCompletionField
              id="dest-zip"
              label="Destination Zip"
              fieldName="dest"
              placeholder="Enter destination ZIP"
              displayValue={destZip}
              onDisplayChange={setDestZip}
              register={register}
              setValue={setValue}
              error={errors.dest}
            />
          </div>
        )}

        {step === 1 && (
          <div className="qf__pane">
            <div className="qf__row">
              <Field id="date" label="Move Date" error={errors.date?.message}>
                <MoveDatePicker
                  id="date"
                  variant="clients"
                  value={watch("date")}
                  hasError={!!errors.date}
                  placeholder="Select move date"
                  onOpen={() =>
                    trackEvent("calendar_or_date_picker_opened", {
                      ...quoteFormAnalytics,
                      ...STEP_ANALYTICS[1],
                    })
                  }
                  onChange={(nextDate) =>
                    setValue("date", nextDate, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }
                  onBlur={() => void trigger("date")}
                />
              </Field>
              <Field id="size" label="Move Size" error={errors.size?.message}>
                <Select
                  id="size"
                  {...register("size", {
                    onChange: (event) =>
                      trackEvent("lead_quality_signal_selected", {
                        ...quoteFormAnalytics,
                        ...STEP_ANALYTICS[1],
                        move_size: event.target.value,
                      }),
                  })}
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {MOVE_SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <Field id="name" label="Full name" error={errors.name?.message}>
              <Input id="name" placeholder="Jane Doe" {...register("name")} />
            </Field>
            <Field id="phone" label="Phone number" error={errors.phone?.message}>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="(555) 123-4567"
                {...register("phone")}
              />
            </Field>
            <Field id="email" label="Email address" error={errors.email?.message}>
              <Input id="email" type="email" placeholder="jane@email.com" {...register("email")} />
            </Field>
            <label className="qf__sms-consent" htmlFor="sms-consent">
              <input id="sms-consent" type="checkbox" {...register("smsConsent")} />
              <span className="qf__sms-consent-label">
                I agree to receive SMS messages from {site.name} about my moving quote request,
                scheduling updates, appointment reminders, and customer support. Up to 4 messages
                per month. Message and data rates may apply. Reply STOP to opt out. Reply HELP for
                help.{" "}
                <a
                  href="/sms-privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("sms_privacy_clicked", { link_location: "quote_form" })}
                >
                  SMS Privacy Policy
                </a>
                .{" "}
                <a
                  href="/sms-terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("sms_terms_clicked", { link_location: "quote_form" })}
                >
                  SMS Terms
                </a>
                . Consent is not required to submit a quote request.
              </span>
            </label>
          </div>
        )}

        {step === 2 && result && (
          <div className="qf__pane qf__result">
            <div className="qf__result-badge">
              <Icon name="check" width={20} height={20} />
            </div>
            <p className="qf__result-cap">Thank you for submitting your request</p>
            <div className="qf__result-meta">
              <span>
                <Icon name="pin" width={15} height={15} /> {getValues("pickup")} →{" "}
                {getValues("dest")}
              </span>
              <span>
                <Icon name="truck" width={15} height={15} /> ~{result.miles} mi · {getValues("size")}
              </span>
            </div>
            <div className="qf__result-note">
              <p>A Moving coordinator will reach out to you shortly</p>
              <p className="qf__result-call">
                To speak to a Coordinator Immediately Call{" "}
                <a
                  href={telHref(phoneNumber)}
                  className="qf__result-phone"
                  onClick={() => trackEvent("phone_clicked", { link_location: "quote_result" })}
                >
                  {phoneNumber}
                </a>
              </p>
            </div>
            <button type="button" className="qf__reset" onClick={handleReset}>
              ↺ Start a new quote
            </button>
          </div>
        )}
      </div>

      {step < 2 && (
        <>
          {submitError && (
            <p className="qf__err" style={{ textAlign: "center", marginBottom: 8 }}>
              {submitError}
            </p>
          )}
          <div className="qf__foot">
            {step > 0 && (
              <button
                type="button"
                className="qf__back"
                onClick={() => setStep((s) => s - 1)}
                disabled={loading}
              >
                Previous
              </button>
            )}
            <Button type="submit" block disabled={loading} arrow={!loading}>
              {loading ? "Calculating…" : step === 1 ? "GET QUOTE" : "Next"}
            </Button>
          </div>
        </>
      )}

      <p className="qf__help">
        Need help?{" "}
        <a
          href={telHref(phoneNumber)}
          onClick={() => trackEvent("phone_clicked", { link_location: "quote_form_help" })}
        >
          Call Now
        </a>
      </p>
      <a
        href={telHref(phoneNumber)}
        className="qf__phone"
        onClick={() => trackEvent("phone_clicked", { link_location: "quote_form" })}
      >
        <Icon name="phone" width={16} height={16} fill="currentColor" stroke="none" /> {phoneNumber}
      </a>

      <p className="qf__legal">
        By submitting this form, you acknowledge that Vantage Movers may contact you with updates,
        offers, and information relevant to your moving process.
      </p>
    </form>
  );
}
