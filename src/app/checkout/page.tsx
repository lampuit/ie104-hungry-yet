import { Checkout } from "@/components/checkout/checkout";
import { fetchCarts } from "@/lib/data";

export default async function CheckoutPage() {
  const carts = await fetchCarts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <Checkout carts={carts} />
    </div>
  );
}
