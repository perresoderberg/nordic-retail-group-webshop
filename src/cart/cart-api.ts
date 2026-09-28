import { apiFetch } from "../services/api";
import type { Cart } from "./types";

export async function getCart(): Promise<Cart> {
  const response = await apiFetch("/api/cart");

  if (!response.ok) {
    throw new Error("Failed to fetch cart.");
  }

  return response.json();
}

export async function saveCart(cart: Cart): Promise<void> {
  const response = await apiFetch("/api/cart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });

  if (!response.ok) {
    throw new Error("Failed to save cart.");
  }
}

export async function deleteCart(): Promise<void> {
  const response = await apiFetch("/api/cart", {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete cart.");
  }
}
