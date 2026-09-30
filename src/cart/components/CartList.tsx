import type { CartItem as CartItemType } from "../types";
import CartItem from "./CartItem";
import styles from "./CartList.module.css";

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
    return <p className={styles.emptyCart}>Din varukorg är tom.</p>;
  }

  return (
    <div className={styles.cartList}>
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
