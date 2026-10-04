import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Företagsinformation */}
        <div className={styles.footerColumn}>
          <h2 className={`${styles.footerTitle} ${styles.footerBrand}`}>
            Nordic Retail Group
          </h2>

          <p className={styles.footerText}>
            Kvalitetsprodukter noggrant utvalda för en enklare och modernare vardag.
          </p>

          {/* Sociala medier */}
          <div className={styles.socialLinks}>
            <span className={styles.socialIcon} aria-label="Instagram">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </span>

            <span className={styles.socialIcon} aria-label="Facebook">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1Z" />
              </svg>
            </span>

            <span className={styles.socialIcon} aria-label="YouTube">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <rect
                  x="2"
                  y="5"
                  width="20"
                  height="14"
                  rx="4"
                />
                <path d="m10 9 5 3-5 3Z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Länkar till butiken */}
        <div className={styles.footerColumn}>
          <h2 className={styles.footerTitle}>Shoppa</h2>

          <ul className={styles.footerLinks}>
            <li>
              <Link to="/products">Alla produkter</Link>
            </li>
            <li>
              <Link to="/products">Kategorier</Link>
            </li>
            <li>
              <Link to="/about">Om oss</Link>
            </li>
          </ul>
        </div>

        {/* Kundservice */}
        <div className={styles.footerColumn}>
          <h2 className={styles.footerTitle}>Kundservice</h2>

          <ul className={styles.footerLinks}>
            <li>
              <Link to="/contact">Kontakta oss</Link>
            </li>
            <li>
              <Link to="/shipping">Leverans</Link>
            </li>
            <li>
              <Link to="/returns">Returer</Link>
            </li>
            <li>
              <Link to="/faq">Vanliga frågor</Link>
            </li>
          </ul>
        </div>

        {/* Konto och kundkorg */}
        <div className={styles.footerColumn}>
          <h2 className={styles.footerTitle}>Mitt konto</h2>

          <ul className={styles.footerLinks}>
            <li>
              <Link to="/login">Logga in</Link>
            </li>
            <li>
              {/* Länk till varukorgen */}
              <Link to="/basket">Varukorg</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          {/* Visar aktuellt år automatiskt */}
          <span>© {new Date().getFullYear()} Nordic Retail Group</span>
        </div>
      </div>
    </footer>
  );
}