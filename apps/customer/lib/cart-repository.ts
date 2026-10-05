import type { Cart } from "@repo/types";
import { getRedis } from "./redis";

// const carts = new Map<string, Cart>();

// export function findCart(userId: string): Cart | null {
//   return carts.get(userId) ?? null;
// }

// export function saveCart(userId: string, cart: Cart) {
//   carts.set(userId, cart);
// }

// export function deleteCart(userId: string) {
//   carts.delete(userId);
// }

// Build a unique Redis key for each user's cart.
function getCartKey(userId: string) {
  return `cart:${userId}`;
}

// Read a cart from Redis.
export async function findCart(userId: string): Promise<Cart | null> {
  const redis = await getRedis();

  // Fetch the serialized cart stored under the user's key.
  const cart = await redis.get(getCartKey(userId));

  // Return null when the user has no cart yet.
  if (!cart) {
    return null;
  }

  // Convert the JSON string back into a Cart object.
  return JSON.parse(cart) as Cart;
}

// Save a cart to Redis.
export async function saveCart(userId: string, cart: Cart) {
  const redis = await getRedis();

  // Store only the cart data and overwrite the previous version.
  await redis.set(getCartKey(userId), JSON.stringify(cart));
}

// Delete a user's cart from Redis.
export async function deleteCart(userId: string) {
  const redis = await getRedis();

  // Remove the cart completely from Redis.
  await redis.del(getCartKey(userId));
}