import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce
    .number()
    .int()
    .positive()
    .max(10),
});

export const updateCartSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce
    .number()
    .int()
    .min(0)
    .max(10),
});

export const removeCartSchema = z.object({
  productId: z.string().min(1),
});

export const mergeCartSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.coerce
        .number()
        .int()
        .positive()
    })
  ),
});