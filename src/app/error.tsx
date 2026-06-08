"use client";

import { useEffect } from "react";
import { telHref } from "@/lib/format";
import { site } from "@/content/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        <a className="btn btn--gold" href={telHref(site.phone)}>
          Call {site.phone}
        </a>
      </div>
    </div>
  );
}
