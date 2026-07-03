import { prisma } from "../../prisma/prisma";

// Mock Stripe checkout for the demo. No real Stripe API is called and no
// keys are needed. When STRIPE_SECRET_KEY is added later, this is the single
// place to swap in a real stripe.checkout.sessions.create() call.

export interface CheckoutSession {
  sessionId: string;
  checkoutUrl: string;
  amountTotal: number;
  currency: string;
}

export const createCheckoutSession = async (
  basket_id: string
): Promise<CheckoutSession> => {
  const basket = await prisma.basket.findUnique({
    where: { id: basket_id },
    include: { products: true },
  });

  if (!basket) {
    throw new Error(`Basket with id ${basket_id} not found`);
  }

  const amountTotal = basket.products.reduce(
    (sum, product) => sum + product.price,
    0
  );

  const sessionId = `cs_mock_${basket_id}`;
  const checkoutUrl = `https://checkout.stripe.com/mock/${sessionId}`;

  return {
    sessionId,
    checkoutUrl,
    amountTotal,
    currency: "sek",
  };
};
