"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useIsOnTop from "@/hooks/useIsOnTop";

function SiteNavigation() {
  const onTop = useIsOnTop(80);

  return (
    <div
      className={cn(
        "absolute top-0 inset-x-0 w-full bg-transparent transition-transform duration-500 z-20",
        {
          "fixed -top-20 translate-y-20 bg-zinc-950": !onTop,
        }
      )}
    >
      <nav className='text-white h-20 flex items-center justify-between px-6'>
        <div>CHURCH FINDER LOGO</div>
        <ul className='flex items-center gap-2'>
          <li>
            <Link href='/' className='px-4'>
              Browse Churches
            </Link>
          </li>
          <li>
            <Link href='/contact-us' className='px-4'>
              Contact Us
            </Link>
          </li>
          <li>
            <Link href='/about-us' className='px-4'>
              About Us
            </Link>
          </li>
        </ul>
        <div className='space-x-4'>
          <Link
            href='/me'
            className={cn(
              buttonVariants({ variant: "outline" }),
              "text-white bg-transparent"
            )}
          >
            + Add My Church
          </Link>
          <Link href='/signin' className={cn(buttonVariants())}>
            Sign In
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default SiteNavigation;
