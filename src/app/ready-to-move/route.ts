import { NextResponse } from "next/server";

/** Clean URL for the FMCSA "Ready To Move?" brochure PDF. */
export function GET(req: Request) {
  return NextResponse.redirect(
    new URL("/pdfs/Ready_To_Move_Brochure_2006.pdf", req.url),
  );
}
