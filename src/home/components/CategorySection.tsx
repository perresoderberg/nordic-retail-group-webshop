import { Link } from "react-router-dom";
import type { Category } from "../../types/types";
import styles from "./CategorySection.module.css";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({
  categories,
}: CategorySectionProps) {
  return (
    <section
      className={styles.categorySection}
      aria-labelledby="category-heading"
    >
      {/* Rubrik för kategorisektionen */}
      <h2 className={styles.categoryTitle} id="category-heading">
        Shoppa efter kategori
      </h2>

      {/* Visar kategorierna som länkar */}
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <Link
            className={styles.categoryCard}
            key={category.id}
            to={`/products?category=${category.slug}`}
          >
            <img
              className={styles.categoryImage}
              src={category.image}
              alt=""
              loading="lazy"
            />

            <div className={styles.categoryContent}>
              <span>{category.name}</span>
              <span aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}