import Link from "next/link";

import ChurchFormSteps from "@/components/church-form-steps";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { buttonVariants } from "@/components/ui/button";

function NewChurchFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex gap-6 border-b pb-4'>
        <Link
          href='/me/listings'
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <span className='sr-only'>Back to listings</span>
          <ArrowLeftIcon className='h-4 w-4' />
        </Link>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>
            New Church Listing
          </h2>
          <p className='text-muted-foreground'>
            Fill out the form to create a new church listing.
          </p>
        </div>
      </div>
      <div className='flex py-4 flex-1'>
        <ChurchFormSteps />
        <div className='px-6 flex-1'>{children}</div>
      </div>
    </>
  );
}

export default NewChurchFormLayout;
