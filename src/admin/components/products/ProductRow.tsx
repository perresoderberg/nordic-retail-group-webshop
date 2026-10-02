import DeleteButton from "./DeleteButton";
import { LowStock } from "../../../constants/inventory";
import type { Product } from "../../../products/types";
import styles from "./ProductRow.module.css";
import pen from "../../../assets/icons/pen.svg";

type Props = {
  product: Product;
};

export default function ProductRow({ product }: Props) {
  if (product.stock == null) return null;

  let stockColor = "";
  let stockText = "";

  if (product.stock === 0) {
    stockText = "Out Of Stock";
    stockColor = styles.outOfStock;
  } else if (product.stock < LowStock) {
    stockText = "Low Stock";
    stockColor = styles.lowStock;
  } else {
    stockText = "In Stock";
    stockColor = styles.inStock;
  }

  return (
    <tr className={styles.row}>
      <td className={`${styles.cell} ${styles.textLeft}`}>
        <div className={styles.product}>
          <img
            src={product.thumbnail}
            alt={product.title}
            width={40}
            height={40}
            className={styles.thumbnail}
          />

          <div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.sku}>SKU: {product.sku}</div>
          </div>
        </div>
      </td>

      <td className={`${styles.cell} ${styles.textLeft}`}>{product.brand}</td>

      <td className={`${styles.cell} ${styles.textLeft}`}>
        {product.category?.name}
      </td>

      <td className={`${styles.cell} ${styles.textRight}`}>
        <span className={stockColor}>{stockText}</span>
        <span> ({product.stock})</span>
      </td>

      <td className={`${styles.cell} ${styles.textRight}`}>€{product.price}</td>

      <td className={`${styles.cell} ${styles.textLeft}`}>
        <div className={styles.actions}>
          <DeleteButton id={product.id} />

          <img
            src={pen}
            alt="Edit"
            width={20}
            height={20}
            className={styles.editIcon}
          />
        </div>
      </td>
    </tr>
  );
}
