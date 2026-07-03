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
  const orders = await prisma.order.findMany({
    include: {
      basket: {
        include: { user: true, products: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return orders;
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