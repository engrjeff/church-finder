import React from "react";

import SideNavLinks from "./SideNavLinks";

function UserPageSideBar() {
  return (
    <div className='w-[240px] h-full border-r fixed inset-y-0 bg-background'>
      <div className='border-b h-16 flex items-center px-4'>
        <span className='uppercase font-semibold'>Church Finder PH</span>
      </div>
      <nav className='px-4'>
        <span className='text-xs uppercase tracking-wide text-muted-foreground py-3 flex'>
          Menu
        </span>
        <SideNavLinks />
      </nav>
    </div>
  );
}

export default UserPageSideBar;
