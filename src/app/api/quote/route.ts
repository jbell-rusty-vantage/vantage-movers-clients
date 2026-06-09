import { NextResponse } from "next/server";
import { z } from "zod";
import { quoteFormSchema } from "@/schemas/quote-form.schema";
import { estimate } from "@/lib/estimate";
import { createFormLead, type CreateFormLeadInput } from "@/lib/vantage/server";

/** Source companies the API recognizes; anything else falls back to main_site. */
const SOURCE_COMPANIES = [
  "tbm_leads",
  "tbm_prime_leads",
  "top10_leads",
  "main_site",
] as const;

const requestSchema = quoteFormSchema.extend({
  source_company: z.string().trim().optional(),
  source_company_site: z.string().trim().optional(),
  ref_no: z.string().trim().optional(),
  sms_consent: z.boolean().optional(),
});

function normalizeSourceCompany(value?: string): string {
  if (value && (SOURCE_COMPANIES as readonly string[]).includes(value)) {
    return value;
  }
  return "main_site";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: z.treeifyError(parsed.error) },
      { status: 400 },
    );
  }

  const { source_company, source_company_site, ref_no, sms_consent, ...quote } =
    parsed.data;

  // Forward the validated lead to vantage-main-server. Failures are logged but
  // never block the estimate the user is waiting on.
  const leadPayload: CreateFormLeadInput = {
    source_company: normalizeSourceCompany(source_company),
    source_company_site,
    name: quote.name,
    email: quote.email,
    phone_number: quote.phone,
    pickup_zip: quote.pickup,
    destination_zip: quote.dest,
    move_size: quote.size,
    move_date: quote.date,
    ref_no: ref_no || undefined,
    sms_consent: sms_consent ?? quote.smsConsent,
  };

  const leadResult = await createFormLead(leadPayload);
  if (!leadResult.ok) {
    console.error(
      `[quote] form lead create failed (${leadResult.status}): ${leadResult.error}`,
    );
  }

  const result = estimate(quote);
  return NextResponse.json({ ...result, leadCaptured: leadResult.ok });
}
