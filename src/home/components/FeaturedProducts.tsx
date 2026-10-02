import ProductCard from "../../products/components/ProductCard";
import type { Product } from "../../products/types";
import styles from "./FeaturedProducts.module.css";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({
  products,
}: FeaturedProductsProps) {
  return (
    <section
      className={styles.featuredProducts}
      aria-labelledby="featured-products-heading"
    >
      {/* Rubrik för utvalda produkter */}
      <h2
        id="featured-products-heading"
        className={styles.title}
      >
        Utvalda produkter
      </h2>

      {/* Visar de utvalda produkterna */}
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}