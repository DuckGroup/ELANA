"use client";
import { useState } from "react";
import { createOrder, type CheckoutSession } from "@/lib/api";
import { Button } from "../button";

type Props = {
  basketId: string;
};

export const CheckoutButton = ({ basketId }: Props) => {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const checkout = await createOrder(basketId);
      setSession(checkout);
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return (
      <div className="flex flex-col gap-1 items-end text-right">
        <p className="font-medium text-primary">Order placed (mock checkout)</p>
        <p className="text-sm text-stone-600 break-all">
          {session.amountTotal} {session.currency.toUpperCase()} ·{" "}
          {session.checkoutUrl}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 items-end">
      <Button
        name={loading ? "Placing order..." : "Checkout"}
        buttonType="click"
        color="primary"
        textColor="white"
        onClick={handleCheckout}
      />
      {error && <p className="text-sm text-primary">{error}</p>}
    </div>
  );
};
