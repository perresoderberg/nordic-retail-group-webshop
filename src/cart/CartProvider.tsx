import { useState } from "react";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "./cart-service";
import { CartContext } from "./CartContext";
import type { CartItem } from "./types";

/* Owns the actual React cart state and is the most important file for the shared state. */

/* The provider owns 'items', and when items changes, all components consuming this context can re-render. */
/* Exists in main.tsx */
/*  <CartProvider>
        <RouterProvider router={router} />
    </CartProvider>
*/

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => getCart().items);

  function addItem(item: Omit<CartItem, "quantity">) {
    const cart = addToCart(item);
    setItems(cart.items);
  }

  function removeItem(productId: number) {
    const cart = removeFromCart(productId);
    setItems(cart.items);
  }

  function setQuantity(productId: number, quantity: number) {
    const cart = updateCartQuantity(productId, quantity);
    setItems(cart.items);
  }

  function emptyCart() {
    clearCart();
    setItems([]);
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const total = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        addItem,
        removeItem,
        setQuantity,
        clearCart: emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
