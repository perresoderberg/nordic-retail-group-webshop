import { Link } from "react-router-dom";

import styles from "./ProductCard.module.css";
import type { Product } from "../types";
import { useCart } from "../../cart/useCart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  function addToCartEventHandler() {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });
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
      <button
        className={styles.addToCartButton}
        onClick={addToCartEventHandler}
      >
        Köp
      </button>
    </article>
  );
}
