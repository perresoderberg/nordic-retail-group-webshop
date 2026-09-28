import { isAuthenticated } from "../services/auth";
import {
  getCart as getApiCart,
  saveCart as saveApiCart,
  deleteCart as deleteApiCart,
} from "./cart-api";
import {
  clearStoredCart,
  getStoredCart,
  saveCart as saveStoredCart,
} from "./cart-storage";
import type { Cart, CartItem } from "./types";

export async function getCart(): Promise<Cart> {
  if (await isAuthenticated()) {
    return getApiCart();
  }

  return getStoredCart();
}

export async function addToCart(
  item: Omit<CartItem, "quantity">,
): Promise<Cart> {
  const cart = await getCart();

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

  await saveCart(updatedCart);

  return updatedCart;
}

export async function removeFromCart(productId: number): Promise<Cart> {
  const cart = await getCart();

  const updatedCart: Cart = {
    items: cart.items.filter((item) => item.productId !== productId),
  };

  await saveCart(updatedCart);

  return updatedCart;
}

export async function updateCartQuantity(
  productId: number,
  quantity: number,
): Promise<Cart> {
  if (quantity <= 0) {
    return removeFromCart(productId);
  }

  const cart = await getCart();

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

  await saveCart(updatedCart);

  return updatedCart;
}

export async function clearCart(): Promise<void> {
  if (await isAuthenticated()) {
    await deleteApiCart();
    return;
  }

  clearStoredCart();
}

async function saveCart(cart: Cart): Promise<void> {
  if (await isAuthenticated()) {
    await saveApiCart(cart);
    return;
  }

  saveStoredCart(cart);
}
