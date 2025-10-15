import { prisma } from "../../prisma/prisma";
import { createProductSchema } from "../validators/product";
import type { Request, Response } from "express";

export const createSingleProduct = async (
    req: Request, 
    res: Response
) => {
    try {
  const validatedData = createProductSchema.parse(req.body);

  const product = await prisma.product.create({
    data: validatedData,
  });
  return product;
} catch (error) {
    res.status(500).json({ message: "error creating single product"});
  }
};
