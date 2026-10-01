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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => getCart().items);

  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);

  function addItem(item: Omit<CartItem, "quantity">) {
    const cart = addToCart(item);

    setItems(cart.items);

    const addedItem = cart.items.find(
      (cartItem) => cartItem.productId === item.productId,
    );

    if (addedItem) {
      setLastAddedItem(addedItem);
      setIsAddedModalOpen(true);
    }
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

  function closeAddedModal() {
    setIsAddedModalOpen(false);
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

        lastAddedItem,
        isAddedModalOpen,
        closeAddedModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
