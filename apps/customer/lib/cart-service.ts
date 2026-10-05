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

export function getCart(userId: string): Cart {
  return (
    findCart(userId) ?? {
      items: [],
      total: 0,
    }
  );
}

export function addItem(
  userId: string,
  productId: string,
  quantity: number
): Cart {
  const cart = getCart(userId);

  const existingItem = cart.items.find(
    (item) => item.product.id === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const product = findProduct(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }


    cart.items.push({
      product,
      quantity,
    });
  }

  cart.total = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  saveCart(userId, cart);

  return cart;
}

export function mergeCart(
  userId: string,
  guestItems: {
    productId: string;
    quantity: number;
  }[]
): Cart {
  const cart = getCart(userId);

  for (const guestItem of guestItems) {
    const product = findProduct(guestItem.productId);

    if (!product) {
      continue;
    }

    const existingItem = cart.items.find(
      (item) => item.product.id === guestItem.productId
    );

    const existingQuantity =
      existingItem?.quantity ?? 0;

    const requestedQuantity =
      existingQuantity + guestItem.quantity;

    const finalQuantity = Math.min(
      requestedQuantity,
      product.stock
    );

    if (existingItem) {
      existingItem.quantity = finalQuantity;
    } else {
      cart.items.push({
        product,
        quantity: finalQuantity,
      });
    }
  }

  cart.total = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  saveCart(userId, cart);

  return cart;
}

export function clearCart(userId: string) {
  deleteCart(userId);
}

export function updateItem(
  userId: string,
  productId: string,
  quantity: number
): Cart {
  const cart = getCart(userId);

  const item = cart.items.find(
    (item) => item.product.id === productId
  );

  if (!item) {
    throw new Error("Product is not in cart");
  }

  if (quantity === 0) {
    cart.items = cart.items.filter(
      (item) => item.product.id !== productId
    );
  } else {
    item.quantity = quantity;
  }

  cart.total = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  saveCart(userId, cart);

  return cart;
}

export function removeItem(
  userId: string,
  productId: string
): Cart {
  const cart = getCart(userId);

  const itemExists = cart.items.some(
    (item) => item.product.id === productId
  );

  if (!itemExists) {
    throw new Error("Product is not in cart");
  }

  cart.items = cart.items.filter(
    (item) => item.product.id !== productId
  );

  cart.total = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  saveCart(userId, cart);

  return cart;
}
