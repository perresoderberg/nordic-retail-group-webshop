import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import type { Product } from "../types";
import styles from "./ProductGrid.module.css";
import Pagination from "./Pagination";
import PageSize from "./PageSize";

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export default function ProductGrid({
  products,
  currentPage,
  pageSize,
  totalPages,
}: ProductGridProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handlePageSizeChange(pageSize: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("pageSize", pageSize.toString());

    setSearchParams(params);
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <PageSize
          pageSize={pageSize.toString()}
          onChange={handlePageSizeChange}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
        />
      </div>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </div>
  );
}
