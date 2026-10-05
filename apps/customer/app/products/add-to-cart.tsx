"use client";

import type { Product } from "@repo/types";
import { useCart } from "../../hooks/use-cart";

type AddToCartProps = {
  product: Product;
};

export function AddToCart({ product }: AddToCartProps) {
  const { addItem, isLoading } = useCart();

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={() => addItem(product)}
    >
      Add to Cart
    </button>
  );
}