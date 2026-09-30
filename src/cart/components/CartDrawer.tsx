import { useCart } from "../useCart";
import styles from "./CartDrawer.module.css";

import CartList from "./CartList";
import CartSummary from "./CartSummary";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, itemCount, total, removeItem, setQuantity } = useCart();

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />

      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <header className={styles.header}>
          <h2 id="cart-drawer-title">
            Din varukorg <span>( {itemCount} )</span>
          </h2>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Stäng varukorg"
          >
            ×
          </button>
        </header>

        <div className={styles.content}>
          <CartList
            items={items}
            onRemove={removeItem}
            onQuantityChange={setQuantity}
          />
        </div>

        <footer className={styles.footer}>
          <CartSummary total={total} />

          <button type="button" className={styles.checkoutButton}>
            Gå till kassan
          </button>
        </footer>
      </aside>
    </>
  );
}
