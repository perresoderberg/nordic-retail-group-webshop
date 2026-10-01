import { Link } from "react-router-dom";
import { useCart } from "../useCart";
import styles from "./AddedToCartModal.module.css";

export default function AddedToCartModal() {
  const { lastAddedItem, isAddedModalOpen, closeAddedModal } = useCart();

  if (!isAddedModalOpen || !lastAddedItem) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={closeAddedModal}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="added-to-cart-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 id="added-to-cart-title">Tillagd i varukorgen</h2>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeAddedModal}
            aria-label="Stäng"
          >
            ×
          </button>
        </header>

        <div className={styles.product}>
          <img
            className={styles.productImage}
            src={lastAddedItem.thumbnail ?? ""}
            alt={lastAddedItem.title}
          />

          <div className={styles.productInfo}>
            <h3>{lastAddedItem.title}</h3>

            <p className={styles.price}>{lastAddedItem.price.toFixed(0)} SEK</p>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.button} ${styles.continueButton}`}
            onClick={closeAddedModal}
          >
            Fortsätt handla
          </button>

          <Link
            to="/basket"
            className={`${styles.button} ${styles.checkoutButton}`}
            onClick={closeAddedModal}
          >
            Till kassan
          </Link>
        </div>
      </section>
    </div>
  );
}
