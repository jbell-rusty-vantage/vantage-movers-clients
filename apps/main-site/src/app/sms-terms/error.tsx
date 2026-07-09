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
      title="SMS terms did not load."
      message="We could not load the SMS terms. Please try again or return home."
      error={error}
      errorContext="sms terms page"
      reset={reset}
    />
  );
}
