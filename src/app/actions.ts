"use server";
import { SignUpFormValues } from "@/app/components/auth/SignupForm";
import prisma from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  console.log("here i reached");
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  console.log({ user });

  return user;
};

export type SignupState =
  | {
      id: number;
      name: string;
      email: string;
      password: string;
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

    const user = await getUserByEmail(payload.email);

    if (user) throw new Error("User already existed");

    return await prisma.user.create({
      data: payload,
    });
  } catch (error) {
    console.log(error);
  }
};
