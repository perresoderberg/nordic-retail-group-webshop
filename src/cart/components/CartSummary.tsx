interface CartSummaryProps {
  itemCount: number;
  total: number;
}

export default function CartSummary({ itemCount, total }: CartSummaryProps) {
  return (
    <section className="rounded bg-gray-100 p-6">
      <h2 className="mb-4 text-xl font-semibold">Order summary</h2>

      <div className="flex justify-between">
        <span>Items</span>
        <span>{itemCount}</span>
      </div>

      <div className="mt-4 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>{total.toFixed(2)} kr</span>
      </div>
    </section>
  );
}
