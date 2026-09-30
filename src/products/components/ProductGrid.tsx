import ProductCard from "./ProductCard";
import type { Product } from "../types";
import styles from "./ProductGrid.module.css";
import type { CartItem } from "../../cart/types";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}

export default function ProductGrid({
  products,
  onAddToCart,
}: ProductGridProps) {
  return (
    <div className={styles.productGrid}>
      {/* Skapar ett produktkort för varje produkt */}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
