import { useFormStatus } from "react-dom";

function DeleteButtonIcon() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="Delete product"
      disabled={pending}
      className="cursor-pointer disabled:cursor-not-allowed"
    >
      <img src="/icons/trash.svg" alt="" width={20} height={20} />
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
