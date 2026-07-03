import { Header } from "../components/header";
import { auth0 } from "@/lib/auth0";
import { getBasket, getUserById } from "@/lib/api";
import { Product } from "@/types/product";
import { redirect } from "next/navigation";

export default async function BasketPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  let products: Product[] = [];

  try {
    const user = await getUserById(session.user.sub);
    const basket = await getBasket(user.id);
    products = basket?.products ?? [];
  } catch (error) {
    console.error("Failed to load basket:", error);
  }

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
                <div
                  key={product.id}
                  className="flex items-center justify-between py-3"
                >
                  <span>{product.title}</span>
                  <span className="font-medium">{product.price} kr</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-stone-200 pt-4">
              <span className="text-lg font-medium">Total</span>
              <span className="text-lg font-medium">{total} kr</span>
            </div>
          </>
        )}
      </main>
    </>
  );
}
