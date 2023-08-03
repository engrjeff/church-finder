import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthButtonsClient from "./auth-buttons-client";

export default async function AuthButtonsServer() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("id", session?.user.id)
    .single();

  return <AuthButtonsClient session={session} profile={profile} />;
}
