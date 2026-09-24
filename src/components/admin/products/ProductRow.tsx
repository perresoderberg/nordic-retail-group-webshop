import type { Product } from "../../../types/product";
import DeleteButton from "./DeleteButton";
import { LowStock } from "../../../constants/inventory";

type Props = {
  product: Product;
};

const cellStyle = "p-4 text-s text-gray-400";

export default function ProductRow({ product }: Props) {
  if (product.stock == null) return null;

  let stockColor = "";
  let stockText = "";

  if (product.stock === 0) {
    stockText = "Out Of Stock";
    stockColor = "text-red-500";
  } else if (product.stock < LowStock) {
    stockText = "Low Stock";
    stockColor = "text-orange-500";
  } else {
    stockText = "In Stock";
    stockColor = "text-green-500";
  }

  return (
    <tr className="border-b border-gray-200">
      <td className={`${cellStyle} text-left`}>
        <div className="flex items-center gap-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            width={40}
            height={40}
            className=""
          />

          <div>
            <div className="text-gray-800 font-bold">{product.title}</div>
            <div className="text-xs text-gray-300">SKU: {product.sku}</div>
          </div>
        </div>
      </td>

      <td className={`${cellStyle} text-left`}>{product.brand}</td>

      <td className={`${cellStyle} text-left`}>{product.category?.name}</td>

      <td className={`${cellStyle} text-right`}>
        <span className={stockColor}>{stockText}</span>
        <span> ({product.stock})</span>
      </td>

      <td className={`${cellStyle} text-right`}>€{product.price}</td>

      <td className={`${cellStyle} text-left`}>
        <div className="flex gap-4">
          <DeleteButton id={product.id} />

          <img
            src="/icons/pen.svg"
            alt="Edit"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
}
