import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <h2 className={`${styles.footerTitle} ${styles.footerBrand}`}>
            Nordic Retail Group
          </h2>

          <p className={styles.footerText}>
            Quality products for everyday life.
          </p>
        </div>

        <div className={styles.footerColumn}>
          <h2 className={styles.footerTitle}>Shop</h2>

          <ul className={styles.footerLinks}>
            <li>
              <Link to="/products">All products</Link>
            </li>
            <li>
              <Link to="/products?category=electronics">Electronics</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h2 className={styles.footerTitle}>Customer service</h2>

          <ul className={styles.footerLinks}>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping</Link>
            </li>
            <li>
              <Link to="/returns">Returns</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h2 className={styles.footerTitle}>Account</h2>

          <ul className={styles.footerLinks}>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/basket">Shopping cart</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <span>© 2026 Nordic Retail Group</span>
        </div>
      </div>
    </footer>
  );
}
