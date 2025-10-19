import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/prisma";

export const createBasketService = async (user_id: string) => {
  try {
    const basket = await prisma.basket.create({
      data: {
        user_id: user_id,
        product_ids: [],
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("User already has a basket");
      }
    }
    throw new Error("Failed to create basket");
  }
};
export const deleteBasketService = async () => {};
export const addProductToBasketService = async () => {};

export const removeProductFromBasketService = async () => {};
