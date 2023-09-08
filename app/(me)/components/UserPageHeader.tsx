import React from "react";

import UserMenu from "./UserMenu";

function UserPageHeader() {
  return (
    <header className='sticky top-0 border-b h-16 bg-background px-4'>
      <div className='h-full flex items-center justify-between'>
        <span className='font-medium'>Welcome, Jeff Segovia!</span>
        <UserMenu />
      </div>
    </header>
  );
}

export default UserPageHeader;
