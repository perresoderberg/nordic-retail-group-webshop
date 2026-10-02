import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductTable from "../admin/components/products/ProductTable";
import { getProducts } from "../products/product-api";
import type { Product } from "../products/types";

import styles from "./admin.module.css";

export default function Admin() {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const page = Number(searchParams.get("page") ?? "1");

  const sort = searchParams.get("sort") ?? "title";
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";

  // Still used by ProductTable for now
  const stock = searchParams.get("stock") ?? "";

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getProducts(page, 8, {
          search,
          categoryId: category ? Number(category) : undefined,
          sortBy: sort,
          ascending: order === "asc",
        });

        console.log("response", response);
        console.log("response.items", response.items);

        setProducts(response.items);
      } catch (error) {
        console.error("Failed to load products:", error);
        setError("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [page, search, category, sort, order]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.adminSection}>
      <h1>Admin</h1>

      <ProductTable
        products={products}
        sort={sort}
        order={order}
        search={search}
        category={category}
        stock={stock}
      />
    </section>
  );
}
