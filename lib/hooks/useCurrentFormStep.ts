"use client";

import { useSearchParams } from "next/navigation";

export default function useCurrentFormStep() {
  const searchParams = useSearchParams();

  const currentStep = searchParams.get("step");

  return currentStep;
}
