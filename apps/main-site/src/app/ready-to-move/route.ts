import { NextResponse } from "next/server";

const READY_TO_MOVE_PDF = "/pdfs/Ready_To_Move_Brochure_2006.pdf";

/** Clean URL for the FMCSA "Ready To Move?" brochure PDF. */
export function GET(request: Request) {
  return NextResponse.redirect(new URL(READY_TO_MOVE_PDF, request.url));
}
