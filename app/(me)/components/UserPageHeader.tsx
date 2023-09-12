"use client";

import React from "react";
import { useSession } from "next-auth/react";

import UserMenu from "./UserMenu";

function UserPageHeader() {
  const session = useSession();

  if (!session || !session.data?.user) return null;

  return (
    <header className='sticky top-0 border-b h-16 bg-background px-4 z-20'>
      <div className='h-full flex items-center justify-between'>
        <span className='font-medium'>Welcome, {session.data?.user.name}!</span>
        <UserMenu />
      </div>
    </header>
  );
}

export default UserPageHeader;
