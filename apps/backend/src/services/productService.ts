import { prisma } from "../../prisma/prisma";
import { Prisma } from "../generated/client";
import { type CreateProductInput, type Product } from "../validators/product";

export const createSingleProduct = async (data: CreateProductInput) => {
  const existingProduct: Product | null = await prisma.product.findFirst({
    where: { title: data.title },
  });

  if (existingProduct) {
    throw new Error("A product with this title already exists");
  }

  try {
    const product = await prisma.product.create({
      data: data,
    });

    return product;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("A product with this title already exists");
      }
      if (error.code === "P2025") {
        throw new Error("One or more basket IDs do not exist");
      }
    }
    throw new Error("Failed to create product");
  }
};