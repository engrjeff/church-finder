"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
    <ul className='space-y-2'>
      {formSteps.map((item) => (
        <li key={item.step}>
          <Link
            href={{ pathname: "/listings/new", query: { step: item.step } }}
            className={cn(
              buttonVariants({
                variant: currentStep === item.step ? "secondary" : "link",
              }),
              "w-full justify-start text-foreground"
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ChurchFormSteps;
