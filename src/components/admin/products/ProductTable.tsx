import type { Product } from "../../../types/product";
import ProductRow from "./ProductRow";

type SortOrder = "asc" | "desc";

type ProductTableProps = {
  products: Product[];
  sort: string;
  order: "asc" | "desc";
  search: string;
  category: string;
  stock: string;
};

const headerCellStyle = "p-4 text-sm font-semibold text-gray-600";

export default function ProductTable({
  products,
  sort,
  order,
  search,
  category,
  stock,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-[#FAFAFA]">
            <th className={`${headerCellStyle} text-left`}>
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

            <th className={`${headerCellStyle} text-left`}>
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

            <th className={`${headerCellStyle} text-left`}>
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

            <th className={`${headerCellStyle} text-right`}>
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

            <th className={`${headerCellStyle} text-right`}>
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

            <th className={`${headerCellStyle} text-left`}>Actions</th>
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
    <a
      href={`/?${params.toString()}`}
      className="inline-flex items-center gap-2"
    >
      <span className="ml-2">{label}</span>

      {column === currentSort && (
        <img
          className="mr-0"
          src={
            currentOrder === "asc"
              ? "/icons/arrow-down.svg"
              : "/icons/arrow-up.svg"
          }
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
