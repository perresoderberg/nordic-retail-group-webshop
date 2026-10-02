import { Link, useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.css";

type PaginationItem =
  | {
      type: "page";
      page: number;
    }
  | {
      type: "gap";
      key: "left" | "right";
    };

type Props = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
};

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
}: Props) {
  const [searchParams] = useSearchParams();

  if (!totalPages) return null;

  const items: PaginationItem[] = [];

  // Skapar en URL och behåller befintliga filter
  function createPageUrl(page: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());

    return `?${params.toString()}`;
  }

  // Första sidan
  items.push({
    type: "page",
    page: 1,
  });

  // Mellanrum till vänster
  if (currentPage > 3) {
    items.push({
      type: "gap",
      key: "left",
    });
  }

  // Föregående sida
  if (currentPage > 2) {
    items.push({
      type: "page",
      page: currentPage - 1,
    });
  }

  // Aktuell sida
  if (currentPage !== 1 && currentPage !== totalPages) {
    items.push({
      type: "page",
      page: currentPage,
    });
  }

  // Nästa sida
  if (currentPage < totalPages - 1) {
    items.push({
      type: "page",
      page: currentPage + 1,
    });
  }

  // Mellanrum till höger
  if (currentPage < totalPages - 2) {
    items.push({
      type: "gap",
      key: "right",
    });
  }

  // Sista sidan
  if (totalPages > 1) {
    items.push({
      type: "page",
      page: totalPages,
    });
  }

  return (
    <nav className={styles.pagination} aria-label="Sidnavigering">
      {currentPage > 1 ? (
        <Link
          to={createPageUrl(currentPage - 1)}
          className={styles.button}
          aria-label="Föregående sida"
        >
          &lt;
        </Link>
      ) : (
        <span
          className={`${styles.button} ${styles.disabled}`}
          aria-hidden="true"
        >
          &lt;
        </span>
      )}

      {items.map((item) => {
        if (item.type === "gap") {
          return (
            <span key={item.key} className={styles.gap}>
              ...
            </span>
          );
        }

        return (
          <Link
            key={item.page}
            to={createPageUrl(item.page)}
            className={
              item.page === currentPage
                ? `${styles.button} ${styles.selected}`
                : styles.button
            }
            aria-current={
              item.page === currentPage ? "page" : undefined
            }
          >
            {item.page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          to={createPageUrl(currentPage + 1)}
          className={styles.button}
          aria-label="Nästa sida"
        >
          &gt;
        </Link>
      ) : (
        <span
          className={`${styles.button} ${styles.disabled}`}
          aria-hidden="true"
        >
          &gt;
        </span>
      )}
    </nav>
  );
}