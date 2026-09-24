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
};

export default function Pagination({ currentPage, totalPages }: Props) {
  if (!totalPages) return null;

  const items: PaginationItem[] = [];

  // First page (always show)
  items.push({
    type: "page",
    page: 1,
  });

  // Left gap (...)
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

  // Current page (If first or last, it is already shown)
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

  // Right gap (...)
  if (currentPage < totalPages - 2) {
    items.push({
      type: "gap",
      key: "right",
    });
  }

  // Last page (always show)
  if (totalPages > 1) {
    items.push({
      type: "page",
      page: totalPages,
    });
  }

  const paginationButtonStyle =
    "size-9 grid place-items-center border border-gray-200 rounded bg-white";
  const selectedButtonStyle =
    "size-9 grid place-items-center border border-gray-200 rounded bg-[#737373] text-white";

  return (
    <nav className="flex justify-center items-center gap-2 m-3">
      <a
        href={`/?page=${currentPage - 1}`}
        aria-disabled={currentPage === 1}
        className={paginationButtonStyle}
      >
        {`<`}
      </a>
      {items.map((item) => {
        if (item.type === "gap") {
          return (
            <span key={item.key} className="px-1">
              ...
            </span>
          );
        }

        return (
          <a
            key={item.page}
            href={`/?page=${item.page}`}
            className={
              item.page === currentPage
                ? `${selectedButtonStyle}`
                : paginationButtonStyle
            }
          >
            {item.page}
          </a>
        );
      })}
      <a
        href={`/?page=${currentPage + 1}`}
        aria-disabled={currentPage === 1}
        className={paginationButtonStyle}
      >
        {`>`}
      </a>
    </nav>
  );
}
