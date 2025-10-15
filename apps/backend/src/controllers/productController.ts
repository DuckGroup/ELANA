import type { Request, Response } from "express";
import { createSingleProduct } from "../services/productService";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await createSingleProduct(req, res)
    res.status(200).json(user)
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
