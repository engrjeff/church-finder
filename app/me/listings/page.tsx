import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function ListingsPage() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Your Listings</h2>
          <p className='text-muted-foreground'>
            Manage your church listing here.
          </p>
        </div>
        <div>
          <Link
            href={{ pathname: "listings/new", query: { step: "basic-info" } }}
            className={buttonVariants()}
          >
            + Add Listing
          </Link>
        </div>
      </div>
    </>
  );
}

export default ListingsPage;
