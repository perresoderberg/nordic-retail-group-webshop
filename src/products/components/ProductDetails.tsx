import { Link } from "react-router-dom";

import styles from "./ProductDetails.module.css";
import type { Product } from "../types";
import { useCart } from "../../cart/useCart";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
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
    <div className={styles.productDetailsPage}>
      {/* Navigerar tillbaka till produktöversikten */}
      <Link className={styles.backLink} to="/products">
        ← Tillbaka till produkter
      </Link>
      <article className={styles.productDetails}>
        {/* Visar produktens huvudbild */}
        <img
          className={styles.productImage}
          src={product.thumbnail}
          alt={product.title}
        />

        {/* Visar produktens information */}
        <div className={styles.productContent}>
          <p className={styles.productCategory}>
            {product.category?.name ?? "Okänd kategori"}
          </p>

          <h1 className={styles.productTitle}>{product.title}</h1>

          <p className={styles.productDescription}>{product.description}</p>

          <p className={styles.productPrice}>{product.price.toFixed(2)} kr</p>

          {/* Visar produktens lagerstatus */}
          <p className={styles.productStock}>
            Lagerstatus:{" "}
            {product.availabilityStatus ??
              (product.stock !== undefined
                ? `${product.stock} i lager`
                : "Okänd lagerstatus")}
          </p>

          {/* Köpknappens funktionalitet kopplas på senare */}
          <button
            className={styles.addToCartButton}
            type="button"
            onClick={addToCartEventHandler}
          >
            Lägg i varukorg
          </button>
        </div>
      </article>
    </div>
  );
}
