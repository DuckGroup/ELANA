import type { Request, Response } from "express";
import {
  createSingleProduct,
  deleteSingleProduct,
  filterProductsByTitle,
  findProductByTitle,
  getAllProducts,
  updateSingleProductDetails,
} from "../services/productService";
import {
  baseProductSchema,
  getProductByTitleSchema,
  updateProductSchema,
} from "../validators/product";
import z from "zod";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = baseProductSchema.parse(req.body);
    const product = await createSingleProduct(validatedData);
    
    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        errors: error,
        message: "Invalid input data",
      });
      return;
    }
    if (error instanceof Error) {
      res.status(error.message.includes("already exists") ? 409 : 500).json({
        success: false,
        message: error.message,
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
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

export const getProductsByTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = getProductByTitleSchema.parse(req.body);
    const product = await filterProductsByTitle(validatedData.title);
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

export const getProductByTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const title = req.params.title  
    if(!title) {
      return
    }
    const product = await findProductByTitle(title);
    res.status(200).json({
      success: true,
      data: product,
      message: "Product retrieved successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching product:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
      return;
    }

    const validatedData = updateProductSchema.partial().parse(req.body);
    const product = await updateSingleProductDetails(id, validatedData);

    res.status(200).json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        errors: error.issues,
        message: "Invalid input data",
      });
      return;
    }
    if (error instanceof Error) {
      const status = error.message.includes("not found") ? 404 : 500;
      res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
      return;
    }
    const product = await deleteSingleProduct(id);
    res.status(200).json({
      success: true,
      data: product,
      message: "Product deleted successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting product:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
};
