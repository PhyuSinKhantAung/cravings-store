"use server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUserByEmail } from "@/app/actions";
// import * as argon from "argon2";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user) return null;
          const isValidPassword = await bcrypt.compare(password, user.password);
          console.log({ isValidPassword, user });
          if (!isValidPassword) return null;
          return user as any;
        }

        return null;
      },
    }),
  ],
});
