"use client";

import { ErrorState } from "@/components/feedback/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Terms did not load."
      message="We could not load the terms and conditions. Please try again or return home."
      error={error}
      errorContext="terms page"
      reset={reset}
    />
  );
}
