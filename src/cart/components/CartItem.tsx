import type { CartItem as CartItemType } from "../types";
import styles from "./CartItem.module.css";

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export default function CartItem({
  item,
  onRemove,
  onQuantityChange,
}: CartItemProps) {
  return (
    <article className={styles.cartItem}>
      {item.thumbnail && (
        <img src={item.thumbnail} alt="" className={styles.productImage} />
      )}

      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{item.title}</h2>

        <p className={styles.productPrice}>{item.price.toFixed(2)} kr</p>
      </div>

      <div className={styles.quantityContainer}>
        <button
          type="button"
          onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className={styles.quantityButton}
          aria-label={`Decrease quantity of ${item.title}`}
        >
          −
        </button>

        <span className={styles.quantity}>{item.quantity}</span>

        <button
          type="button"
          onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
          className={styles.quantityButton}
          aria-label={`Increase quantity of ${item.title}`}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => onRemove(item.productId)}
        className={styles.removeButton}
        aria-label={`Remove ${item.title} from cart`}
      >
        ×
      </button>

      <p className={styles.itemTotal}>
        {(item.price * item.quantity).toFixed(2)} kr
      </p>
    </article>
  );
}
