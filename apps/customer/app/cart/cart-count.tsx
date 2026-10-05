"use client";

import { useCartStore } from "../store/cart-store";

export function CartCount() {
  const items = useCartStore((state) => state.items);

  const count = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return <span>Cart ({count})</span>;
}