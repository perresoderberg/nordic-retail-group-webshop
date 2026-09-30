import { Link } from "react-router-dom";

import styles from "./ProductCard.module.css";
import type { Product } from "../types";
import type { CartItem } from "../../cart/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: Omit<CartItem, "quanitity">) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  function addToCartEventHandler() {
    console.log("addToCartEventHandler");

    const cartItem: CartItem = {
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    };

    console.log("ProductCard -> The cart item to pass:", cartItem);

    onAddToCart(cartItem);
  }
  return (
    <article className={styles.productCard}>
      {/* Hela produktkortet länkar till produktens detaljsida */}
      <Link className={styles.productLink} to={`/products/${product.id}`}>
        <img
          className={styles.productImage}
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />

        <div className={styles.productContent}>
          <p className={styles.productCategory}>
            {product.category?.name ?? "Okänd kategori"}
          </p>

          <h2 className={styles.productTitle}>{product.title}</h2>

          <p className={styles.productPrice}>{product.price.toFixed(2)} kr</p>
        </div>
      </Link>
      <button className={styles.addToCartBtn} onClick={addToCartEventHandler}>
        Köp
      </button>
    </article>
  );
}
