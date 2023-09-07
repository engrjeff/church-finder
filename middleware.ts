import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return NextResponse.redirect(new URL("/", req.url));

  console.log(session);

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-church/:path*"],
};
