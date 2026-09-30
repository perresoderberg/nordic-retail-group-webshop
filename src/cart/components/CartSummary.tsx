import styles from "./CartSummary.module.css";

export default function CartSummary({ total }: { total: number }) {
  return (
    <section className={styles.summary}>
      <div className={styles.shipping}>
        <span>Frakt:</span>
        <span>Fri frakt</span>
      </div>

      <div className={styles.total}>
        <span>Totalt:</span>
        <span>{total.toFixed(0)} SEK</span>
      </div>
    </section>
  );
}
