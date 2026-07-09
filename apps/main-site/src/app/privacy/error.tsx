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
      title="Privacy policy did not load."
      message="We could not load the privacy policy. Please try again or return home."
      error={error}
      errorContext="privacy page"
      reset={reset}
    />
  );
}
