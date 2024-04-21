import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, url } }) {
      const isLoggedIn = !!auth?.user;
      console.log({
        isLoggedIn,
        user: auth?.user,
        nextUrl,
        isLoggedinPage: nextUrl.pathname === "/login",
      });
      const isOnProtectedRoute =
        nextUrl.pathname.startsWith("/checkout") ||
        nextUrl.pathname.startsWith("/orders");
      if (isOnProtectedRoute) {
        if (isLoggedIn) {
          return true;
        } else {
          return false;
        }
      } else if (isLoggedIn && nextUrl.pathname === "/login") {
        const url = nextUrl.clone();
        url.pathname = "/";
        return NextResponse.rewrite(url);
        // return NextResponse.rewrite(new URL("/menus", url));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
