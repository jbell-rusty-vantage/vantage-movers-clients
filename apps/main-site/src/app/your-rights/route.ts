import { NextResponse } from "next/server";

const RIGHTS_PDF = "/pdfs/Rights-and-Responsibilities-2013.pdf";

/** Clean URL for the FMCSA "Your Rights and Responsibilities" PDF. */
export function GET(request: Request) {
  return NextResponse.redirect(new URL(RIGHTS_PDF, request.url));
}
