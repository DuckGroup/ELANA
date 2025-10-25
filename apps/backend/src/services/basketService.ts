import { type Basket, Prisma } from "@prisma/client";
import { prisma } from "../../prisma/prisma";

export const createBasketService = async (user_id: string): Promise<Basket> => {
  try {
    const basket = await prisma.basket.create({
      data: {
        user_id: user_id,
        product_ids: [],
      },
    });
    return basket;
  } catch (error) {
    throw new Error("Failed to create basket");
  }
};
export const deleteBasketService = async () => {};
export const addProductToBasketService = async () => {};

export const removeProductFromBasketService = async () => {};
