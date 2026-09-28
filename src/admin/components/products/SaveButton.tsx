import { useFormStatus } from "react-dom";

export function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="rounded p-2 text-white bg-accent hover:bg-warning"
      type="submit"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
