import { Link } from "react-router-dom";
import styles from "./about.module.css";
import aboutCollage from "../assets/images/about/about-collage.webp";
import aboutLifestyle from "../assets/images/about/about-lifestyle.webp";
import aboutCta from "../assets/images/about/about-cta.webp";
import { getProductById } from "../products/product-api";
import { useEffect, useState } from "react";
import type { Product } from "../products/types";



// Kategorier och produkter som visas på Om oss-sidan
const featuredCategories = [
    {
        name: "Laptops",
        categoryId: 7,
        productId: 79,
    },
    {
        name: "Kök & matlagning",
        categoryId: 6,
        productId: 52,
    },
    {
        name: "Mobiler",
        categoryId: 11,
        productId: 105,
    },
    {
        name: "Sport",
        categoryId: 15,
        productId: 144,
    },
    {
        name: "Motorcyklar",
        categoryId: 12,
        productId: 115,
    },
    {
        name: "Möbler",
        categoryId: 3,
        productId: 14,
    },
    {
        name: "Solglasögon",
        categoryId: 16,
        productId: 155,
    },
    {
        name: "Klockor",
        categoryId: 24,
        productId: 191,
    },
];


export default function About() {
    // Sparar produkterna som används som kategoribilder
    const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Hämtar produkterna som representerar kategorierna
        async function loadCategoryProducts() {
            try {
                const products = await Promise.all(
                    featuredCategories.map((category) =>
                        getProductById(category.productId),
                    ),
                );

                // Sparar produkterna i state
                setCategoryProducts(products);
            } catch {
                console.error("Kategoribilderna kunde inte hämtas.");
            }
        }

        loadCategoryProducts();
    }, []);

    return (
        <main className={styles.about}>
            {/* Introduktion */}
            <section
                className={styles.intro}
                aria-labelledby="about-heading"
            >
                <div className={styles.introContent}>
                    <p className={styles.eyebrow}>Om oss</p>

                    <h1 id="about-heading" className={styles.introTitle}>
                        Kvalitet, variation och inspiration för din vardag
                    </h1>

                    <p className={styles.introText}>
                        Nordic Retail Group erbjuder ett brett sortiment av
                        kvalitetsprodukter som gör vardagen enklare, smidigare
                        och mer inspirerande. Här hittar du produkter för hemmet,
                        arbetet, fritiden och livet på språng.
                    </p>
                </div>

                {/* Bildcollage med produkter för olika delar av vardagen */}
                <img
                    className={styles.introImages}
                    src={aboutCollage}
                    alt=""
                />
            </section>

            {/* Fördelar */}
            <section
                className={styles.benefits}
                aria-labelledby="benefits-heading"
            >
                <div className={styles.sectionContent}>
                    <h2
                        id="benefits-heading"
                        className={styles.visuallyHidden}
                    >
                        Därför väljer kunder Nordic Retail Group
                    </h2>

                    <div className={styles.benefitGrid}>
                        <article className={styles.benefit}>
                            {/* Diamant för noggrant utvalda produkter */}
                            <svg
                                className={styles.benefitIcon}
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M3 8 7 3h10l4 5-9 13L3 8Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3 8h18M7 3l5 18 5-18M7 8l5-5 5 5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <h3>Noggrant utvalda produkter</h3>

                            <p>
                                Ett varierat sortiment med fokus på kvalitet och
                                användbarhet.
                            </p>
                        </article>

                        <article className={styles.benefit}>
                            {/* Lastbil för snabb och trygg leverans */}
                            <svg
                                className={styles.benefitIcon}
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2.5 5h12v11h-12V5Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <path
                                    d="M14.5 9h4l3 3.5V16h-7V9Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <path
                                    d="M18.5 9v3.5h3"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <circle
                                    cx="7"
                                    cy="17"
                                    r="2"
                                    fill="var(--color-surface)"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />

                                <circle
                                    cx="18"
                                    cy="17"
                                    r="2"
                                    fill="var(--color-surface)"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                            </svg>

                            <h3>Snabb och trygg leverans</h3>

                            <p>
                                En smidig köpupplevelse från beställning till leverans.
                            </p>
                        </article>

                        <article className={styles.benefit}>
                            {/* Sköld för säker betalning */}
                            <svg
                                className={styles.benefitIcon}
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M12 2.5 20 5.5v6c0 5-3.2 8.4-8 10-4.8-1.6-8-5-8-10v-6l8-3Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <path
                                    d="m8.5 12 2.2 2.2 4.8-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <h3>Säker betalning</h3>

                            <p>
                                En trygg och enkel upplevelse när du handlar hos oss.
                            </p>
                        </article>

                        <article className={styles.benefit}>
                            {/* Personer för kunden i fokus */}
                            <svg
                                className={styles.benefitIcon}
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="9"
                                    cy="7"
                                    r="3"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />

                                <circle
                                    cx="16.5"
                                    cy="8"
                                    r="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />

                                <path
                                    d="M3.5 19c0-3.8 2.4-6 5.5-6s5.5 2.2 5.5 6H3.5Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <path
                                    d="M14 13.5c.8-.5 1.6-.7 2.5-.7 2.8 0 4.5 2 4.5 5.2h-4.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <h3>Kunden i fokus</h3>

                            <p>
                                Vi vill göra det enkelt att hitta produkter som passar
                                din vardag.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Produkter för en modern vardag */}
            <section
                className={styles.lifestyle}
                aria-labelledby="lifestyle-heading"
            >
                {/* Bild för en modern vardag */}
                <img
                    className={styles.lifestyleImage}
                    src={aboutLifestyle}
                    alt=""
                    loading="lazy"
                />

                <div className={styles.lifestyleContent}>
                    <p className={styles.eyebrow}>För en modern vardag</p>

                    <h2 id="lifestyle-heading">
                        Produkter för olika delar av livet
                    </h2>

                    <p>
                        Oavsett om du arbetar, lagar mat, kopplar av, reser eller
                        är på väg mot nästa äventyr vill vi erbjuda produkter som
                        passar dina behov och gör vardagen lite enklare.
                    </p>
                </div>
            </section>

            {/* Exempel på sortimentet */}
            <section
                className={styles.categories}
                aria-labelledby="categories-heading"
            >
                <div className={styles.sectionContent}>
                    <div className={styles.sectionHeading}>
                        <p className={styles.eyebrow}>Vårt sortiment</p>

                        <h2 id="categories-heading">
                            Några av våra kategorier
                        </h2>

                        <p>
                            Från teknik och kök till möbler, mode och fritid – hos
                            Nordic Retail Group finns produkter för många olika delar
                            av vardagen.
                        </p>
                    </div>

                    {/* Visar utvalda kategorier med produktbilder */}
                    <div className={styles.categoryGrid}>
                        {featuredCategories.map((category) => {
                            // Hittar produkten som ska representera kategorin
                            const product = categoryProducts.find(
                                (item) => item.id === category.productId,
                            );

                            return (
                                <Link
                                    key={category.categoryId}
                                    className={styles.categoryItem}
                                    to={`/products?categoryId=${category.categoryId}`}
                                >
                                    {product && (
                                        <img className={styles.categoryImage}
                                            src={product.thumbnail}
                                            alt=""
                                            loading="lazy"
                                        />
                                    )}

                                    <span className={styles.categoryName}>
                                        {category.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Länk till alla produkter */}
            <section
                className={styles.cta}
                aria-labelledby="cta-heading"
                style={{ backgroundImage: `url(${aboutCta})` }}
            >
                <div className={styles.ctaContent}>
                    <h2 id="cta-heading">
                        Utforska hela vårt sortiment
                    </h2>

                    <p>
                        Upptäck kvalitetsprodukter för en modern vardag och hitta
                        det som passar just dig.
                    </p>

                    <Link className={styles.ctaLink} to="/products">
                        Utforska alla produkter
                    </Link>
                </div>
            </section>
        </main>
    );
}