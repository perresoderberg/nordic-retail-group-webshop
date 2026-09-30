import { useContext } from "react";
import { CartContext } from "./CartContext";

/* Provides an easy way for components to access CartContext */
/*
  Instead of writing
    const context = useContext(CartContext);
  You can write
    const { itemCount } = useCart();
*/

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
