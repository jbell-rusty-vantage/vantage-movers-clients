import { NextResponse } from "next/server";
import { z } from "zod";
import { quoteFormSchema } from "@/schemas/quote-form.schema";
import { estimate } from "@/lib/estimate";
import { MAIN_SITE } from "@/content/partners";
import { createFormLead, type CreateFormLeadInput } from "@vantage/api-client";

const requestSchema = quoteFormSchema.extend({
  source_company: z.string().trim().optional(),
  source_company_site: z.string().trim().optional(),
  ref_no: z.string().trim().optional(),
  sms_consent: z.boolean().optional(),
});

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

  const { ref_no, sms_consent } = parsed.data;
  const quote = {
    pickup: parsed.data.pickup,
    dest: parsed.data.dest,
    date: parsed.data.date,
    size: parsed.data.size,
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    smsConsent: parsed.data.smsConsent,
  };

  const leadPayload: CreateFormLeadInput = {
    source_company: MAIN_SITE.sourceCompany,
    source_company_site: MAIN_SITE.sourceCompanySite,
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
