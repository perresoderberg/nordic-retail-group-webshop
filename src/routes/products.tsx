import { useEffect, useState } from "react";
import ProductGrid from "../components/products/ProductGrid";
import { getShopProducts } from "../services/product-api";
import type { Product } from "../types/product";

function Products() {
  // Sparar produkterna som hämtas från API:t
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Hämtar produkterna när sidan laddas
    async function loadProducts() {
      const data = await getShopProducts();
      // Sparar produkterna i state
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <main id="main-content">
      <h1>Products</h1>

      <ProductGrid products={products} />
    </main>
  );
}

export default Products;