import { Prisma, type Basket } from "@prisma/client";
import { prisma } from "../../prisma/prisma";

export const createBasketService = async (user_id: string): Promise<Basket> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new Error(`User with id ${user_id} not found`);
    }

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

export const getBasketByUserIdService = async (
  user_id: string
): Promise<Basket | null> => {
  try {
    const basket = await prisma.basket.findUnique({
      where: { user_id },
      include: {
        products: true,
        user: true,
      },
    });

    return basket;
  } catch (error) {
    throw new Error("Failed to fetch basket");
  }
};

export const deleteBasketService = async (
  basket_id: string
): Promise<Basket> => {
  try {
    const existingBasket = await prisma.basket.findUnique({
      where: { id: basket_id },
    });

    if (!existingBasket) {
      throw new Error(`Basket with id ${basket_id} not found`);
    }

    const deletedBasket = await prisma.basket.delete({
      where: { id: basket_id },
    });

    return deletedBasket;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error("Basket not found");
      }
    }
    throw error instanceof Error ? error : new Error("Failed to delete basket");
  }
};
export const addProductToBasketService = async (basket_id: string,
  product_id: string
): Promise<Basket> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      throw new Error(`Product with id ${product_id} not found`);
    }

    const basket = await prisma.basket.findUnique({
      where: { id: basket_id },
    });

    if (!basket) {
      throw new Error(`Basket with id ${basket_id} not found`);
    }

    const updatedBasket = await prisma.basket.update({
      where: { id: basket_id },
      data: {
        product_ids: {
          push: product_id,
        },
      },
      include: {
        products: true,
      },
    });

    return updatedBasket;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error("Basket or product not found");
      }
    }
    throw error instanceof Error
      ? error
      : new Error("Failed to add product to basket");
  }
};
export const removeProductFromBasketService = async (
  basket_id: string,
  product_id: string
): Promise<Basket> => {
  try {
    const basket = await prisma.basket.findUnique({
      where: { id: basket_id },
    });

    if (!basket) {
      throw new Error(`Basket with id ${basket_id} not found`);
    }

    if (!basket.product_ids.includes(product_id)) {
      throw new Error("Product not found in basket");
    }

    const updatedProductIds = basket.product_ids.filter(
      (id) => id !== product_id
    );

    const updatedBasket = await prisma.basket.update({
      where: { id: basket_id },
      data: {
        product_ids: updatedProductIds,
      },
      include: {
        products: true,
      },
    });

    return updatedBasket;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error("Basket not found");
      }
    }
    throw error instanceof Error
      ? error
      : new Error("Failed to remove product from basket");
  }
};
