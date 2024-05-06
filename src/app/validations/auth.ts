import { zfd } from "zod-form-data";
import { z } from "zod";

export const signupSchema = zfd.formData({
  name: zfd.text(
    z
      .string({ required_error: "Name is required" })
      .trim()
      .min(1, { message: "Name is required" })
  ),
  email: zfd.text(
    z
      .string({ required_error: "Email is required" })
      .email({ message: "Email is invalid" })
      .min(1, { message: "Email is required" })
  ),
  password: zfd.text(
    z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password is too short, minimum 6 characters" })
  ),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const loginSchema = zfd.formData({
  email: zfd.text(
    z
      .string({ required_error: "Email is required" })
      .email()
      .min(1, { message: "Email is required" })
  ),
  password: zfd.text(
    z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password is too short, mininum 6 characters" })
  ),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
