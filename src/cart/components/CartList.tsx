import type { CartItem as CartItemType } from "../types";
import CartItem from "./CartItem";

interface CartListProps {
  items: CartItemType[];
  onRemove: (productId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export default function CartList({
  items,
  onRemove,
  onQuantityChange,
}: CartListProps) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">Your cart is empty.</p>
    );
  }

  return (
    <div>
      {items.map((item) => (
        <CartItem
          key={item.productId}
          item={item}
          onRemove={onRemove}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
}
