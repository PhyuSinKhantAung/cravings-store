import { zfd } from "zod-form-data";
import { z } from "zod";

export const signupSchema = zfd.formData({
  name: zfd.text(z.string().min(1, "Too short")),
  email: zfd.text(z.string().email()),
  password: zfd.text(
    z.string().min(1, "Password is too short, minimum 6 characters")
  ),
});
