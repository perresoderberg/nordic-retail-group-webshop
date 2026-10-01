import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedProducts from "../home/components/FeaturedProducts";

import heroImage from "../assets/images/home/hero1.webp";
import { getCategories } from "../categories/category-api";
import CategorySection from "../home/components/CategorySection";
import type { Category } from "../types/types";
import styles from "./home.module.css";

export default function Home() {
  // Sparar kategorierna som hämtas från API:t
  const [categories, setCategories] = useState<Category[]>([]);

  // Kategorier som visas på startsidan
  const featuredCategorySlugs = [
    "beauty",
    "fragrances",
    "laptops",
    "home-decoration",
    "mens-shoes",
    "womens-bags",
  ];

  // Filtrerar ut kategorierna som ska visas på startsidan
  const featuredCategories = categories.filter((category) =>
    featuredCategorySlugs.includes(category.slug),
  );

  useEffect(() => {
    // Hämtar kategorierna när startsidan laddas
    async function loadCategories() {
      try {
        const data = await getCategories();

        // Sparar kategorierna i state
        setCategories(data);
      } catch {
        // Loggar felet tills vi lägger till felhantering i gränssnittet
        console.error("Kategorierna kunde inte hämtas.");
      }
    }

    loadCategories();
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Hero-sektion */}
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src={heroImage}
          alt=""
        />

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Nordic Retail Group</h1>

          <p className={styles.heroDescription}>
            Kvalitetsprodukter för en modern vardag.
          </p>

          <Link className={styles.heroLink} to="/products">
            Utforska alla produkter
          </Link>
        </div>
      </section>

      {/* Visar butikens kategorier */}
      <CategorySection categories={featuredCategories} />
      {/* Utvalda produkter */}
      <FeaturedProducts products={[]} />
    </div>
  );
}