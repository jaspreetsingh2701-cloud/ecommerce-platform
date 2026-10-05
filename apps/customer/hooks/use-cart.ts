"use client";

import { useSession } from "next-auth/react";
import { useCartStore } from "./../app/store/cart-store";
import type { Product, Cart } from "@repo/types";

export function useCart() {
  const { status } = useSession();

  const items = useCartStore((state) => state.items);
  const addGuestItem = useCartStore((state) => state.addItem);
  const removeGuestItem = useCartStore(
    (state) => state.removeItem
  );
  const updateGuestQuantity = useCartStore(
    (state) => state.updateQuantity
  );
  const clearGuestCart = useCartStore(
    (state) => state.clearCart
  );
  const setItems = useCartStore((state) => state.setItems);

  const addItem = async (product: Product) => {
    if (status === "unauthenticated") {
      addGuestItem(product);
      return;
    }

    if (status !== "authenticated") {
      return;
    }

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: 1,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to add item");
    }

    const cart: Cart = await response.json();

    setItems(cart.items);
  };

  const removeItem = async (productId: string) => {
    if (status === "unauthenticated") {
      removeGuestItem(productId);
      return;
    }

    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      throw new Error("Unable to remove item");
    }

    const cart: Cart = await response.json();

    setItems(cart.items);
  };

  const updateQuantity = async (
    productId: string,
    quantity: number
  ) => {
    if (status === "unauthenticated") {
      updateGuestQuantity(productId, quantity);
      return;
    }

    const response = await fetch("/api/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to update cart");
    }

    const cart: Cart = await response.json();

    setItems(cart.items);
  };

  const clearCart = async () => {
    if (status === "unauthenticated") {
      clearGuestCart();
      return;
    }

    const response = await fetch("/api/cart/all", {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Unable to clear cart");
    }

    clearGuestCart();
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}