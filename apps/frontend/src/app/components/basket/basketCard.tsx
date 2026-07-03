"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeFromBasket } from "@/lib/api";
import { Product } from "@/types/product";

type Props = {
  basketId: string;
  product: Product;
};

export const BasketCard = ({ basketId, product }: Props) => {
  const router = useRouter();
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await removeFromBasket(basketId, product.id);
      router.refresh();
    } catch (error) {
      console.error("Failed to remove from basket:", error);
      setRemoving(false);
    }
  };

  return (
    <article className="flex items-center gap-4 py-3">
      <div className="relative w-20 h-20 shrink-0 bg-secondary/40">
        <Image
          src={product.image || "/elana_logo.svg"}
          alt={product.title}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col grow">
        <span className="font-medium">{product.title}</span>
        {product.category && (
          <span className="text-sm text-stone-500 uppercase">
            {product.category}
          </span>
        )}
      </div>
      <span className="font-medium whitespace-nowrap">{product.price} kr</span>
      <button
        type="button"
        onClick={handleRemove}
        disabled={removing}
        className="text-sm text-stone-500 hover:text-primary disabled:opacity-50 transition-colors"
      >
        {removing ? "Removing..." : "Remove"}
      </button>
    </article>
  );
};
