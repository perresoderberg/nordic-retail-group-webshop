import CartList from "../cart/components/CartList";
import CartSummary from "../cart/components/CartSummary";
import { useCart } from "../cart/useCart";

export default function Basket() {
  const { items, total, removeItem, setQuantity } = useCart();

  return (
    <section className="mx-auto w-[90%] max-w-7xl py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping cart</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        <CartList
          items={items}
          onRemove={removeItem}
          onQuantityChange={setQuantity}
        />

        <CartSummary total={total} />
      </div>
    </section>
  );
}
