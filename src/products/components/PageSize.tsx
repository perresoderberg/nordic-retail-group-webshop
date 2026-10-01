import styles from "./PageSize.module.css";

const pageSizes = [10, 50, 100];

interface PageSizeProps {
  pageSize: string;
  onChange: (pageSize: string) => void;
}

export default function PageSize({ pageSize, onChange }: PageSizeProps) {
  return (
    <label className={styles.pageSize}>
      <span>Visa</span>

      <select
        value={pageSize}
        onChange={(event) => onChange(event.target.value)}
      >
        {pageSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </label>
  );
}
