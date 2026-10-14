import type { Cart } from "./types";
const CART_STORAGE_KEY = "nordic-retail-group-cart";

/* Only deals with persistence in localStorage. */

export function getStoredCart(): Cart {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return { items: [] };
  }

  return JSON.parse(storedCart) as Cart;
}

export function saveCart(cart: Cart): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function clearStoredCart(): void {
  localStorage.removeItem(CART_STORAGE_KEY);
}
