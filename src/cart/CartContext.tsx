import { createContext } from "react";
import type { CartItem } from "./types";

/* Defines the contract for the shared cart state. */
/* If someone has access to the cart context, these are the things they can access. */
/* Used by CartProvider.tsx and useCart.ts */

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
