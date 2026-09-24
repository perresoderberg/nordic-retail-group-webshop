import styles from "./AddProductForm.module.css";
import type { Category } from "../../types/category";

type Props = {
  onCancel: () => void;
  categories: Category[];
};

export default function AddProductForm({ onCancel, categories }: Props) {
  return (
    // Formulär för att lägga till en ny produkt
    <section
      id="add-product"
      className={styles.addProductSection}
      aria-labelledby="add-product-title"
    >
      <h2 id="add-product-title">Add Product</h2>

      <form className={styles.productForm}>
        {/* Produktbild */}
        <div className={styles.formGroup}>
          <label htmlFor="thumbnail">Image URL</label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="url"
            placeholder="https://example.com/image.webp"
          />
        </div>

        {/* Produktinformation */}
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter product title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sku">SKU</label>
          <input id="sku" name="sku" type="text" placeholder="Enter SKU" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            name="brand"
            type="text"
            placeholder="Enter brand"
          />
        </div>

        {/* Välj produktkategori */}
        <div className={styles.formGroup}>
          <label htmlFor="categoryId">Category</label>

          <select id="categoryId" name="categoryId" defaultValue="">
            <option value="" disabled>
              Select category
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Lager och pris */}
        <div className={styles.formGroup}>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            placeholder="0"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        {/* Produktbeskrivning */}
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Enter product description"
          />
        </div>

        {/* Knappar för att återställa/stänga eller spara formuläret */}
        <div className={styles.buttonGroup}>
          <button
            type="reset"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>

          <button type="submit" className={styles.saveButton}>
            Save Product
          </button>
        </div>
      </form>
    </section>
  );
}
