import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedProducts from "../home/components/FeaturedProducts";

import heroImage from "../assets/images/home/hero1.webp";
import { getCategories } from "../categories/category-api";
import CategorySection from "../home/components/CategorySection";
import type { Category } from "../types/types";
import styles from "./home.module.css";
import type { Product } from "../products/types";
import { getProducts } from "../products/product-api";

export default function Home() {
  // Sparar kategorierna som hämtas från API:t
  const [categories, setCategories] = useState<Category[]>([]);

  // Sparar de utvalda produkterna
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

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

  useEffect(() => {
    // Hämtar produkter som underlag för utvalda produkter
    async function loadFeaturedProducts() {
      try {
        const data = await getProducts(1, 24);

        // Sparar produkterna från API-svaret
        // setFeaturedProducts(data.items);

        // Väljer fyra produkter från olika kategorier
        const selectedProducts = data.items
          .filter(
            (product, index, products) =>
              products.findIndex(
                (item) => item.categoryId === product.categoryId,
              ) === index,
          )
          .slice(0, 4);

        setFeaturedProducts(selectedProducts);
      } catch {
        console.error("De utvalda produkterna kunde inte hämtas.");
      }
    }

    loadFeaturedProducts();
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
      <FeaturedProducts products={featuredProducts} />
    </div>
  );
}