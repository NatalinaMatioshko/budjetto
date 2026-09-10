import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth App Router handler.
 * @see https://next-auth.js.org/configuration/initialization#route-handlers-app
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
