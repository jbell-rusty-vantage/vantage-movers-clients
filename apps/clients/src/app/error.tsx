"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { telHref } from "@/lib/format";
import { site } from "@/content/site";
import { resolvePartner } from "@/content/partners";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const phoneNumber = resolvePartner(pathname).phone ?? site.phone;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="statepage">
      <h1>Something went wrong</h1>
      <p>
        We hit an unexpected error loading this page. Please try again, or call us and a moving
        specialist will help you right away.
      </p>
      <div className="statepage__actions">
        <button className="btn" onClick={reset}>
          Try again
        </button>
        <a className="btn btn--gold" href={telHref(phoneNumber)}>
          Call {phoneNumber}
        </a>
      </div>
    </div>
  );
}
