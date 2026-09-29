import type { Cart } from "./types";

const CART_STORAGE_KEY = "nordic-retail-group-cart";

export function getStoredCart(): Cart {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return {
      items: [],
    };
  }

  try {
    return JSON.parse(storedCart) as Cart;
  } catch (error) {
    console.error(
      `Failed to parse cart from localStorage key "${CART_STORAGE_KEY}".`,
      error,
    );

    throw error;
  }
}

export function saveCart(cart: Cart): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function clearStoredCart(): void {
  localStorage.removeItem(CART_STORAGE_KEY);
}
