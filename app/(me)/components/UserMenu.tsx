"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

export default function UserMenu() {
  const profile = {
    avatar_url: "https://jeffsegovia.dev/me.jpg",
    name: "Jeff Segovia",
    email: "jeff@sample.com",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative px-0 rounded-full p-2 select-none'
        >
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={profile.avatar_url}
              alt={profile.name}
              className='object-cover'
            />
            <AvatarFallback>
              {profile.name
                .split(" ")
                .map((a) => a.charAt(0))
                .join("")}
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon className='h-4 w-4 ml-3' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{profile.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {profile.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/profile'>My Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/'>Browse Churches</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}