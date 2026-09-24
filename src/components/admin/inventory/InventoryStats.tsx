import type { Product } from "../../../types/product";
import { LowStock } from "../../../constants/inventory";

function InventoryStat(props: {
  label: string;
  value: number;
  icon: string;
  color?: string;
}) {
  const { label, value, icon, color } = props;

  return (
    <div className="bg-white shadow-sm rounded-2xl h-full p-6 text-center min-w-[180px] flex flex-col items-center justify-between gap-4 basis-full grow sm:basis-1 sm:text-left sm:flex-row sm:items-center">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-2xl font-bold ${color || "text-gray-800"}`}>
          {value}
        </p>
      </div>
      <img src={icon} alt={`${label} Icon`} width={30} height={30} />
    </div>
  );
}

export default function InventoryStats({ products }: { products: Product[] }) {
  const totalProducts = products.length;
  const totalStock = products.filter(
    (product) => product.stock && product.stock > 0,
  ).length; //products.reduce((acc, product) => acc + (product.stock || 0), 0);
  const lowStockProducts = products.filter(
    (product) =>
      product.stock !== undefined &&
      product.stock > 0 &&
      product.stock < LowStock,
  ).length;
  const outOfStockProducts = products.filter(
    (product) => product.stock === 0,
  ).length;

  return (
    <article className="bg-gray-100 flex justify-evenly gap-4 pt-4 border border-gray-200 rounded-xl">
      <InventoryStat
        label="PRODUCTS"
        value={totalProducts}
        icon="/icons/product.svg"
        color="text-purple-500"
      />
      <InventoryStat
        label="IN STOCK"
        value={totalStock}
        icon="/icons/check-circle.svg"
        color="text-green-600"
      />
      <InventoryStat
        label="LOW STOCK"
        value={lowStockProducts}
        icon="/icons/warning.svg"
        color="text-orange-500"
      />
      <InventoryStat
        label="OUT OF STOCK"
        value={outOfStockProducts}
        icon="/icons/cancel.svg"
        color="text-red-500"
      />
    </article>
  );
}
