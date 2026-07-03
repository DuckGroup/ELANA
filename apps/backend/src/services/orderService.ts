import { prisma } from "../../prisma/prisma";
import { OrderStatus } from "@prisma/client";
import { isValidObjectId } from "../repositories/validationRepository";
import { createCheckoutSession } from "./stripeService";


export const getOrderStatsService = async () => {
  const totalOrders = await prisma.order.count();

  const activeOrders = await prisma.order.count({
    where: { status: OrderStatus.ACTIVE }, 
  });

  const shippingOrders = await prisma.order.count({
    where: { status: OrderStatus.COMPLETED }, 
  });

  return {
    totalOrders,
    activeOrders,
    shippingOrders,
  };
};

export const getOrdersService = async () => {
  // Join in JS instead of nested includes: Basket.user is a required relation,
  // so a nested include throws if any referenced user/basket was deleted
  // (MongoDB does not enforce referential integrity). This tolerates orphans.
  const [orders, baskets, users, products] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.basket.findMany(),
    prisma.user.findMany(),
    prisma.product.findMany(),
  ]);

  const basketById = new Map(baskets.map((b) => [b.id, b]));
  const userById = new Map(users.map((u) => [u.id, u]));
  const productById = new Map(products.map((p) => [p.id, p]));

  return orders.map((order) => {
    const basket = basketById.get(order.basket_id);
    if (!basket) {
      return { ...order, basket: null };
    }
    return {
      ...order,
      basket: {
        ...basket,
        user: userById.get(basket.user_id) ?? null,
        products: basket.product_ids.flatMap((id) => {
          const product = productById.get(id);
          return product ? [product] : [];
        }),
      },
    };
  });
};

export const createOrderService = async (basket_id: string) => {
  isValidObjectId(basket_id);

  const basket = await prisma.basket.findUnique({
    where: { id: basket_id },
  });

  if (!basket) {
    throw new Error(`Basket with id ${basket_id} not found`);
  }

  if (basket.product_ids.length === 0) {
    throw new Error("Cannot create an order from an empty basket");
  }

  const existingOrder = await prisma.order.findUnique({
    where: { basket_id },
  });

  if (existingOrder) {
    throw new Error(`An order already exists for basket ${basket_id}`);
  }

  const order = await prisma.order.create({
    data: {
      basket_id,
      status: OrderStatus.PENDING,
    },
  });

  const checkout = await createCheckoutSession(basket_id);

  return { order, checkout };
};