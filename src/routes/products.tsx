import { useEffect, useState } from "react";
import ProductGrid from "../products/components/ProductGrid";
import { getProducts } from "../products/product-api";
import styles from "./products.module.css";
import type { ProductsResponse } from "../products/types";
import { useSearchParams } from "react-router-dom";

export function Products() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  // Sparar produkterna som hämtas från API:t
  const [products, setProducts] = useState<ProductsResponse>();
  // Håller reda på om produkterna laddas
  const [isLoading, setIsLoading] = useState(true);
  // Sparar felmeddelande om API-anropet misslyckas
  const [error, setError] = useState("");

  useEffect(() => {
    // Hämtar produkterna när sidan laddas
    async function loadProducts() {
      try {
        const data = await getProducts(page, pageSize);

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
  }, [page, pageSize]);

  return (
    <div id="main-content" className={styles.productsPage}>
      <h1>Products</h1>
      {isLoading && <p role="status">Produkter laddas...</p>}
      {error && <p role="alert">{error}</p>}
      {/* Visar produkterna när laddningen är klar och inget fel finns */}
      {!isLoading && !error && products && (
        <ProductGrid
          products={products.items}
          currentPage={products.page}
          pageSize={pageSize}
          totalPages={products.totalPages}
        />
      )}
    </div>
  );
}
