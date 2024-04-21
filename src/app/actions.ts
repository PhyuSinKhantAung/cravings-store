"use server";
import { SignUpFormValues } from "@/app/components/auth/SignupForm";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export type SignupState =
  | {
      status: string;
      message: string;
    }
  | null
  | undefined;

export const signup = async (
  prevState: SignupState | null,
  data: FormData
): Promise<SignupState> => {
  try {
    const payload = {
      ...Object.fromEntries(data),
    } as unknown as SignUpFormValues;

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    const user = await getUserByEmail(payload.email);

    if (user) throw new Error("User already existed");

    await prisma.user.create({
      data: { ...payload, password: hashedPassword },
    });
    return {
      status: "success",
      message: "User created",
    };
  } catch (error) {
    const status = "error";
    let message = "Something went wrong";
    if (error instanceof Error) {
      console.error(error.stack);
      message = error.message;
    }
    return {
      status,
      message,
    };
  }
};
