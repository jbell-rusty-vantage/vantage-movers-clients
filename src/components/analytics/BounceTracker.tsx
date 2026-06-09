"use client";

import { useEffect } from "react";
import { initializeBounceTracking } from "@/lib/analytics";

export function BounceTracker() {
  useEffect(() => initializeBounceTracking(), []);

  return null;
}
