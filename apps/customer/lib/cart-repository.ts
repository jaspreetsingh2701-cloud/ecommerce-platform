import type { Cart } from "@repo/types";

const carts = new Map<string, Cart>();

export function findCart(userId: string): Cart | null {
  return carts.get(userId) ?? null;
}

export function saveCart(userId: string, cart: Cart) {
  carts.set(userId, cart);
}

export function deleteCart(userId: string) {
  carts.delete(userId);
}