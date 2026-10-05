// import { getRedis } from "../../../lib/redis";

// // Test endpoint that verifies runtime Redis connectivity
// export async function GET() {
//   // Connect to Redis when the HTTP request arrives
//   const redis = await getRedis();

//   // Store a test value
//   await redis.set("docker-test", "Redis is working!");

//   // Read the value back
//   const value = await redis.get("docker-test");

//   // Return the Redis value
//   return Response.json({ value });
// }

// Import the Redis-backed cart repository.
import {
  findCart,
  saveCart,
  deleteCart,
} from "../../../lib/cart-repository";

// Test saving, reading, and deleting a cart in Redis.
export async function GET() {
  // Use a fixed test user so we can inspect the same Redis key repeatedly.
  const userId = "redis-test-user";

  // Create a small test cart.
  const cart: any = {
    userId,
    items: [
      {
        productId: "1",
        quantity: 2,
      },
    ],
  };

  // Save the cart to Redis.
  await saveCart(userId, cart);

  // Read the cart back from Redis.
  const savedCart = await findCart(userId);

  // Remove the test cart so it does not remain in Redis.
  await deleteCart(userId);

  // Return what Redis successfully stored and retrieved.
  return Response.json({
    savedCart,
  });
}