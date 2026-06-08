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
import { cn } from "@/lib/utils";
import { telHref, usd } from "@/lib/format";
import { site } from "@/content/site";
import {
  MOVE_SIZES,
  STEP_FIELDS,
  emptyQuote,
  quoteFormSchema,
  type QuoteFormValues,
  type QuoteResult,
} from "@/schemas/quote-form.schema";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { StepIndicator } from "./StepIndicator";

type LocationFieldName = "pickup" | "dest";

interface AddressSuggestion {
  placeId: string;
  text: string;
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

function AddressAutocompleteField({
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
  register: UseFormRegister<QuoteFormValues>;
  setValue: UseFormSetValue<QuoteFormValues>;
  error?: FieldError;
}) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [sessionToken, setSessionToken] = useState(createSessionToken);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = displayValue.trim();

    if (trimmed.length < 3) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setLookupError("");
      try {
        const res = await fetch(
          `/api/places/autocomplete?input=${encodeURIComponent(trimmed)}&sessionToken=${encodeURIComponent(sessionToken)}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Unable to load address suggestions");
        const data = (await res.json()) as { suggestions?: AddressSuggestion[] };
        setSuggestions(data.suggestions ?? []);
        setOpen(true);
      } catch {
        if (!controller.signal.aborted) {
          setSuggestions([]);
          setOpen(false);
          setLookupError("Address suggestions are unavailable. You can enter a 5-digit ZIP.");
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

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!fieldRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  async function selectSuggestion(suggestion: AddressSuggestion) {
    setLoading(true);
    setLookupError("");
    try {
      const res = await fetch(
        `/api/places/details?placeId=${encodeURIComponent(suggestion.placeId)}&sessionToken=${encodeURIComponent(sessionToken)}`,
      );
      if (!res.ok) throw new Error("Unable to load selected address");
      const data = (await res.json()) as { formattedAddress?: string; postalCode?: string };
      if (!data.postalCode) {
        setLookupError("Select an address with a 5-digit ZIP code.");
        return;
      }

      onDisplayChange(data.formattedAddress || suggestion.text);
      setValue(fieldName, data.postalCode.slice(0, 5), {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setOpen(false);
      setSuggestions([]);
      setSessionToken(createSessionToken());
    } catch {
      setLookupError("We could not read that address. Try another result or enter a ZIP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Field id={id} label={label} error={error?.message || lookupError}>
      <input type="hidden" {...register(fieldName)} />
      <div className="qf__autocomplete" ref={fieldRef}>
        <div className="qf__input-ico">
          <Icon name="pin" />
          <Input
            id={id}
            placeholder={placeholder}
            value={displayValue}
            autoComplete="street-address"
            onChange={(e) => {
              const nextValue = e.target.value;
              onDisplayChange(nextValue);
              if (/^\d{5}$/.test(nextValue.trim())) {
                setValue(fieldName, nextValue.trim(), {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              } else {
                setValue(fieldName, "", { shouldDirty: true, shouldValidate: false });
              }
              if (nextValue.trim().length < 3) {
                setSuggestions([]);
                setOpen(false);
                setLookupError("");
              }
            }}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
          />
        </div>
        {open && (
          <div className="qf__suggestions" role="listbox" aria-label={`${label} suggestions`}>
            {loading && <div className="qf__suggestion qf__suggestion--muted">Searching...</div>}
            {!loading &&
              suggestions.map((suggestion) => (
                <button
                  key={suggestion.placeId}
                  type="button"
                  className="qf__suggestion"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion.text}
                </button>
              ))}
            {!loading && suggestions.length === 0 && (
              <div className="qf__suggestion qf__suggestion--muted">No addresses found</div>
            )}
            <div className="qf__suggestions-brand">Powered by Google</div>
          </div>
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
}

export function QuoteForm({ compact, sourceCompany, sourceCompanySite }: QuoteFormProps) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [destAddress, setDestAddress] = useState("");

  // Lead-source ref number passed by partner companies (?ref_no=...).
  const searchParams = useSearchParams();
  const refNo = searchParams.get("ref_no")?.trim() || undefined;

  // Min selectable move date (today). Computed at render; hydration warnings
  // are suppressed on the input since the server/client day can differ by tz.
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    trigger,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: emptyQuote,
    mode: "onTouched",
  });

  async function submitQuote() {
    setLoading(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...getValues(),
          source_company: sourceCompany,
          source_company_site: sourceCompanySite,
          ref_no: refNo,
        }),
      });
      if (!res.ok) throw new Error("Quote request failed");
      const data: QuoteResult = await res.json();
      setResult(data);
      setStep(2);
    } catch {
      setSubmitError("Something went wrong. Please try again or give us a call.");
    } finally {
      setLoading(false);
    }
  }

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;
    if (step === 1) {
      await submitQuote();
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleReset() {
    reset(emptyQuote);
    setPickupAddress("");
    setDestAddress("");
    setResult(null);
    setSubmitError("");
    setStep(0);
  }

  const firstName = (getValues("name") || "").trim().split(" ")[0];

  return (
    <form className={cn("qf", compact && "qf--compact")} onSubmit={handleNext} noValidate>
      <div className="qf__head">
        <h3>Get Instant Quote</h3>
        <p>Receive your free moving quote in seconds</p>
      </div>

      <StepIndicator step={step} />

      <div className="qf__body">
        {step === 0 && (
          <div className="qf__pane">
            <AddressAutocompleteField
              id="pickup-address"
              label="Pickup address"
              fieldName="pickup"
              placeholder="Start typing pickup address"
              displayValue={pickupAddress}
              onDisplayChange={setPickupAddress}
              register={register}
              setValue={setValue}
              error={errors.pickup}
            />
            <AddressAutocompleteField
              id="dest-address"
              label="Destination address"
              fieldName="dest"
              placeholder="Start typing destination address"
              displayValue={destAddress}
              onDisplayChange={setDestAddress}
              register={register}
              setValue={setValue}
              error={errors.dest}
            />
          </div>
        )}

        {step === 1 && (
          <div className="qf__pane">
            <div className="qf__row">
              <Field id="date" label="Move date" error={errors.date?.message}>
                <Input
                  id="date"
                  type="date"
                  min={today}
                  suppressHydrationWarning
                  {...register("date")}
                />
              </Field>
              <Field id="size" label="Move size" error={errors.size?.message}>
                <Select id="size" {...register("size")}>
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
          </div>
        )}

        {step === 2 && result && (
          <div className="qf__pane qf__result">
            <div className="qf__result-badge">
              <Icon name="check" width={20} height={20} />
            </div>
            <p className="qf__result-cap">Estimated cost for your move</p>
            <div className="qf__price">
              {usd(result.low)}
              <span>–{usd(result.high)}</span>
            </div>
            <div className="qf__result-meta">
              <span>
                <Icon name="pin" width={15} height={15} /> {getValues("pickup")} →{" "}
                {getValues("dest")}
              </span>
              <span>
                <Icon name="truck" width={15} height={15} /> ~{result.miles} mi · {getValues("size")}
              </span>
            </div>
            <p className="qf__result-note">
              A moving specialist will call {firstName || "you"} shortly to confirm your exact rate
              and book your date.
            </p>
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
                Back
              </button>
            )}
            <Button type="submit" block disabled={loading} arrow={!loading}>
              {loading ? "Calculating…" : step === 1 ? "Get Free Quote" : "Continue"}
            </Button>
          </div>
        </>
      )}

      <a href={telHref(site.phone)} className="qf__phone">
        <Icon name="phone" width={16} height={16} fill="currentColor" stroke="none" /> {site.phone}
      </a>

      <p className="qf__legal">
        By submitting this form, you acknowledge that {site.name} may contact you with updates,
        offers, and information relevant to your moving process. You also agree to our privacy
        policy.
      </p>
    </form>
  );
}
