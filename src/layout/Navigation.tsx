import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import styles from "./Navigation.module.css";

import logo from "../assets/logo-n-white.svg";
import person from "../assets/icons/person_white.svg";
import basket from "../assets/icons/basket_white.svg";

import CartDrawer from "../cart/components/CartDrawer";
import { useCart } from "../cart/useCart";
import { getCategories } from "../categories/category-api";
import type { Category } from "../types/types";
import { useAuth } from "../auth/useAuth";

import search from "../assets/icons/search_black.svg";

export default function Navigation() {
  const { itemCount } = useCart();

  const { isAdmin } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  // Håller reda på om kundkorgen är öppen
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Håller reda på om mobilmenyn är öppen
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Håller reda på om kategorimenyn är öppen
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  // Sparar kategorierna som hämtas från API:t
  const [categories, setCategories] = useState<Category[]>([]);

  // Referens till kategorimenyn på desktop
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hämtar kategorierna från API:t
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        console.error("Kategorierna kunde inte hämtas.");
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    // Stänger desktopmenyn vid klick utanför den
    function handleClickOutside(event: MouseEvent) {
      const isDesktopNavigation =
        window.matchMedia("(min-width: 48rem)").matches;

      if (
        isDesktopNavigation &&
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target as Node)
      ) {
        setIsCategoryMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Stänger öppna menyer när fönstrets storlek ändras
    function handleResize() {
      setIsMenuOpen(false);
      setIsCategoryMenuOpen(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Öppnar och stänger mobilmenyn
  function toggleMobileMenu() {
    // Stänger kategorierna när mobilmenyn stängs
    if (isMenuOpen) {
      setIsCategoryMenuOpen(false);
    }

    setIsMenuOpen(!isMenuOpen);
  }

  // Stänger hela mobilmenyn
  function closeMobileMenu() {
    setIsMenuOpen(false);
    setIsCategoryMenuOpen(false);
  }

  return (
    <>
      <nav className={styles.topbarContainer} aria-label="Huvudnavigation">
        {/* Logotyp och länk till startsidan */}
        <Link
          to="/"
          className={styles.logoLink}
          aria-label="Startsida"
          onClick={closeMobileMenu}
        >
          {/* N-symbol */}
          <img
            className={styles.navigationLogo}
            src={logo}
            alt=""
            aria-hidden="true"
          />

          {/* Företagsnamn */}
          {/* Företagsnamn */}
          <span className={styles.logoText}>
            <span className={styles.logoName}>Nordic</span>
            <span className={styles.logoSubName}>Retail Group</span>
          </span>
          {/* <span className={styles.logoText}>
  Nordic Retail Group
</span> */}
        </Link>

        {/* Navigation för desktop */}
        <div className={styles.navigationLinks}>
          <Link to="/products" className={styles.navigationLink}>
            Alla produkter
          </Link>

          {/* Länk till Om oss-sidan */}
          <Link to="/about" className={styles.navigationLink}>
            Om oss
          </Link>

          <div ref={categoryMenuRef} className={styles.categoryMenu}>
            <button
              type="button"
              className={styles.categoryButton}
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              aria-expanded={isCategoryMenuOpen}
              aria-controls="desktop-category-menu"
            >
              Kategorier
              <span aria-hidden="true">▾</span>
            </button>

            {isCategoryMenuOpen && (
              <div
                id="desktop-category-menu"
                className={styles.categoryDropdown}
              >
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/products?categoryId=${category.id}`}
                    className={styles.categoryLink}
                    onClick={() => setIsCategoryMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <form
          className={styles.searchForm}
          onSubmit={(event) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const search = formData.get("search")?.toString().trim() ?? "";

            const params = new URLSearchParams(searchParams);

            if (search) {
              params.set("search", search);
            } else {
              params.delete("search");
            }

            params.set("page", "1");

            setSearchParams(params);
          }}
        >
          <input
            type="search"
            name="search"
            placeholder="Sök produkter"
            aria-label="Sök"
          />

          <button
            type="submit"
            className={styles.searchButton}
            aria-label="Sök"
          >
            <img src={search} alt="" />
          </button>
        </form>
        {/* Konto, kundkorg och mobilmeny */}
        <div className={styles.navigationActions}>
          {isAdmin && (
            <Link to="/admin" className={styles.navigationLink}>
              Admin
            </Link>
          )}
          <Link
            to="/login"
            className={styles.actionLink}
            aria-label="Logga in"
            onClick={closeMobileMenu}
          >
            <img className={styles.navigationIcon} src={person} alt="" />
          </Link>

          <button
            type="button"
            className={styles.cartButton}
            onClick={() => setIsCartOpen(true)}
            aria-label={`Kundkorg med ${itemCount} produkter`}
          >
            <div className={styles.cartBadgeContainer}>
              <img className={styles.navigationIcon} src={basket} alt="" />

              {itemCount > 0 && (
                <div className={styles.cartItemsOnBadge} aria-hidden="true">
                  {itemCount}
                </div>
              )}
            </div>
          </button>

          {/* Öppnar och stänger mobilmenyn */}
          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleMobileMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Stäng meny" : "Öppna meny"}
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </nav>

      {/* Navigation för mobil */}
      {isMenuOpen && (
        <div id="mobile-menu" className={styles.mobileMenu}>
          <Link
            to="/products"
            className={styles.mobileMenuLink}
            onClick={closeMobileMenu}
          >
            Alla produkter
          </Link>

          {/* Länk till Om oss-sidan */}
          <Link
            to="/about"
            className={styles.mobileMenuLink}
            onClick={closeMobileMenu}
          >
            Om oss
          </Link>

          <button
            type="button"
            className={styles.mobileCategoryButton}
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            aria-expanded={isCategoryMenuOpen}
            aria-controls="mobile-category-menu"
          >
            Kategorier
            <span aria-hidden="true">▾</span>
          </button>

          {isCategoryMenuOpen && (
            <div
              id="mobile-category-menu"
              className={styles.mobileCategoryMenu}
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?categoryId=${category.id}`}
                  className={styles.mobileCategoryLink}
                  onClick={closeMobileMenu}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
