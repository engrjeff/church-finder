"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  type Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { type Profile } from "@/lib/entity.types";

import { Button, buttonVariants } from "@/components/ui/button";
import UserNav from "./user-nav";

function AuthButtonsClient({
  session,
  profile,
}: {
  session: Session | null;
  profile: Profile | null;
}) {
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (!session) return <Button onClick={handleSignIn}>Sign In</Button>;

  return (
    <div className='flex items-center gap-6'>
      <div className='flex items-center'>
        <Link className={buttonVariants({ variant: "ghost" })} href='/'>
          Browse Churches
        </Link>
        <Link
          className={buttonVariants({ variant: "ghost" })}
          href='/dashboard'
        >
          Dashboard
        </Link>
      </div>
      <UserNav profile={profile} onLogout={handleLogout} />
    </div>
  );
}

export default AuthButtonsClient;
