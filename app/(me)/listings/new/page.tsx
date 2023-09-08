import React from "react";
import Link from "next/link";

import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import ChurchFormSteps from "../../components/ChurchFormSteps";
import ChurchForm from "../../components/ChurchForm";

function NewListingPage() {
  return (
    <>
      <div className='sticky top-16 flex items-center gap-2 h-14 py-2 bg-background px-4 border-b text-sm'>
        <Link
          href='/listings'
          className='flex items-center text-muted-foreground hover:text-foreground'
        >
          <span aria-hidden='true'>
            <ArrowLeftIcon className='h-4 w-4 mr-2' />
          </span>
          Back to list
        </Link>
        <Separator orientation='vertical' />
        <span className='font-medium'>New Church</span>
        <div className='ml-auto'>
          <Link href='/listings/new' className={buttonVariants()}>
            <CheckIcon className='h-4 w-4 mr-2' />
            Publish
          </Link>
        </div>
      </div>

      <div className='p-4'>
        <div className='bg-background rounded shadow-sm p-4'>
          <div className='pb-4 border-b'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              New Church Listing
            </h1>
            <p className='text-sm text-muted-foreground'>
              Create a new church listing here
            </p>
          </div>
          <div className='flex pt-4 gap-8'>
            <ChurchFormSteps />
            <ChurchForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewListingPage;
