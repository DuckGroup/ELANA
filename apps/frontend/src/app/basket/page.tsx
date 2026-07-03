import { Header } from "../components/header";
import { auth0 } from "@/lib/auth0";
import { getBasket, getUserById } from "@/lib/api";
import { Basket } from "@/types/basket";
import { BasketCard } from "../components/basket/basketCard";
import { CheckoutButton } from "../components/basket/checkoutButton";
import { redirect } from "next/navigation";

export default async function BasketPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  let basket: Basket | null = null;

  try {
    const user = await getUserById(session.user.sub);
    basket = await getBasket(user.id);
  } catch (error) {
    console.error("Failed to load basket:", error);
  }

  const products = basket?.products ?? [];
  const basketId = basket?.id ?? "";
  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <>
      <Header />
      <main className="flex flex-col px-4 py-6 gap-6 max-w-3xl mx-auto w-full">
        <h1 className="font-medium">Your basket</h1>

        {products.length === 0 ? (
          <p className="text-stone-600">Your basket is empty.</p>
        ) : (
          <>
            <div className="flex flex-col divide-y divide-stone-200">
              {products.map((product) => (
                <BasketCard
                  key={product.id}
                  basketId={basketId}
                  product={product}
                />
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-stone-200 pt-4">
              <span className="text-lg font-medium">Total</span>
              <span className="text-lg font-medium">{total} kr</span>
            </div>
            <CheckoutButton basketId={basketId} />
          </>
        )}
      </main>
    </>
  );
}
