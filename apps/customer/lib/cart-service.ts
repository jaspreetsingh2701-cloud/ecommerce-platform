// import type { Cart } from "@repo/types";

// const carts = new Map<string, Cart>();

// export function getCart(userId: string): Cart {
//   return carts.get(userId) ?? {
//     items: [],
//     total: 0,
//   };
// }

// export function saveCart(userId: string, cart: Cart) {
//   carts.set(userId, cart);
// }

// export function clearCart(userId: string) {
//   carts.delete(userId);
// }

// export function addItem(
//   userId: string,
//   productId: string,
//   quantity: number
// ): Cart {
//   const cart = getCart(userId);

//   const existingItem = cart.items.find(
//     (item) => item.product.id === productId
//   );

//   if (existingItem) {
//     existingItem.quantity += quantity;
//   } else {
//     // Temporary product lookup.
//     // Later this will come from MongoDB.
//     const product = {
//       id: productId,
//       name: "Demo Product",
//       description: "Demo product",
//       price: 1000,
//       image: "",
//       category: "Demo",
//       stock: 10,
//     };

//     cart.items.push({
//       product,
//       quantity,
//     });
//   }

//   cart.total = cart.items.reduce(
//     (total, item) =>
//       total + item.product.price * item.quantity,
//     0
//   );

//   saveCart(userId, cart);

//   return cart;
// }

// 
import type { Cart } from "@repo/types";
import { findProduct } from "./product-repository";
import {
  findCart,
  saveCart,
  deleteCart,
} from "./cart-repository";

// Get the user's cart from Redis or return an empty typed cart.
export async function getCart(userId: string): Promise<Cart> {
  // Find the existing cart in Redis.
  const existingCart: Cart | null = await findCart(userId);

  // Create a typed empty cart when no cart exists.
  const cart: Cart = existingCart ?? {
    items: [],
    total: 0,
  };

  // Return the user's cart.
  return cart;
}

// Add a product to the user's cart.
export async function addItem(
  userId: string,
  productId: string,
  quantity: number
): Promise<Cart> {
  // Load the cart from Redis.
  const cart: Cart = await getCart(userId);

  // Find the product already present in the cart.
  const existingItem = cart.items.find(
    (item) => item.product.id === productId
  );

  if (existingItem) {
    // Increase the existing quantity.
    existingItem.quantity += quantity;
  } else {
    // Find the product in our product repository.
    const product = findProduct(productId);

    // Stop when the product does not exist.
    if (!product) {
      throw new Error("Product not found");
    }

    // Prevent adding more items than available stock.
    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    // Add the product to the cart.
    cart.items.push({
      product,
      quantity,
    });
  }

  // Recalculate the cart total.
  cart.total = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  // Persist the updated cart in Redis.
  await saveCart(userId, cart);

  // Return the updated cart.
  return cart;
}

// Merge guest cart items into the user's cart.
export async function mergeCart(
  userId: string,
  guestItems: {
    productId: string;
    quantity: number;
  }[]
): Promise<Cart> {
  // Load the user's existing cart.
  const cart: Cart = await getCart(userId);

  // Process every guest cart item.
  for (const guestItem of guestItems) {
    // Find the product.
    const product = findProduct(guestItem.productId);

    // Ignore products that no longer exist.
    if (!product) {
      continue;
    }

    // Check whether the product already exists in the user's cart.
    const existingItem = cart.items.find(
      (item) => item.product.id === guestItem.productId
    );

    // Read the current quantity or use zero.
    const existingQuantity: number =
      existingItem?.quantity ?? 0;

    // Calculate the requested final quantity.
    const requestedQuantity: number =
      existingQuantity + guestItem.quantity;

    // Never exceed the available product stock.
    const finalQuantity: number = Math.min(
      requestedQuantity,
      product.stock
    );

    if (existingItem) {
      // Update the existing cart item quantity.
      existingItem.quantity = finalQuantity;
    } else {
      // Add the guest item to the user's cart.
      cart.items.push({
        product,
        quantity: finalQuantity,
      });
    }
  }

  // Recalculate the cart total.
  cart.total = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  // Persist the merged cart in Redis.
  await saveCart(userId, cart);

  // Return the merged cart.
  return cart;
}

// Remove the user's cart from Redis.
export async function clearCart(userId: string): Promise<void> {
  // Delete the cart from Redis.
  await deleteCart(userId);
}

// Update the quantity of an existing cart item.
export async function updateItem(
  userId: string,
  productId: string,
  quantity: number
): Promise<Cart> {
  // Load the user's cart.
  const cart: Cart = await getCart(userId);

  // Find the requested cart item.
  const item = cart.items.find(
    (item) => item.product.id === productId
  );

  // Stop when the product is not in the cart.
  if (!item) {
    throw new Error("Product is not in cart");
  }

  if (quantity === 0) {
    // Remove the item when quantity becomes zero.
    cart.items = cart.items.filter(
      (item) => item.product.id !== productId
    );
  } else {
    // Update the requested quantity.
    item.quantity = quantity;
  }

  // Recalculate the cart total.
  cart.total = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  // Persist the updated cart in Redis.
  await saveCart(userId, cart);

  // Return the updated cart.
  return cart;
}

// Remove a product completely from the cart.
export async function removeItem(
  userId: string,
  productId: string
): Promise<Cart> {
  // Load the user's cart.
  const cart: Cart = await getCart(userId);

  // Check whether the product exists in the cart.
  const itemExists: boolean = cart.items.some(
    (item) => item.product.id === productId
  );

  // Stop when the product is not in the cart.
  if (!itemExists) {
    throw new Error("Product is not in cart");
  }

  // Remove the product from the cart.
  cart.items = cart.items.filter(
    (item) => item.product.id !== productId
  );

  // Recalculate the cart total.
  cart.total = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  // Persist the updated cart in Redis.
  await saveCart(userId, cart);

  // Return the updated cart.
  return cart;
}

