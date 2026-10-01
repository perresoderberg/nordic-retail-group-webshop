import { useEffect, useState } from "react";
import ProductGrid from "../products/components/ProductGrid";
import { getShopProducts } from "../products/product-api";
import type { Product } from "../products/types";
import { useCart } from "../cart/useCart";
import styles from "./products.module.css";

export function Products() {
  // Sparar produkterna som hämtas från API:t
  const [products, setProducts] = useState<Product[]>([]);
  // Håller reda på om produkterna laddas
  const [isLoading, setIsLoading] = useState(true);
  // Sparar felmeddelande om API-anropet misslyckas
  const [error, setError] = useState("");

  useEffect(() => {
    // Hämtar produkterna när sidan laddas
    async function loadProducts() {
      try {
        const data = await getShopProducts();

        // Sparar produkterna i state
        setProducts(data);
      } catch {
        // Visar ett användarvänligt meddelande om hämtningen misslyckas
        setError("Produkterna kunde inte hämtas. Försök igen senare.");
      } finally {
        // Avslutar laddningen när API-anropet är klart
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div id="main-content" className={styles.productsPage}>
      <h1>Products</h1>
      {isLoading && <p role="status">Produkter laddas...</p>}
      {error && <p role="alert">{error}</p>}
      {/* Visar produkterna när laddningen är klar och inget fel finns */}
      {!isLoading && !error && <ProductGrid products={products} />}
    </div>
  );
}
