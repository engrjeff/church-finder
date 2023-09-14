"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { CircleIcon } from "@radix-ui/react-icons";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ChurchFormStepItem = ({
  stepItem,
  isCompleted,
}: {
  stepItem: { step: string; label: string };
  isCompleted?: boolean;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStep = searchParams.get("step");
  const currentListingId = searchParams.get("id");

  const isActive = currentStep === stepItem.step;

  const isEdit = pathname === "/listings/edit";

  return (
    <li
      className={cn(
        "pb-6 z-[5] relative after:-z-[4] after:absolute after:w-[2px] after:h-12 after:bg-muted after:left-[25px] after:top-7 after:last-of-type:hidden",
        !isEdit ? "pointer-events-none opacity-70 cursor-not-allowed" : ""
      )}
    >
      <Link
        href={{
          pathname: isEdit ? "/listings/edit" : "/listings/new",
          query: {
            step: stepItem.step,
            ...(isEdit && { id: currentListingId }),
          },
        }}
        className={cn(
          buttonVariants({
            variant: isActive ? "secondary" : "ghost",
          }),
          "w-full justify-start text-foreground"
        )}
      >
        {isCompleted ? (
          <CheckCircleIcon className='h-5 w-5 mr-3 text-green-500' />
        ) : (
          <span>
            {isActive ? (
              <CircleIcon className='h-5 w-5 mr-3 text-green-500' />
            ) : (
              <CircleIcon className='h-5 w-5 mr-3 text-muted-foreground' />
            )}
          </span>
        )}
        {stepItem.label}
      </Link>
    </li>
  );
};

export default ChurchFormStepItem;
