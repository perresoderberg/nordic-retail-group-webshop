import { useEffect, useState } from "react";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "./cart-service";
import type { CartItem } from "./types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadCart() {
      try {
        setError(null);

        const cart = await getCart();

        setItems(cart.items);
      } catch (error) {
        const cartError =
          error instanceof Error ? error : new Error("Failed to load cart.");

        setError(cartError);
      } finally {
        setIsLoading(false);
      }
    }

    loadCart();
  }, []);

  async function addItem(item: Omit<CartItem, "quantity">) {
    const cart = await addToCart(item);

    setItems(cart.items);
  }

  async function removeItem(productId: number) {
    const cart = await removeFromCart(productId);

    setItems(cart.items);
  }

  async function setQuantity(productId: number, quantity: number) {
    const cart = await updateCartQuantity(productId, quantity);

    setItems(cart.items);
  }

  async function emptyCart() {
    await clearCart();

    setItems([]);
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const total = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return {
    items,
    itemCount,
    total,
    isLoading,
    error,
    addItem,
    removeItem,
    setQuantity,
    clearCart: emptyCart,
  };
}
