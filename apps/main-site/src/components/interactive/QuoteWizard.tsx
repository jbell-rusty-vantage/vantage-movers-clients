"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import {
  useForm,
  useWatch,
  type FieldError,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, MapPin } from "lucide-react";
import { MoveDatePicker } from "@vantage/ui";
import { business, quoteSection } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { radiusClasses } from "@/lib/playground/layout-playground";
import { telHref } from "@/lib/format";
import { MAIN_SITE } from "@/content/partners";
import type { QuoteWizardCopy, ServiceId, ServiceLocale } from "@/content/services/types";
import { quoteFormAnalytics, trackEvent, trackZipNotRecognized } from "@/lib/analytics";
import {
  MOVE_SIZES,
  STEP_FIELDS,
  emptyQuote,
  quoteFormSchema,
  type QuoteFormInput,
  type QuoteFormValues,
  type QuoteResult,
} from "@/schemas/quote-form.schema";

const STEPS = [
  { n: 1, label: "Moving Details" },
  { n: 2, label: "Contact Info" },
  { n: 3, label: "Confirmation" },
] as const;

const PANEL_STEPS = [
  { n: 1, label: "Your Move" },
  { n: 2, label: "Contact" },
  { n: 3, label: "Done" },
] as const;

const STEP_ANALYTICS = [
  { step_number: 1, step_name: "moving_details" },
  { step_number: 2, step_name: "contact_info" },
] as const;

export interface QuoteWizardProps {
  variant?: "hero" | "panel";
  formId?: string;
  className?: string;
  copy?: QuoteWizardCopy;
  locale?: ServiceLocale;
  serviceId?: ServiceId;
}

const labelCls =
  "mb-[7px] block font-display text-[13.5px] font-semibold text-brand-blue";
const inputCls =
  "mb-1 w-full rounded-lg2 border-[1.5px] border-cream-border bg-cream px-3.5 py-[13px] text-[15px] text-ink outline-none transition focus:border-[#2E86DE] focus:bg-white focus:shadow-[0_0_0_3px_rgba(46,134,222,.16)]";
const inputErrCls = "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,.16)]";
const yellowBtn =
  "cursor-pointer rounded-lg2 border-none bg-brand-yellow font-display text-base font-bold tracking-[.04em] text-black uppercase shadow-[0_8px_22px_rgba(255,192,46,.3)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";
const ghostBtn =
  "cursor-pointer rounded-lg2 border-[1.5px] border-cream-border bg-white font-display text-[15px] font-bold tracking-[.04em] text-brand-blue uppercase disabled:cursor-not-allowed disabled:opacity-60";

type LocationFieldName = "pickup" | "dest";

interface ZipSuggestion {
  placeId: string;
  text: string;
  postalCode: string;
}

function createSessionToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createMainSiteRefNo() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replaceAll("-", "").slice(0, 10)
      : Math.random().toString(36).slice(2, 12);

  return `MS-${date}-${random.toUpperCase()}`;
}

function Field({
  label,
  error,
  children,
  className = "mb-4",
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      {children}
      {error && <p className="mt-1 text-[13px] text-red-500">{error}</p>}
    </div>
  );
}

function ZipField({
  id,
  label,
  fieldName,
  placeholder,
  displayValue,
  onDisplayChange,
  register,
  setValue,
  error,
  locale = "en-US",
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
  locale?: ServiceLocale;
}) {
  const [resolvedRegion, setResolvedRegion] = useState("");
  const [lookupWarning, setLookupWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [sessionToken] = useState(createSessionToken);
  const reportedUnrecognizedZipsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const zip = displayValue.replace(/\D/g, "").slice(0, 5);
    if (zip.length !== 5) return;

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setLookupError("");
      try {
        const res = await fetch(
          `/api/places/autocomplete?input=${encodeURIComponent(zip)}&sessionToken=${encodeURIComponent(sessionToken)}&locale=${encodeURIComponent(locale)}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Unable to resolve ZIP");
        const data = (await res.json()) as { suggestions?: ZipSuggestion[] };
        const match = data.suggestions?.find((s) => s.postalCode === zip);

        if (!match) {
          setValue(fieldName, zip, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
          setResolvedRegion("");
          setLookupWarning(
            "We couldn't verify this ZIP automatically, but you can still continue.",
          );
          const reportKey = `${fieldName}:${zip}`;
          if (!reportedUnrecognizedZipsRef.current.has(reportKey)) {
            reportedUnrecognizedZipsRef.current.add(reportKey);
            trackZipNotRecognized({
              field_name: fieldName,
              zip,
              suggestion_count: data.suggestions?.length ?? 0,
            });
          }
          return;
        }

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
          trackEvent("zip_lookup_failed", {
            ...quoteFormAnalytics,
            field_name: fieldName,
          });
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [displayValue, fieldName, locale, sessionToken, setValue]);

  return (
    <Field label={label} error={error?.message || lookupError}>
      <input type="hidden" {...register(fieldName)} />
      <div className="relative">
        <MapPin
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#94a3b8]"
          aria-hidden
        />
        <input
          id={id}
          className={`${inputCls} pl-10 ${error || lookupError ? inputErrCls : ""}`}
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
      {loading && (
        <p className="mt-1 text-[12.5px] text-[#64748B]">Resolving ZIP…</p>
      )}
      {!loading && resolvedRegion && (
        <p className="mt-1 text-[12.5px] font-semibold text-ink">{resolvedRegion}</p>
      )}
      {!loading && lookupWarning && (
        <p className="mt-1 text-[12.5px] text-amber-600">{lookupWarning}</p>
      )}
    </Field>
  );
}

export function QuoteWizard({
  variant = "hero",
  formId,
  className = "",
  copy,
  locale = "en-US",
  serviceId,
}: QuoteWizardProps) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pickupZip, setPickupZip] = useState("");
  const [destZip, setDestZip] = useState("");
  const [internalRefNo] = useState(createMainSiteRefNo);
  const formStartedRef = useRef(false);
  const datePickerOpenedRef = useRef(false);

  const searchParams = useSearchParams();
  const inboundRefNo = searchParams.get("ref_no")?.trim();
  const refNo = inboundRefNo ? `${internalRefNo}-${inboundRefNo.slice(0, 24)}` : internalRefNo;
  const {
    register,
    trigger,
    getValues,
    getFieldState,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<QuoteFormInput, unknown, QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: emptyQuote,
    mode: "onTouched",
    shouldUnregister: false,
  });

  const stepDisplay = step + 1;
  const isPanel = variant === "panel";
  const steps = locale === "es-US"
    ? isPanel
      ? [{ n: 1, label: "Su mudanza" }, { n: 2, label: "Contacto" }, { n: 3, label: "Listo" }] as const
      : [{ n: 1, label: "Detalles" }, { n: 2, label: "Contacto" }, { n: 3, label: "Confirmación" }] as const
    : isPanel ? PANEL_STEPS : STEPS;
  const resolvedFormId = formId ?? (isPanel ? undefined : "quote");
  const fieldIdPrefix = resolvedFormId ?? "quote";
  const panelPadding = isPanel ? "px-3 pt-0 pb-5 min-[360px]:px-4 sm:px-6 sm:pb-6" : "px-[30px] pt-[30px] pb-[26px]";
  const headingFontClass = heroHeadingFont.className;
  const bodyFontClass = isPanel ? heroBodyFont.className : "";
  const moveDate = useWatch({ control, name: "date" });
  const es = locale === "es-US";
  const labels = es
    ? {
        pickup: "Origen (código postal)", destination: "Destino (código postal)",
        pickupPlaceholder: "Código postal de origen", destinationPlaceholder: "Código postal de destino",
        date: "Fecha estimada", datePlaceholder: "Seleccione la fecha", size: "Tamaño de la mudanza",
        sizePlaceholder: "Seleccione el tamaño…", name: "Nombre completo", namePlaceholder: "Su nombre",
        email: "Correo electrónico", phone: "Teléfono", back: "Atrás", submitting: "Enviando…",
        startOver: "Comenzar de nuevo", privacy: "Nunca vendemos su información.",
      }
    : {
        pickup: "Moving From (ZIP)", destination: "Moving To (ZIP)", pickupPlaceholder: "Pickup ZIP code",
        destinationPlaceholder: "Destination ZIP code", date: "Estimated Move Date", datePlaceholder: "Select move date",
        size: "Move Size", sizePlaceholder: "Select move size…", name: "Full Name", namePlaceholder: "Your name",
        email: "Email", phone: "Phone", back: "Back", submitting: "Submitting…", startOver: "Start Over",
        privacy: "We never sell your information.",
      };

  useEffect(() => {
    const stepMeta = STEP_ANALYTICS[step];
    if (!stepMeta) return;

    trackEvent("form_step_viewed", {
      ...quoteFormAnalytics,
      ...stepMeta,
      form_variant: variant,
      form_id: resolvedFormId || "quote-panel",
      service_id: serviceId ?? "general",
      locale,
    });
  }, [step, variant, resolvedFormId, serviceId, locale]);

  function markFormStarted() {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackEvent("form_started", {
      ...quoteFormAnalytics,
      form_variant: variant,
      form_id: resolvedFormId || "quote-panel",
      service_id: serviceId ?? "general",
      locale,
    });
  }

  function trackDatePickerOpened() {
    if (datePickerOpenedRef.current) return;
    datePickerOpenedRef.current = true;
    trackEvent("calendar_or_date_picker_opened", {
      ...quoteFormAnalytics,
      form_variant: variant,
      form_id: resolvedFormId || "quote-panel",
    });
  }

  function trackValidationErrors(stepNumber: number) {
    const stepMeta = STEP_ANALYTICS[stepNumber];
    if (!stepMeta) return;

    const values = getValues();
    for (const fieldName of STEP_FIELDS[stepNumber] || []) {
      const fieldError = getFieldState(fieldName).error;
      if (!fieldError) continue;

      trackEvent("form_validation_error", {
        ...quoteFormAnalytics,
        ...stepMeta,
        form_variant: variant,
        form_id: resolvedFormId || "quote-panel",
        field_name: fieldName,
        error_type: values[fieldName] ? "invalid" : "required",
      });
    }
  }

  function safeQuoteMetadata() {
    const values = getValues();
    return {
      ...quoteFormAnalytics,
      form_variant: variant,
      form_id: resolvedFormId || "quote-panel",
      move_size: values.size || "unknown",
      has_inbound_ref: Boolean(inboundRefNo),
      service_id: serviceId ?? "general",
      locale,
    };
  }

  async function submitQuote() {
    setLoading(true);
    setSubmitError("");
    trackEvent("form_submit_attempted", safeQuoteMetadata());
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...getValues(),
          source_company: MAIN_SITE.sourceCompany,
          source_company_site: MAIN_SITE.sourceCompanySite,
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
    } finally {
      setLoading(false);
    }
  }

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    const fieldsToValidate =
      step === 1 ? ([...STEP_FIELDS[0], ...STEP_FIELDS[1]] as (keyof QuoteFormInput)[]) : STEP_FIELDS[step];
    const valid = await trigger(fieldsToValidate);
    if (!valid) {
      trackValidationErrors(step);
      return;
    }

    const stepMeta = STEP_ANALYTICS[step];
    if (stepMeta) {
      trackEvent("form_step_completed", {
        ...quoteFormAnalytics,
        ...stepMeta,
        form_variant: variant,
        form_id: resolvedFormId || "quote-panel",
      });
    }

    if (step === 1) {
      await submitQuote();
      return;
    }

    setStep((s) => s + 1);
  }

  function handleReset() {
    reset(emptyQuote);
    setPickupZip("");
    setDestZip("");
    setResult(null);
    setSubmitError("");
    setStep(0);
  }

  return (
    <form
      id={resolvedFormId}
      className={`${isPanel ? radiusClasses.md2 : "rounded-panel"} w-full min-w-0 bg-white ${panelPadding} shadow-form-card ${bodyFontClass} ${className ?? ""}`}
      onSubmit={handleNext}
      onChange={markFormStarted}
      onFocus={markFormStarted}
      noValidate
    >
      {isPanel ? (
        <div className="-mx-3 mb-6 bg-brand-blue px-3 pt-6 pb-5 min-[360px]:-mx-4 min-[360px]:px-4 sm:-mx-6 sm:px-6">
          <h2
            className={`mb-1 text-[22px] font-extrabold -tracking-[.02em] text-white ${headingFontClass}`}
          >
            {copy?.title ?? quoteSection.formTitle}
          </h2>
          <p className="m-0 text-[13.5px] text-on-dark-500">{copy?.subtitle ?? quoteSection.formSubtitle}</p>
          <div className="mt-4 h-0.5 w-full rounded-full bg-brand-yellow" />
        </div>
      ) : (
        <div className="mb-2 text-center">
          <h2
            className={`mb-1.5 text-[25px] font-extrabold -tracking-[.02em] text-brand-blue ${headingFontClass}`}
          >
            {copy?.title ?? "Request Your Moving Quote"}
          </h2>
          <p className="m-0 text-[14.5px] text-[#64748B]">
            {copy?.subtitle ?? "Tell us where you are moving, when, and what you need moved."}
          </p>
        </div>
      )}

      <div
        className={`my-[22px] mb-6 flex items-center ${isPanel ? "justify-center gap-1 px-0 sm:justify-between sm:gap-0 sm:px-1" : "justify-center"}`}
      >
        {steps.map((s, i) => {
          const current = stepDisplay === s.n;
          const done = stepDisplay > s.n || (step === 2 && result);
          const dot = current
            ? "bg-brand-yellow text-black shadow-[0_4px_12px_rgba(255,192,46,.4)]"
            : done
              ? "bg-brand-blue-bright text-white"
              : "bg-cream-border-2 text-[#94a3b8]";
          return (
            <div key={s.n} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`grid place-items-center rounded-full font-extrabold ${isPanel ? "size-[30px] text-[13px] sm:size-[34px] sm:text-[15px]" : "size-[34px] text-[15px]"} ${headingFontClass} ${dot}`}
                >
                  {s.n}
                </span>
                <span className={`${isPanel ? "max-w-[64px] text-[10px] sm:max-w-[88px] sm:text-xs" : "max-w-[88px] text-xs"} text-center leading-tight font-semibold text-[#64748B]`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className={`mb-[18px] h-0.5 bg-cream-border ${isPanel ? "mx-1 w-[12px] min-[360px]:w-[18px] sm:mx-2 sm:w-[28px] lg:w-[40px]" : "mx-1.5 w-[46px]"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {step === 2 && result ? (
        <div className="px-2 pt-6 pb-3.5 text-center">
          <span className="mx-auto mb-4 grid size-[60px] place-items-center rounded-full bg-brand-yellow-soft">
            <Check className="text-brand-blue-bright" size={30} strokeWidth={2.5} />
          </span>
          <h3 className="mb-2 font-display text-[21px] font-extrabold text-brand-blue">
            {copy?.confirmationTitle ?? "Request Received"}
          </h3>
          <p className="mb-3 text-[14.5px] leading-[1.55] text-[#64748B]">
            {getValues("pickup")} → {getValues("dest")} · {getValues("size")}
          </p>
          <p className="mb-[18px] text-[14.5px] leading-[1.55] text-[#64748B]">
            {copy?.confirmationBody ?? "A Vantage moving coordinator will reach out shortly."} {es ? "Para hablar ahora, llame al" : "To speak with someone now, call"}{" "}
            <a
              href={telHref(business.phoneDisplay)}
              className="font-semibold text-brand-blue-bright"
              data-analytics-location="quote_result"
            >
              {business.phoneDisplay}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer rounded-lg2 border-[1.5px] border-cream-border bg-cream px-5 py-[11px] font-display text-sm font-bold tracking-[.04em] text-brand-blue uppercase"
          >
            {labels.startOver}
          </button>
        </div>
      ) : (
        <>
          {step === 0 && (
            <div>
              <ZipField
                id={`${fieldIdPrefix}-pickup-zip`}
                label={labels.pickup}
                fieldName="pickup"
                placeholder={labels.pickupPlaceholder}
                displayValue={pickupZip}
                onDisplayChange={setPickupZip}
                register={register}
                setValue={setValue}
                error={errors.pickup}
                locale={locale}
              />
              <ZipField
                id={`${fieldIdPrefix}-dest-zip`}
                label={labels.destination}
                fieldName="dest"
                placeholder={labels.destinationPlaceholder}
                displayValue={destZip}
                onDisplayChange={setDestZip}
                register={register}
                setValue={setValue}
                error={errors.dest}
                locale={locale}
              />
              <Field label={labels.date} error={errors.date?.message}>
                <div onClick={trackDatePickerOpened} onFocusCapture={trackDatePickerOpened}>
                  <MoveDatePicker
                    id={`${fieldIdPrefix}-move-date`}
                    variant="main-site"
                    value={moveDate}
                    hasError={!!errors.date}
                    placeholder={labels.datePlaceholder}
                    onChange={(nextDate) =>
                      setValue("date", nextDate, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                    onBlur={() => void trigger("date")}
                  />
                </div>
              </Field>
              <Field label={labels.size} error={errors.size?.message}>
                <select
                  className={`${inputCls} ${errors.size ? inputErrCls : ""}`}
                  defaultValue=""
                  {...register("size")}
                >
                  <option value="" disabled>
                    {labels.sizePlaceholder}
                  </option>
                  {MOVE_SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          )}

          {step === 1 && (
            <div>
              <Field label={labels.name} error={errors.name?.message}>
                <input
                  className={`${inputCls} ${errors.name ? inputErrCls : ""}`}
                  placeholder={labels.namePlaceholder}
                  {...register("name")}
                />
              </Field>
              <Field label={labels.email} error={errors.email?.message}>
                <input
                  type="email"
                  className={`${inputCls} ${errors.email ? inputErrCls : ""}`}
                  placeholder="you@email.com"
                  {...register("email")}
                />
              </Field>
              <Field label={labels.phone} error={errors.phone?.message} className="mb-3.5">
                <input
                  type="tel"
                  inputMode="tel"
                  className={`${inputCls} ${errors.phone ? inputErrCls : ""}`}
                  placeholder="(000) 000-0000"
                  {...register("phone")}
                />
              </Field>
              <label className="mb-4 flex gap-2.5 text-left">
                <input
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 accent-brand-blue-bright"
                  {...register("smsConsent")}
                />
                <span className="text-[11.5px] leading-[1.5] text-[#64748B]">
                  {es
                    ? `Acepto recibir mensajes SMS de ${business.name} sobre mi solicitud, programación y soporte. Pueden aplicarse tarifas. Responda STOP para cancelar. El consentimiento no es obligatorio.`
                    : `I agree to receive SMS messages from ${business.name} about my moving quote request, scheduling updates, and customer support. Msg & data rates may apply. Reply STOP to opt out. Consent is not required to submit a quote request.`}
                </span>
              </label>
            </div>
          )}

          {submitError && (
            <p className="mb-3 text-center text-[13.5px] text-red-500">{submitError}</p>
          )}

          <div className="flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                disabled={loading}
                className={`${ghostBtn} px-5 py-3.5`}
              >
                {labels.back}
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`${step === 0 ? `${yellowBtn} w-full py-[15px]` : step === 1 ? "flex-1 cursor-pointer rounded-lg2 border-none bg-brand-blue-bright py-3.5 font-display text-base font-bold tracking-[.04em] text-white uppercase shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0" : yellowBtn} ${step === 1 ? "" : step > 0 ? "flex-1 py-3.5" : ""}`}
            >
              {loading
                ? labels.submitting
                : step === 1
                  ? isPanel
                    ? copy?.submitLabel ?? "Get My Free Quote"
                    : copy?.submitLabel ?? "Request Free Quote"
                  : copy?.continueLabel ?? "Continue"}
            </button>
          </div>
        </>
      )}

      {isPanel ? (
        <p className="mt-4 flex items-center justify-center gap-[7px] text-center text-[12.5px] text-[#94a3b8]">
          <Check className="text-brand-blue-bright" size={13} strokeWidth={2.5} aria-hidden />
          {labels.privacy}
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center text-[12.5px] text-[#94a3b8]">
          {quoteSection.footerTrustItems.map((item) => (
            <span key={item} className="inline-flex items-center gap-[5px]">
              <Check className="text-brand-blue-bright" size={13} strokeWidth={2.5} aria-hidden />
              {item}
            </span>
          ))}
        </div>
      )}
    </form>
  );
}
