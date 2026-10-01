import { Link } from "react-router-dom";
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
  if (!totalPages) return null;

  const items: PaginationItem[] = [];

  // First page
  items.push({
    type: "page",
    page: 1,
  });

  // Left gap
  if (currentPage > 3) {
    items.push({
      type: "gap",
      key: "left",
    });
  }

  // Previous page
  if (currentPage > 2) {
    items.push({
      type: "page",
      page: currentPage - 1,
    });
  }

  // Current page
  if (currentPage !== 1 && currentPage !== totalPages) {
    items.push({
      type: "page",
      page: currentPage,
    });
  }

  // Next page
  if (currentPage < totalPages - 1) {
    items.push({
      type: "page",
      page: currentPage + 1,
    });
  }

  // Right gap
  if (currentPage < totalPages - 2) {
    items.push({
      type: "gap",
      key: "right",
    });
  }

  // Last page
  if (totalPages > 1) {
    items.push({
      type: "page",
      page: totalPages,
    });
  }

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          to={`?page=${currentPage - 1}&pageSize=${pageSize}`}
          className={styles.button}
          aria-label="Previous page"
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
            to={`?page=${item.page}&pageSize=${pageSize}`}
            className={
              item.page === currentPage
                ? `${styles.button} ${styles.selected}`
                : styles.button
            }
            aria-current={item.page === currentPage ? "page" : undefined}
          >
            {item.page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          to={`?page=${currentPage + 1}&pageSize=${pageSize}`}
          className={styles.button}
          aria-label="Next page"
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
