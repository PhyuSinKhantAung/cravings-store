import { z } from "zod";
import { zfd } from "zod-form-data";

export const checkoutSchema = zfd.formData({
  name: zfd.text(
    z
      .string({
        required_error: "Name is required",
      })
      .min(1, { message: "Name is required" })
  ),

  address: zfd.text(
    z
      .string({
        required_error: "Address is required",
      })
      .min(1, { message: "Address is required" })
  ),
});

export type CheckOutSchemaType = z.infer<typeof checkoutSchema>;
