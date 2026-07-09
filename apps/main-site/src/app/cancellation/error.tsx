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
      title="Cancellation policy did not load."
      message="We could not load the cancellation policy. Please try again or return home."
      error={error}
      errorContext="cancellation page"
      reset={reset}
    />
  );
}
