"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignupSchemaType } from "./validations/auth";
import { AuthError } from "next-auth";
import { signIn } from "../auth";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export type State =
  | {
      status: string;
      message: string;
    }
  | null
  | undefined;

export const signup = async (
  prevState: State | null,
  data: FormData
): Promise<State> => {
  try {
    const payload = {
      ...Object.fromEntries(data),
    } as unknown as SignupSchemaType;

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

export async function authenticate(
  prevState: State | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
    return {
      status: "success",
      message: "Login successfully",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("here catch");
      let state = {
        status: "error",
        message: "Something went wrong",
      };
      switch (error.type) {
        case "CredentialsSignin":
          state.message = "Invalid credentails";
          return state;
        default:
          return state;
      }
    }
    throw error;
  }
}
