"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToBasket } from "@/lib/api";
import { Button } from "../button";

type Props = {
  basketId: string | null;
  productId: string;
};

export const AddToCart = ({ basketId, productId }: Props) => {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "added">("idle");

  if (!basketId) {
    return (
      <Button
        name="Log in to add to cart"
        buttonType="link"
        route="/auth/login"
        color="primary"
        textColor="white"
      />
    );
  }

  const handleAdd = async () => {
    setStatus("loading");
    try {
      await addToBasket(basketId, productId);
      setStatus("added");
      router.refresh();
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setStatus("idle");
    }
  };

  const label =
    status === "added"
      ? "Added to cart"
      : status === "loading"
        ? "Adding..."
        : "Add to cart";

  return (
    <Button
      name={label}
      buttonType="click"
      color="primary"
      textColor="white"
      onClick={handleAdd}
    />
  );
};
