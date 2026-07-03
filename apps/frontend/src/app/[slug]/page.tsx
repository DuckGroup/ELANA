import { getBasket, getProductByTitle, getUserById } from "@/lib/api";
import { Product } from "@/types/product";
import Image from "next/image";
import { Header } from "../components/header";
import { SizePicker } from "../components/products/sizePicker";
import { AddToCart } from "../components/products/addToCart";
import { auth0 } from "@/lib/auth0";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product: Product | null = await getProductByTitle(slug);

  if (!product) {
    return (
      <main>
        <p>Product not found</p>
      </main>
    );
  }

  const session = await auth0.getSession();
  let basketId: string | null = null;

  if (session) {
    try {
      const user = await getUserById(session.user.sub);
      const basket = await getBasket(user.id);
      basketId = basket?.id ?? null;
    } catch (error) {
      console.error("Failed to load basket:", error);
    }
  }

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center lg:flex-row">
        <Image
          alt={product.title}
          src={product.image || "/goldring.webp"}
          width={720}
          height={720}
          className="w-full max-w-[720px] h-auto object-cover"
        />
        <section className="flex flex-col px-4 py-2 gap-4 justify-center max-w-156">
          <div>
            <h2 className="font-medium text-3xl">{product.title}</h2>
            <p className="font-medium text-2xl text-stone-700">
              {product.price} kr
            </p>
            <p className="text-stone-600 pt-2">{product.introduction}</p>
          </div>
          <SizePicker sizes={product.size} />
          <AddToCart basketId={basketId} productId={product.id} />
          <div className="flex flex-col gap-6">
            <p className="text-stone-600">{product.body}</p>
            <p>{product.description}</p>
          </div>
        </section>
      </main>
    </>
  );
}
