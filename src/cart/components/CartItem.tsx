import type { CartItem } from "../types";

interface CartItemProps {
  item: CartItem;
  onRemove: (productId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export default function CartItem({
  item,
  onRemove,
  onQuantityChange,
}: CartItemProps) {
  return (
    <article className="flex items-center gap-4 border-b py-4">
      {item.thumbnail && (
        <img src={item.thumbnail} alt="" className="h-20 w-20 object-contain" />
      )}

      <div className="flex-1">
        <h2 className="font-semibold">{item.title}</h2>

        <p>{item.price} kr</p>
      </div>

      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={(event) =>
          onQuantityChange(item.productId, Number(event.target.value))
        }
        className="w-16 rounded border px-2 py-1"
        aria-label={`Quantity for ${item.title}`}
      />

      <button
        type="button"
        onClick={() => onRemove(item.productId)}
        className="text-sm text-red-600"
      >
        Remove
      </button>
    </article>
  );
}
