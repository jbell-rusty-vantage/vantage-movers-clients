import { NextResponse } from "next/server";

const READY_TO_MOVE_PDF =
  "https://www.fmcsa.dot.gov/sites/fmcsa.dot.gov/files/docs/Ready_To_Move_Brochure_2006.pdf";

/** Clean URL for the FMCSA "Ready To Move?" brochure PDF. */
export function GET() {
  return NextResponse.redirect(READY_TO_MOVE_PDF);
}
