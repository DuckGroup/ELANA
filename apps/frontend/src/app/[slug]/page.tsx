import { getProductByTitle } from "@/lib/api";
import { Button } from "../components/button";
import { Product } from "@/types/product";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const response: Product | null = await getProductByTitle(params.slug);
  console.log("wtf is going on?", response);
  const product = response;

  if (!product) {
    return (
      <main>
        <p>Product not found</p>
      </main>
    );
  }

  return (
    <main>
      <div>
      <h2 className="font-medium">{product.title}</h2>
      <p className="font-semibold text-2xl">{product.price} kr</p>
      </div>
      <p>{product.introduction}</p>
      <p>{product.body}</p>
      <p>{product.description}</p>
      <Button name="Add to cart" buttonType="click" color="primary"/>
    </main>
  );
}
