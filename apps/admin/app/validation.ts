import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters"),

  price: z.coerce
    .number()
    .positive("Price must be greater than 0"),
});