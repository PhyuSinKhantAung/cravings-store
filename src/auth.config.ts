import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    // signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log({ isLoggedIn, user: auth?.user });
      const isOnProtectedRoute =
        nextUrl.pathname.startsWith("/checkout") ||
        nextUrl.pathname.startsWith("/orders");
      if (isOnProtectedRoute) {
        if (isLoggedIn) {
          return true;
        } else {
          return false;
        }
      }
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL("/", nextUrl));
      // }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
