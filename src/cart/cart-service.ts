import {
  clearStoredCart,
  getStoredCart,
  saveCart as saveStoredCart,
} from "./cart-storage";
import type { Cart, CartItem } from "./types";

export function getCart(): Cart {
  return getStoredCart();
}

export function addToCart(item: Omit<CartItem, "quantity">): Cart {
  const cart = getCart();

  const existingItem = cart.items.find(
    (cartItem) => cartItem.productId === item.productId,
  );

  const updatedCart: Cart = existingItem
    ? {
        items: cart.items.map((cartItem) =>
          cartItem.productId === item.productId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem,
        ),
      }
    : {
        items: [
          ...cart.items,
          {
            ...item,
            quantity: 1,
          },
        ],
      };

  saveStoredCart(updatedCart);

  return updatedCart;
}

export function removeFromCart(productId: number): Cart {
  const cart = getCart();

  const updatedCart: Cart = {
    items: cart.items.filter((item) => item.productId !== productId),
  };

  saveStoredCart(updatedCart);

  return updatedCart;
}

export function updateCartQuantity(productId: number, quantity: number): Cart {
  if (quantity <= 0) {
    return removeFromCart(productId);
  }

  const cart = getCart();

  const updatedCart: Cart = {
    items: cart.items.map((item) =>
      item.productId === productId
        ? {
            ...item,
            quantity,
          }
        : item,
    ),
  };

  saveStoredCart(updatedCart);

  return updatedCart;
}

export function clearCart(): void {
  clearStoredCart();
}
