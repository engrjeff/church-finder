"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const formSteps = [
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

function ChurchFormStepLinks() {
  const searchParams = useSearchParams();

  const currentStep = searchParams.get("step")
    ? searchParams.get("step")
    : "basic-info";

  return (
    <ul className='space-y-2'>
      {formSteps.map((item) => (
        <li key={item.label}>
          <Link
            className={cn(
              buttonVariants({
                variant: currentStep === item.step ? "secondary" : "ghost",
              }),
              "w-full justify-start"
            )}
            href={{
              pathname: "/my-church/new",
              query: {
                step: item.step,
              },
            }}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ChurchFormStepLinks;
