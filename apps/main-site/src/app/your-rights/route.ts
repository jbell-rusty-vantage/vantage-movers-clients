import { NextResponse } from "next/server";

const RIGHTS_PDF =
  "https://www.fmcsa.dot.gov/sites/fmcsa.dot.gov/files/docs/Rights-and-Responsibilities-2013.pdf";

/** Clean URL for the FMCSA "Your Rights and Responsibilities" PDF. */
export function GET() {
  return NextResponse.redirect(RIGHTS_PDF);
}
