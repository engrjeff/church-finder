import NextAuth from "next-auth";

import { nextAUthOptions } from "@/lib/auth";

const handler = NextAuth(nextAUthOptions);

export { handler as GET, handler as POST };
