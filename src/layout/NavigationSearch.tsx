
import { useState } from "react";
// import { useSearchParams } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Navigation.module.css";
import searchIcon from "../assets/icons/search_black.svg";

export default function NavigationSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    // Navigerar till produktsidan vid sökning
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    // Söker efter produkter och uppdaterar URL:en
    function handleSearch(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const search = searchText.trim();
        const params = new URLSearchParams(searchParams);

        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }

        params.set("page", "1");

        // Visar sökresultaten på produktsidan
        navigate(`/products?${params.toString()}`);
        setSearchText("");
    }

    // Rensar sökningen och uppdaterar URL:en
    function clearSearch() {
        setSearchText("");

        const params = new URLSearchParams(searchParams);
        params.delete("search");
        params.set("page", "1");

        setSearchParams(params);
    }

    return (
        <div className={styles.searchArea}>
            <form className={styles.searchForm} onSubmit={handleSearch}>
                <input
                    type="search"
                    name="search"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Sök produkter"
                    aria-label="Sök"
                />

                <button
                    type="submit"
                    className={styles.searchButton}
                    aria-label="Sök"
                >
                    <img src={searchIcon} alt="" />
                </button>
            </form>

            <button
                type="button"
                className={styles.clearSearchButton}
                onClick={clearSearch}
                aria-label="Rensa sökning"
            >
                ×
            </button>
        </div>
    );
}
