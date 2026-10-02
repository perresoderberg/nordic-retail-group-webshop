import { useFormStatus } from "react-dom";
import styles from "./DeleteButton.module.css";
import trash from "../../../assets/icons/trash.svg";

function DeleteButtonIcon() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="Delete product"
      disabled={pending}
      className={styles.button}
    >
      <img src={trash} alt="" width={20} height={20} />
    </button>
  );
}

export default function DeleteButton({ id }: { id: number }) {
  return (
    <form>
      <input type="hidden" name="id" value={id} />

      <DeleteButtonIcon />
    </form>
  );
}
