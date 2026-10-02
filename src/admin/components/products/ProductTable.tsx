import type { Product } from "../../../products/types";
import ProductRow from "./ProductRow";
import styles from "./ProductTable.module.css";
import arrowdown from "../../../assets/icons/arrow-down.svg";
import arrowup from "../../../assets/icons/arrow-up.svg";

type ProductTableProps = {
  products: Product[];
  sort: string;
  order: "asc" | "desc";
  search: string;
  category: string;
  stock: string;
};

export default function ProductTable({
  products,
  sort,
  order,
  search,
  category,
  stock,
}: ProductTableProps) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={`${styles.headerCell} ${styles.textLeft}`}>
              <SortableHeader
                column="title"
                label="Title"
                currentSort={sort}
                currentOrder={order}
                search={search}
                category={category}
                stock={stock}
              />
            </th>

            <th className={`${styles.headerCell} ${styles.textLeft}`}>
              <SortableHeader
                column="brand"
                label="Brand"
                currentSort={sort}
                currentOrder={order}
                search={search}
                category={category}
                stock={stock}
              />
            </th>

            <th className={`${styles.headerCell} ${styles.textLeft}`}>
              <SortableHeader
                column="categoryId"
                label="Category"
                currentSort={sort}
                currentOrder={order}
                search={search}
                category={category}
                stock={stock}
              />
            </th>

            <th className={`${styles.headerCell} ${styles.textRight}`}>
              <SortableHeader
                column="stock"
                label="Stock"
                currentSort={sort}
                currentOrder={order}
                search={search}
                category={category}
                stock={stock}
              />
            </th>

            <th className={`${styles.headerCell} ${styles.textRight}`}>
              <SortableHeader
                column="price"
                label="Price"
                currentSort={sort}
                currentOrder={order}
                search={search}
                category={category}
                stock={stock}
              />
            </th>

            <th className={`${styles.headerCell} ${styles.textLeft}`}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortableHeader({
  column,
  label,
  currentSort,
  currentOrder,
  search,
  category,
  stock,
}: {
  column: string;
  label: string;
  currentSort: string;
  currentOrder: "asc" | "desc";
  search: string;
  category: string;
  stock: string;
}) {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (stock) params.set("stock", stock);

  params.set("page", "1");
  params.set("sort", column);

  const nextOrder =
    column === currentSort && currentOrder === "asc" ? "desc" : "asc";

  params.set("order", nextOrder);

  return (
    <a href={`/admin?${params.toString()}`} className={styles.sortableHeader}>
      <span>{label}</span>

      {column === currentSort && (
        <img
          className={styles.sortIcon}
          src={currentOrder === "asc" ? arrowdown : arrowup}
          alt={
            currentOrder === "asc" ? "Sorted ascending" : "Sorted descending"
          }
          width={32}
          height={32}
        />
      )}
    </a>
  );
}
