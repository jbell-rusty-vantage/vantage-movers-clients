import { NextResponse } from "next/server";

/** Clean URL for the FMCSA "Your Rights and Responsibilities" PDF. */
export function GET(req: Request) {
  return NextResponse.redirect(
    new URL("/pdfs/Rights-and-Responsibilities-2013.pdf", req.url),
  );
}
