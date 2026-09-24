import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./ProductFilters.module.css";
import type { Category } from "../../../types/category";

type ProductFiltersProps = {
  categories?: Category[];
};

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Hämtar formulärets värden/all data från formuläret
    const formData = new FormData(event.currentTarget);

    const search = formData.get("search")?.toString().trim() ?? "";
    const category = formData.get("category")?.toString() ?? "";
    const stock = formData.get("stock")?.toString() ?? "";

    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (stock) {
      params.set("stock", stock);
    } else {
      params.delete("stock");
    }

    params.set("page", "1");

    setSearchParams(params);
  }

  return (
    <form className={styles.productFilters} onSubmit={handleSubmit}>
      <label className={styles.srOnly} htmlFor="search">
        Search products
      </label>

      <input
        id="search"
        name="search"
        type="search"
        placeholder="Search products..."
        defaultValue={searchParams.get("search") ?? ""}
      />

      <label className={styles.srOnly} htmlFor="category">
        Category
      </label>

      <select
        id="category"
        name="category"
        defaultValue={searchParams.get("category") ?? ""}
      >
        <option value="">All categories</option>

        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label className={styles.srOnly} htmlFor="stock">
        Stock status
      </label>

      <select
        id="stock"
        name="stock"
        defaultValue={searchParams.get("stock") ?? ""}
      >
        <option value="">All stock</option>
        <option value="in-stock">In stock</option>
        <option value="low-stock">Low stock</option>
        <option value="out-of-stock">Out of stock</option>
      </select>

      <button type="submit" className={styles.filterButton}>
        <img
          src="/icons/filter.svg"
          alt=""
          width={16}
          height={16}
          aria-hidden="true"
        />

        <span>Filter</span>
      </button>
    </form>
  );
}
