import React from "react";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { nextAUthOptions } from "@/lib/auth";

const Navbar = async () => {
  const session = await getServerSession(nextAUthOptions);

  return (
    <div className='flex gap-2 p-4'>
      {session?.user ? (
        <>
          <Link
            href='/dashboard'
            className={buttonVariants({ variant: "ghost" })}
          >
            Dashboard
          </Link>
        </>
      ) : (
        <>
          <Link href='/signin' className={buttonVariants({ variant: "ghost" })}>
            Sign In
          </Link>
        </>
      )}
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
};

export default Navbar;
