import { prisma } from "../../prisma/prisma";
import { OrderStatus } from "@prisma/client";


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