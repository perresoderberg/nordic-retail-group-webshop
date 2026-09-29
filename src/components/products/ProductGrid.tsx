import ProductCard from "../../products/components/ProductCard";
import type { Product } from "../../products/types";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className={styles.productGrid}>
      {/* Skapar ett produktkort för varje produkt */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
