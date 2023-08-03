import Link from "next/link";

import AuthButtonsServer from "./auth-buttons-server";

function Header() {
  return (
    <header className='border'>
      <div className='container max-w-7xl py-6 flex items-center justify-between'>
        <Link href='/'>Church Finder PH</Link>
        <AuthButtonsServer />
      </div>
    </header>
  );
}

export default Header;
