import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/prisma";
import {
  type CreateProductInput,
  type Product,
  type ProductUpdateData,
} from "../validators/product";
import { uploadImagesToCloudinary } from "../repositories/cloudinaryRepository";

export const createSingleProduct = async (
  data: CreateProductInput
): Promise<Product> => {
  try {
    const existingProduct = await prisma.product.findFirst({
      where: { title: data.title },
    });

    if (existingProduct) {
      throw new Error("A product with this title already exists");
    }

    const uploadedImageUrls = await uploadImagesToCloudinary(data.images || []);

    const product = await prisma.product.create({
      data: {
        ...data,
        images: uploadedImageUrls,
      },
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

export const filterProductsByTitle = async (
  data: string
): Promise<Product[] | null> => {
  try {
    const filteredProduct = await prisma.product.findMany({
      where: {
        title: {
          startsWith: data,
          mode: "insensitive",
        },
      },
    });
    if (!filteredProduct) throw Error("Could not find product");
    return filteredProduct;
  } catch (error) {
    throw Error("Failed to find product");
  }
};

export const findProductByTitle = async (
  data: string
): Promise<Product | null> => {
  try {
    const filteredProduct = await prisma.product.findFirst({
      where: {
        title: {
          startsWith: data,
          mode: "insensitive",
        },
      },
    });
    if (!filteredProduct) throw Error("Could not find product");
    return filteredProduct;
  } catch (error) {
    throw Error("Failed to find product");
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products: Product[] = await prisma.product.findMany();
    return products;
  } catch (error) {
    throw new Error("failed to fetch products from database");
  }
};

export const updateSingleProductDetails = async (
  id: string,
  data: ProductUpdateData
): Promise<Product> => {
  try {
    let uploadedImageUrls: string[] | undefined;

    if (data.images && data.images.length > 0) {
      uploadedImageUrls = await uploadImagesToCloudinary(data.images);
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        ...(uploadedImageUrls && { images: uploadedImageUrls }),
        updatedAt: new Date(),
      },
    });

    return updatedProduct;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error(`Product with id ${id} not found`);
      }
    }
    throw error instanceof Error
      ? error
      : new Error("Failed to update product");
  }
};

export const deleteSingleProduct = (data: string): Promise<Product> => {
  try {
    const deletedProduct = prisma.product.delete({
      where: {
        id: data,
      },
    });
    return deletedProduct;
  } catch (error) {
    throw new Error("failed to delete product");
  }
};
