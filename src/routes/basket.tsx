import CartList from "../cart/components/CartList";
import CartSummary from "../cart/components/CartSummary";
import { useCart } from "../cart/useCart";
import styles from "./basket.module.css";

export default function Basket() {
  const { items, total, removeItem, setQuantity } = useCart();

  return (
    <>
      <section className={styles.basket}>
        <h1>Din varukorg</h1>

        <div className={styles.wrapper}>
          <div className={styles.content}>
            <CartList
              items={items}
              onRemove={removeItem}
              onQuantityChange={setQuantity}
            />
          </div>
          <CartSummary total={total} />
        </div>
      </section>
      <section className={styles.checkout}>
        <h1>Slutför köp</h1>

        <div className={styles.checkoutContent}>
          <h2>Dina uppgifter</h2>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="E-postadress"
              className={styles.email}
            />

            <input
              type="tel"
              placeholder="Mobiltelefonnummer"
              className={styles.phone}
            />
          </div>

          <button type="button">Fortsätt till leverans</button>
        </div>
      </section>
    </>
  );
}
