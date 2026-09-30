import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Navigation.module.css";

import logo from "../assets/icons/logo_white.svg";
import person from "../assets/icons/person_white.svg";
import basket from "../assets/icons/basket_white.svg";

import CartDrawer from "../cart/components/CartDrawer";
import { useCart } from "../cart/useCart";

export default function Navigation() {
  const { itemCount } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className={styles.topbarContainer}>
        <div className={styles.navigationLinks}>
          <Link to="/" aria-label="Home">
            <img
              className={styles.navigationLogo}
              src={logo}
              alt="Nordic Retail Group"
            />
          </Link>

          <Link to="/products" className={styles.navigationLink}>
            All products
          </Link>

          <Link
            to="/products?category=electronics"
            className={styles.navigationLink}
          >
            Electronics
          </Link>
        </div>

        <div className={styles.navigationActions}>
          <Link to="/login" aria-label="Log in">
            <img className={styles.navigationIcon} src={person} alt="Login" />
          </Link>

          <button
            type="button"
            className={styles.cartButton}
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <div className={styles.cartBadgeContainer}>
              <img
                className={styles.navigationIcon}
                src={basket}
                alt="Shopping cart"
              />
              {itemCount > 0 && (
                <div className={styles.cartItemsOnBadge}>{itemCount}</div>
              )}
            </div>
          </button>
        </div>
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
