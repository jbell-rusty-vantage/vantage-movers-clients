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
      title="Carrier contacts did not load."
      message="We could not load the carrier contacts page. Please try again or return home."
      error={error}
      errorContext="carrier contacts page"
      reset={reset}
    />
  );
}
