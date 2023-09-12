import React from "react";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

function HomePage() {
  return (
    <div className='flex gap-2 p-4'>
      <Link href='/signin' className={buttonVariants({ variant: "ghost" })}>
        Sign In
      </Link>
      <Link href='/dashboard' className={buttonVariants({ variant: "ghost" })}>
        Dashboard
      </Link>
      <Link
        href={{
          pathname: "/signin",
          query: {
            redirectTo: encodeURIComponent("/listings/new?step=basic-info"),
          },
        }}
        className={buttonVariants({ variant: "ghost" })}
      >
        Add My Church
      </Link>
    </div>
  );
}

export default HomePage;
