"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buttonVariants } from "./ui/button";

export const formSteps = [
  {
    label: "Basic Info",
    step: "basic-info",
  },
  {
    label: "Church Profile",
    step: "church-profile",
  },
  {
    label: "Church Contact Info",
    step: "church-contact-info",
  },
  {
    label: "Pastor's Profile",
    step: "pastor-profile",
  },
  {
    label: "Media",
    step: "media",
  },
  {
    label: "Church Map",
    step: "church-map",
  },
];

function ChurchFormSteps() {
  const searchParams = useSearchParams();

  const currentStep = searchParams.get("step");

  return (
    <ul className='pr-4 space-y-2 h-full'>
      {formSteps.map((stepItem) => (
        <li key={stepItem.label}>
          <Link
            className={cn(
              buttonVariants({
                variant: currentStep === stepItem.step ? "secondary" : "ghost",
              }),
              "w-full justify-start"
            )}
            href={{
              query: {
                step: stepItem.step,
              },
            }}
          >
            {stepItem.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ChurchFormSteps;
