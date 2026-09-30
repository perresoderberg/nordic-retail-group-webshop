import type { Cart } from "./types";
const CART_STORAGE_KEY = "nordic-retail-group-cart";

/* Only deals with persistence in localStorage. */

export function getStoredCart(): Cart {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  console.log("cart-storage.ts -> getStoredCart - storedCart:", storedCart);

  if (!storedCart) {
    return { items: [] };
  }

  return JSON.parse(storedCart) as Cart;
}

export function saveCart(cart: Cart): void {
  console.log("cart-storage.ts -> saveCart - cart:", cart);

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function clearStoredCart(): void {
  console.log(
    "cart-storage.ts -> clearStoredCart - remove item with this key:",
    CART_STORAGE_KEY,
  );

  localStorage.removeItem(CART_STORAGE_KEY);
}
