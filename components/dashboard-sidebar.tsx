"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { useSelectedLayoutSegment } from "next/navigation";

const links = [
  {
    label: "Dashboard",
    path: "/me",
  },
  {
    label: "My Listings",
    path: "/me/listings",
  },
  {
    label: "Reviews",
    path: "/me/reviews",
  },
  {
    label: "Profile",
    path: "/me/profile",
  },
];

function DashboardSideBar() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className='bg-zinc-950 text-white flex flex-col h-full'>
      <span className='h-20 flex items-center justify-center border-b border-zinc-900'>
        Church Finder PH
      </span>
      <nav className='p-4'>
        <ul className='space-y-2'>
          {links.map((item, index) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className={cn(
                  buttonVariants({
                    variant:
                      index === 0
                        ? !segment
                          ? "default"
                          : "ghost"
                        : item.path.includes(segment!)
                        ? "default"
                        : "ghost",
                  }),
                  "w-full justify-start"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default DashboardSideBar;
