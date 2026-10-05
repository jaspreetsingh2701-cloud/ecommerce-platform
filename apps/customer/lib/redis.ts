import { createClient } from "redis";

// Create a Redis client but don't connect during the Docker build
const redis = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});

// Log connection problems without crashing the application silently
redis.on("error", (error) => {
  console.error("Redis Client Error", error);
});

// Connect only when the application actually needs Redis
export async function getRedis() {
  // Establish the connection at runtime, not during next build
  if (!redis.isOpen) {
    await redis.connect();
  }

  // Return the connected Redis client
  return redis;
}