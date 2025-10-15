import type { Request, Response } from "express";
import {
  createSingleProduct,
  getAllProducts,
  getProductByTitle,
} from "../services/productService";
import {
  createProductSchema,
  getProductByTitleSchema,
} from "../validators/product";
import z from "zod";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("hello");
    const validatedData = createProductSchema.parse(req.body);
    const product = await createSingleProduct(validatedData);
    res.status(200).json(product);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        errors: error.message,
        message: "Invalid input data",
      });
      return;
    } else if (error instanceof Error)
      res.status(error.message.includes("already exists") ? 409 : 400).json({
        success: false,
        message: error.message,
      });
  }
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await getAllProducts();
    res.status(200).json({
      success: true,
      data: products,
      message: "Products retrieved successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = getProductByTitleSchema.parse(req.body);
    const product = await getProductByTitle(validatedData.title);
    res.status(200).json({
      success: true,
      data: product,
      message: "Product retrieved successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
};
