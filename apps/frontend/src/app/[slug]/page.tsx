import { getProductByTitle } from "@/lib/api";
import { Button } from "../components/button";
import { Product } from "@/types/product";
import Image from "next/image";
import { Header } from "../components/header";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response: Product | null = await getProductByTitle(slug);
  console.log(response)
  const product = response;

  if (!product) {
    return (
      <main>
        <p>Product not found</p>
      </main>
    );
  }

  return (
    <>
    <Header/>
    <main className="flex flex-col justify-center lg:flex-row">
    <Image alt="image of a ring" src="/goldring.webp" width={720} height={720}/>
    <section className="flex flex-col px-4 py-2 gap-4 justify-center max-w-156">
      <div>
      <h2 className="font-medium text-3xl">{product.title}</h2>
      <p className="font-medium text-2xl text-stone-700">{product.price} kr</p>
      <p className="text-stone-600 pt-2">{product.introduction}</p>
      </div>
      <Button name="Add to cart" buttonType="click" color="primary" textColor="white"/>
      <div className="flex flex-col gap-6">
      <p className="text-stone-600">{product.body}</p>
      <p>{product.description}</p>
      </div>
    </section>
    </main>
    </>
  );
}
