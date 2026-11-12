"use client";
import { captureWebsiteAttribution } from "@/lib/website-attribution";

import { useEffect, useRef, useState, useCallback, useId, type ReactNode } from "react";
import Link from "next/link";
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
import { business } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { radiusClasses } from "@/lib/playground/layout-playground";
import { telHref } from "@/lib/format";
import { MAIN_SITE } from "@/content/partners";
import { quoteFormAnalytics, trackEvent, trackZipNotRecognized } from "@/lib/analytics";
import { quoteCopy, quoteError, moveSizeLabel } from "@/lib/quote-copy";
import { PickupLocationSuggestion } from "./PickupLocationSuggestion";
import { QUOTE_DRAFT_KEY, parseQuoteDraft, parseDestination, destinationGuide, isCapturedResponse, type QuoteLocale, type QuoteDraft, type ConfirmedDestination } from "@/lib/quote-journey";
import {
  MOVE_SIZES,
  STEP_FIELDS,
  emptyQuote,
  quoteFormSchema,
  type QuoteFormInput,
  type QuoteFormValues,
} from "@/schemas/quote-form.schema";

const STEP_ANALYTICS = [
  { step_number: 1, step_name: "moving_details" },
  { step_number: 2, step_name: "contact_info" },
] as const;

export interface QuoteWizardProps {
  locale?: QuoteLocale;
  serviceId?: string;
  guideLinks?: { madison: string; wisconsin: string; generic: string };
  variant?: "hero" | "panel";
  formId?: string;
  className?: string;
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

function createLeadId() {
  const hex =
    typeof crypto !== "undefined" && "getRandomValues" in crypto
      ? Array.from(crypto.getRandomValues(new Uint8Array(7)), (byte) =>
          byte.toString(16).padStart(2, "0"),
        )
          .join("")
          .slice(0, 13)
      : Array.from({ length: 13 }, () =>
          Math.floor(Math.random() * 16).toString(16),
        ).join("");

  return `LID${hex}`;
}

function Field({
  id,
  label,
  error,
  children,
  className = "mb-4",
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelCls}>{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-[13px] text-red-500">{error}</p>}
    </div>
  );
}

function ZipField({
  locale,
  onResolved,
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
  locale: QuoteLocale;
  onResolved?: (place: ConfirmedDestination | null) => void;
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
  const copy = quoteCopy[locale];
  const [candidate, setCandidate] = useState<ConfirmedDestination | null>(null);
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
          `/api/places/autocomplete?input=${encodeURIComponent(zip)}&sessionToken=${encodeURIComponent(sessionToken)}&locale=${locale}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Unable to resolve ZIP");
        const data = (await res.json()) as { suggestions?: ZipSuggestion[] };
        const match = data.suggestions?.find((s) => s.postalCode === zip);

        if (!match) {
          setValue(fieldName, zip, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
          setResolvedRegion("");
          setLookupWarning(
            copy.unverified,
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
        if (onResolved) {
          const details = await fetch(`/api/places/details?placeId=${encodeURIComponent(match.placeId)}&sessionToken=${encodeURIComponent(sessionToken)}&locale=${locale}`, { signal: controller.signal });
          if (details.ok) {
            const place = parseDestination(await details.json());
            setCandidate(place?.postalCode === zip ? place : null);
          }
        }
      } catch {
        if (!controller.signal.aborted) {
          setValue(fieldName, zip, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
          setResolvedRegion("");
          setLookupError(copy.lookupFailed);
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
  }, [displayValue, fieldName, sessionToken, setValue, locale, copy, onResolved]);

  return (
    <Field id={id} label={label} error={quoteError(error?.message, locale) || lookupError}>
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
          aria-invalid={!!error}
          aria-describedby={error || lookupError ? `${id}-error` : undefined}
          onChange={(e) => {
            const nextZip = e.target.value.replace(/\D/g, "").slice(0, 5);
            onDisplayChange(nextZip);
            setCandidate(null);
            onResolved?.(null);
            setResolvedRegion("");
            setLookupWarning("");
            setLookupError("");
            setLoading(false);
            setValue(fieldName, nextZip, { shouldDirty: true, shouldValidate: false });
          }}
        />
      </div>
      {loading && (
        <p className="mt-1 text-[12.5px] text-[#64748B]">{copy.resolving}</p>
      )}
      {!loading && resolvedRegion && (
        <p className="mt-1 text-[12.5px] font-semibold text-ink">{resolvedRegion}</p>
      )}
      {!loading && candidate && onResolved && (
        <button type="button" className="mt-2 text-left text-sm font-semibold text-brand-blue underline" onClick={() => { onResolved(candidate); setCandidate(null); }}>
          {copy.confirmDestination}: {candidate.city || candidate.state}, {candidate.state}
        </button>
      )}
      {!loading && lookupWarning && (
        <p className="mt-1 text-[12.5px] text-amber-600">{lookupWarning}</p>
      )}
      {fieldName === "pickup" && <PickupLocationSuggestion key={`${locale}:${displayValue}`} locale={locale} inputId={id} onConfirm={zip => { onDisplayChange(zip); setValue(fieldName, zip, { shouldDirty: true, shouldTouch: true, shouldValidate: true }); }} />}
    </Field>
  );
}

export function QuoteWizard({
  locale = "en",
  serviceId,
  guideLinks,
  variant = "hero",
  formId,
  className = "",
}: QuoteWizardProps) {
  const copy = quoteCopy[locale];
  const [destination, setDestination] = useState<ConfirmedDestination | null>(null);
  const onDestinationResolved = useCallback((place: ConfirmedDestination | null) => setDestination(place), []);
  const draftReady = useRef(false);
  const activeForm = useRef(false);
  const instanceId = useId();
  const lastInteraction = useRef(0);
  const completedStepsRef = useRef<number[]>([]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<{ leadCaptured: true } | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pickupZip, setPickupZip] = useState("");
  const [destZip, setDestZip] = useState("");
  const [internalRefNo, setInternalRefNo] = useState(createMainSiteRefNo);
  const [lid, setLid] = useState(createLeadId);
  const formStartedRef = useRef(false);
  const datePickerOpenedRef = useRef(false);

  const searchParams = useSearchParams();
  const [savedInboundRef, setSavedInboundRef] = useState("");
  const inboundRefNo = searchParams.get("ref_no")?.trim().slice(0, 24) || savedInboundRef;
  const refNo = inboundRefNo ? `${internalRefNo}-${inboundRefNo.slice(0, 24)}` : internalRefNo;
  const {
    register,
    trigger,
    getValues,
    getFieldState,
    reset,
    setValue,
    control,
    subscribe,
    formState: { errors },
  } = useForm<QuoteFormInput, unknown, QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: emptyQuote,
    mode: "onTouched",
    shouldUnregister: false,
  });

  const stepDisplay = step + 1;
  const isPanel = variant === "panel";
  const steps = copy.steps.map((label, i) => ({ n: i + 1, label }));
  const resolvedFormId = formId ?? (isPanel ? undefined : "quote");
  const fieldIdPrefix = resolvedFormId ?? "quote";
  const panelPadding = isPanel ? "px-3 pt-0 pb-5 min-[360px]:px-4 sm:px-6 sm:pb-6" : "px-[30px] pt-[30px] pb-[26px]";
  const headingFontClass = heroHeadingFont.className;
  const bodyFontClass = isPanel ? heroBodyFont.className : "";
  const moveDate = useWatch({ control, name: "date" });

  useEffect(() => {
    try {
      const draft = parseQuoteDraft(sessionStorage.getItem(QUOTE_DRAFT_KEY));
      if (draft) {
        reset({ ...draft.values, size: draft.values.size || emptyQuote.size });
        // Hydrate this server-rendered form from the browser's optional external draft store.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPickupZip(draft.values.pickup);
        setDestZip(draft.values.dest);
        setStep(draft.step);
        setInternalRefNo(draft.internalRefNo);
        setSavedInboundRef(draft.inboundRefNo);
        setLid(draft.lid);
        setDestination(draft.destination);
        formStartedRef.current = draft.started;
        completedStepsRef.current = draft.completedSteps;
        lastInteraction.current = draft.savedAt;
      } else {
        sessionStorage.removeItem(QUOTE_DRAFT_KEY);
      }
    } catch { /* Storage is optional; manual form entry still works. */ }
    draftReady.current = true;
  }, [reset]);

  useEffect(() => {
    const deactivateOtherForm = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== instanceId) activeForm.current = false;
    };
    window.addEventListener("vantage-quote-active", deactivateOtherForm);
    return () => window.removeEventListener("vantage-quote-active", deactivateOtherForm);
  }, [instanceId]);

  const saveDraft = useCallback(() => {
    if (!draftReady.current || !activeForm.current || result) return;
    try {
      const draft: QuoteDraft = {
        version: 1, savedAt: lastInteraction.current, step: step === 1 ? 1 : 0,
        internalRefNo, inboundRefNo: inboundRefNo || "", lid,
        started: formStartedRef.current, completedSteps: completedStepsRef.current,
        values: { ...getValues(), smsConsent: getValues("smsConsent") ?? true }, destination,
      };
      sessionStorage.setItem(QUOTE_DRAFT_KEY, JSON.stringify(draft));
    } catch { /* A denied or full store must not stop quote intake. */ }
  }, [step, internalRefNo, inboundRefNo, lid, getValues, destination, result]);

  useEffect(() => {
    const unsubscribe = subscribe({ formState: { values: true }, callback: () => saveDraft() });
    saveDraft();
    window.addEventListener("pagehide", saveDraft);
    return () => { unsubscribe(); window.removeEventListener("pagehide", saveDraft); };
  }, [subscribe, saveDraft]);

  function markFormStarted() {
    if (result) return;
    if (!activeForm.current) window.dispatchEvent(new CustomEvent("vantage-quote-active", { detail: instanceId }));
    activeForm.current = true;
    lastInteraction.current = Date.now();
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackEvent("form_step_viewed", { ...quoteFormAnalytics, ...STEP_ANALYTICS[step], locale, service_id: serviceId || "none" });
    trackEvent("form_started", {
      ...quoteFormAnalytics,
      locale, service_id: serviceId || "none",
      form_variant: variant,
      form_id: resolvedFormId || "quote-panel",
    });
  }

  function trackDatePickerOpened() {
    if (datePickerOpenedRef.current) return;
    datePickerOpenedRef.current = true;
    trackEvent("calendar_or_date_picker_opened", {
      ...quoteFormAnalytics,
      locale, service_id: serviceId || "none",
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
      locale, service_id: serviceId || "none",
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
      locale, service_id: serviceId || "none",
      form_variant: variant,
      form_id: resolvedFormId || "quote-panel",
      move_size: values.size || "unknown",
      has_inbound_ref: Boolean(inboundRefNo),
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
          lid,
          website_attribution: captureWebsiteAttribution(),
          sms_consent: getValues("smsConsent"),
        }),
      });
      if (!res.ok) throw new Error("Quote request failed");
      const data: unknown = await res.json();
      if (!isCapturedResponse(data)) throw new Error("Lead capture unconfirmed");
      setResult(data);
      activeForm.current = false;
      window.dispatchEvent(new CustomEvent("vantage-quote-active", { detail: "captured" }));
      try { sessionStorage.removeItem(QUOTE_DRAFT_KEY); } catch { /* Optional storage. */ }
      trackEvent(data.leadCaptured ? "form_submit_success" : "form_submit_failed", {
        ...safeQuoteMetadata(),
        error_type: data.leadCaptured ? null : "lead_capture_failed",
      });
      setStep(2);
    } catch {
      trackEvent("form_submit_failed", safeQuoteMetadata());
      setSubmitError(copy.failure);
    } finally {
      setLoading(false);
    }
  }

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    markFormStarted();
    if (loading) return;

    const fieldsToValidate =
      step === 1 ? ([...STEP_FIELDS[0], ...STEP_FIELDS[1]] as (keyof QuoteFormInput)[]) : STEP_FIELDS[step];
    const valid = await trigger(fieldsToValidate);
    if (!valid) {
      trackValidationErrors(step);
      if (step === 1 && STEP_FIELDS[0].some((field) => getFieldState(field).error)) setStep(0);
      return;
    }

    const stepMeta = STEP_ANALYTICS[step];
    if (stepMeta && !completedStepsRef.current.includes(step)) {
      completedStepsRef.current.push(step);
      trackEvent("form_step_completed", {
        ...quoteFormAnalytics,
      locale, service_id: serviceId || "none",
        ...stepMeta,
        form_variant: variant,
        form_id: resolvedFormId || "quote-panel",
      });
    }

    if (step === 1) {
      await submitQuote();
      return;
    }

    trackEvent("form_step_viewed", { ...quoteFormAnalytics, ...STEP_ANALYTICS[1], locale, service_id: serviceId || "none" });
    setStep((s) => s + 1);
  }

  function handleReset() {
    activeForm.current = false;
    window.dispatchEvent(new CustomEvent("vantage-quote-active", { detail: "cleared" }));
    formStartedRef.current = false;
    datePickerOpenedRef.current = false;
    completedStepsRef.current = [];
    setDestination(null);
    setInternalRefNo(createMainSiteRefNo());
    try { sessionStorage.removeItem(QUOTE_DRAFT_KEY); } catch { /* Optional storage. */ }
    reset(emptyQuote);
    setPickupZip("");
    setDestZip("");
    setResult(null);
    setSubmitError("");
    setLid(createLeadId());
    setStep(0);
  }

  return (
    <form
      id={resolvedFormId}
      className={`${isPanel ? radiusClasses.md2 : "rounded-panel"} w-full min-w-0 bg-white ${panelPadding} shadow-form-card ${bodyFontClass} ${className ?? ""}`}
      onSubmit={handleNext}
      onChange={markFormStarted}
      onPointerDown={markFormStarted}
      onKeyDown={markFormStarted}
      lang={locale}
      noValidate
    >
      {isPanel ? (
        <div className="-mx-3 mb-6 bg-brand-blue px-3 pt-6 pb-5 min-[360px]:-mx-4 min-[360px]:px-4 sm:-mx-6 sm:px-6">
          <h2
            className={`mb-1 text-[22px] font-extrabold -tracking-[.02em] text-white ${headingFontClass}`}
          >
            {copy.title}
          </h2>
          <p className="m-0 text-[13.5px] text-on-dark-500">{copy.subtitle}</p>
          <div className="mt-4 h-0.5 w-full rounded-full bg-brand-yellow" />
        </div>
      ) : (
        <div className="mb-2 text-center">
          <h2
            className={`mb-1.5 text-[25px] font-extrabold -tracking-[.02em] text-brand-blue ${headingFontClass}`}
          >
            {copy.title}
          </h2>
          <p className="m-0 text-[14.5px] text-[#64748B]">
            {copy.subtitle}
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
            {copy.received}
          </h3>
          <p className="mb-3 text-[14.5px] leading-[1.55] text-[#64748B]">
            {getValues("pickup")} → {getValues("dest")} · {moveSizeLabel(getValues("size"), locale)}
          </p>
          <p className="mb-[18px] text-[14.5px] leading-[1.55] text-[#64748B]">
            {copy.confirmation}{" "}
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
            {copy.reset}
          </button>
        </div>
      ) : (
        <>
          {step === 0 && (
            <div>
              <ZipField
                id={`${fieldIdPrefix}-pickup-zip`}
                label={copy.pickup}
                locale={locale}
                fieldName="pickup"
                placeholder={copy.pickupPlaceholder}
                displayValue={pickupZip}
                onDisplayChange={setPickupZip}
                register={register}
                setValue={setValue}
                error={errors.pickup}
              />
              <ZipField
                id={`${fieldIdPrefix}-dest-zip`}
                label={copy.destination}
                locale={locale}
                onResolved={onDestinationResolved}
                fieldName="dest"
                placeholder={copy.destinationPlaceholder}
                displayValue={destZip}
                onDisplayChange={setDestZip}
                register={register}
                setValue={setValue}
                error={errors.dest}
              />
              <Field id={`${fieldIdPrefix}-move-date`} label={copy.date} error={quoteError(errors.date?.message, locale)}>
                <div onClick={trackDatePickerOpened} onFocusCapture={trackDatePickerOpened}>
                  <MoveDatePicker
                    id={`${fieldIdPrefix}-move-date`}
                    variant="main-site"
                    locale={locale}
                    value={moveDate}
                    hasError={!!errors.date}
                    placeholder={copy.datePlaceholder}
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
              <Field id={`${fieldIdPrefix}-size`} label={copy.size} error={quoteError(errors.size?.message, locale)}>
                <select
                  id={`${fieldIdPrefix}-size`}
                  aria-invalid={!!errors.size}
                  aria-describedby={errors.size ? `${fieldIdPrefix}-size-error` : undefined}
                  className={`${inputCls} ${errors.size ? inputErrCls : ""}`}
                  defaultValue=""
                  {...register("size")}
                >
                  <option value="" disabled>
                    {copy.sizePlaceholder}
                  </option>
                  {MOVE_SIZES.map((s) => (
                    <option key={s} value={s}>
                      {moveSizeLabel(s, locale)}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          )}

          {step === 1 && (
            <div>
              <Field id={`${fieldIdPrefix}-name`} label={copy.name} error={quoteError(errors.name?.message, locale)}>
                <input
                  className={`${inputCls} ${errors.name ? inputErrCls : ""}`}
                  placeholder={copy.namePlaceholder}
                  id={`${fieldIdPrefix}-name`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${fieldIdPrefix}-name-error` : undefined}
                  {...register("name")}
                />
              </Field>
              <Field id={`${fieldIdPrefix}-email`} label={copy.email} error={quoteError(errors.email?.message, locale)}>
                <input
                  type="email"
                  className={`${inputCls} ${errors.email ? inputErrCls : ""}`}
                  placeholder="you@email.com"
                  id={`${fieldIdPrefix}-email`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${fieldIdPrefix}-email-error` : undefined}
                  {...register("email")}
                />
              </Field>
              <Field id={`${fieldIdPrefix}-phone`} label={copy.phone} error={quoteError(errors.phone?.message, locale)} className="mb-3.5">
                <input
                  type="tel"
                  inputMode="tel"
                  className={`${inputCls} ${errors.phone ? inputErrCls : ""}`}
                  placeholder="(000) 000-0000"
                  id={`${fieldIdPrefix}-phone`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? `${fieldIdPrefix}-phone-error` : undefined}
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
                  {copy.consent}
                </span>
              </label>
            </div>
          )}

          {submitError && (
            <p role="alert" className="mb-3 text-center text-[13.5px] text-red-500">{submitError}</p>
          )}

          <div className="flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                disabled={loading}
                className={`${ghostBtn} px-5 py-3.5`}
              >
                {copy.back}
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`${step === 0 ? `${yellowBtn} w-full py-[15px]` : step === 1 ? "flex-1 cursor-pointer rounded-lg2 border-none bg-brand-blue-bright py-3.5 font-display text-base font-bold tracking-[.04em] text-white uppercase shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0" : yellowBtn} ${step === 1 ? "" : step > 0 ? "flex-1 py-3.5" : ""}`}
            >
              {loading ? copy.submitting : step === 1 ? copy.submit : copy.continue}
            </button>
          </div>
        </>
      )}

      {guideLinks && (
        <aside className="mt-5 rounded-lg2 bg-cream p-3 text-sm">
          {destination && <p className="mb-1 font-semibold">{destination.city || destination.state}, {destination.state}</p>}
          <Link href={guideLinks[destinationGuide(destination)]} onClick={saveDraft} className="font-semibold text-brand-blue underline">
            {destination ? copy.guide : copy.genericGuide}
          </Link>
        </aside>
      )}
      {!result && <p className="mt-4 text-xs text-slate-600">{copy.draft} <button type="button" className="underline" onClick={handleReset} disabled={loading}>{copy.clearDraft}</button></p>}
      <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-center text-xs text-slate-600">
        {copy.trust.map((item) => <span key={item}>{item}</span>)}
      </div>
    </form>
  );
}
