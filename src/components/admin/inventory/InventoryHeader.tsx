import { useState } from "react";
import AddProductForm from "../AddProductForm";
import styles from "./InventoryHeader.module.css";
import type { Category } from "../../../types/category";

type Props = {
  categories: Category[];
};

export default function InventoryHeader({ categories }: Props) {
  // Håller reda på om formuläret är öppet eller stängt
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={styles.inventoryHeader}>
        <div className={styles.headerContent}>
          <h1>Inventory Management</h1>
          <p>
            Manage and track your global product catalogue across all categories
          </p>
        </div>

        {/* Öppnar eller stänger formuläret */}
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="add-product"
        >
          <span aria-hidden="true">+</span>
          Add Product
        </button>
      </header>

      {/* Formuläret finns kvar i DOM:en så CSS kan animera öppning/stängning */}
      <div
        className={`${styles.formWrapper} ${
          isOpen ? styles.formWrapperOpen : ""
        }`}
      >
        <div className={styles.formContent}>
          <AddProductForm
            onCancel={() => setIsOpen(false)}
            categories={categories}
          />
        </div>
      </div>
    </>
  );
}
