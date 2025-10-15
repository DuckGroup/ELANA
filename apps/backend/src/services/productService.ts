import { prisma } from "../../prisma/prisma";
import { Prisma } from "../generated/client";
import { type CreateProductInput, type Product } from "../validators/product";

export const createSingleProduct = async (data: CreateProductInput): Promise<Product> => {
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

export const getProductByTitle = async (data: Product) => {
  try {
      const filteredProduct: Product | null = await prisma.product.findFirst({
          where: {
              title: data.title
          }
      })
      return filteredProduct
  } catch (error) {

  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw new Error("failed to fetch products from database");
  }
};

export const updateSingleProduct = async (data: Product) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
      },
    });
    return updatedProduct;
  } catch (error) {
    throw new Error("failed to update product");
  }
};

export const deleteSingleProduct = (data: Product) => {
  // try {
  //     const deletedProduct = prisma.product.delete(
  //     )
  // } catch (error) {
  // }
};
