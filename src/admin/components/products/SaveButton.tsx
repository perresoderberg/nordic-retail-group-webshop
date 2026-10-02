import { useFormStatus } from "react-dom";
import styles from "./SaveButton.module.css";

export function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.button} type="submit">
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
