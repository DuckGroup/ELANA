import { Product } from "@/types/product";
import { ProductCard } from "./productCard";
type Props = {
  products: Product[];
};
export const ProductDisplay = ({
    products
}: Props) => {
  return (
    <section className="flex flex-wrap p-4 gap-4">
      {products.length > 0 ? (
        products.map((product: Product) => (
          <ProductCard
            key={product.id}
            image="/elana_logo.svg"
            title={product.title}
            price={product.price}
          />
        ))
      ) : (
        <p>No products listed, come back next time!</p>
      )}
    </section>
  );
};
