"use client";

import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import {
  ChartBarSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DashboardIcon,
  ListBulletIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";

const navLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon className='h-4 w-4 mr-2' />,
  },
  {
    label: "My Listings",
    path: "/listings",
    icon: <ListBulletIcon className='h-4 w-4 mr-2' />,
  },
  {
    label: "Reviews",
    path: "/reviews",
    icon: <ReaderIcon className='h-4 w-4 mr-2' />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <UserCircleIcon className='h-4 w-4 mr-2' />,
  },
];

function SideNavLinks() {
  const segment = useSelectedLayoutSegment();

  return (
    <ul className='space-y-2'>
      {navLinks.map((navItem) => (
        <li key={navItem.label}>
          <Link
            href={navItem.path}
            className={cn(
              buttonVariants({
                variant: navItem.path.includes(segment!) ? "light" : "ghost",
              }),
              "w-full justify-start shadow-none"
            )}
          >
            <span>{navItem.icon}</span>
            {navItem.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SideNavLinks;
