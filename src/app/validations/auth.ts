import { zfd } from "zod-form-data";
import { z } from "zod";

export const signupSchema = zfd.formData({
  name: zfd.text(
    z
      .string({ required_error: "name is required" })
      .trim()
      .min(1, { message: "name is required" })
  ),
  email: zfd.text(
    z
      .string({ required_error: "email is required" })
      .email({ message: "Email is invalid" })
      .min(1, { message: "email is required" })
  ),
  password: zfd.text(
    z
      .string({ required_error: "password is required" })
      .min(6, { message: "Password is too short, minimum 6 characters" })
  ),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
