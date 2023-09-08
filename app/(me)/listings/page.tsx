import React from "react";

import Link from "next/link";

import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { buttonVariants } from "@/components/ui/button";

function MyListingPage() {
  return (
    <>
      <div className='flex items-center gap-2 h-14 bg-background pl-4 pr-8 border-b text-sm'>
        <span>
          <HomeIcon className='h-4 w-4' />
        </span>
        <Link href='/dashboard'>Home</Link>
        <span>/</span>
        <span>My Listings</span>
        <div className='ml-auto'>
          <Link
            href='/listings/new?step=basic-info'
            className={buttonVariants()}
          >
            <PlusIcon className='h-4 w-4 mr-2' />
            Add Church
          </Link>
        </div>
      </div>
      <div className='p-4'>
        <h1 className='text-2xl font-semibold tracking-tight'>My Listings</h1>
        <p className='text-sm text-muted-foreground'>
          View and manage your church listing here
        </p>
      </div>
    </>
  );
}

export default MyListingPage;
