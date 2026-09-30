import {
  clearStoredCart,
  getStoredCart,
  saveCart as saveStoredCart,
} from "./cart-storage";
import type { Cart, CartItem } from "./types";

/* This is your cart business logic. */

export function getCart(): Cart {
  return getStoredCart();
}

export function addToCart(item: Omit<CartItem, "quantity">): Cart {
  const cart = getCart();

  console.log("cart-service.ts -> addToCart - get ALL cart-items=", cart.items);

  const existingItem = cart.items.find(
    (cartItem) => cartItem.productId === item.productId,
  );

  console.log(
    "  cart-service.ts -> Find item if it already exists in cart:",
    existingItem,
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

  console.log(
    "  cart-service.ts -> Update cart. the quantity should increase OR a new item has been added. updatedCart:",
    updatedCart,
  );

  saveStoredCart(updatedCart);

  return updatedCart;
}

export function removeFromCart(productId: number): Cart {
  const cart = getCart();

  const updatedCart: Cart = {
    items: cart.items.filter((item) => item.productId !== productId),
  };

  console.log(
    "  cart-service.ts -> removeFromCart - want to remove id:",
    productId,
    ", The updated cart:",
    updatedCart,
  );
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
