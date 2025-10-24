import { z } from "zod";

export const baseProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  introduction: z.string().nullable(),
  body: z.string().nullable(),
  description: z.string().nullable(),
  price: z.number().int().positive("Price must be a positive integer"),
  status: z.boolean().nullable(),
  stock: z
    .number()
    .int()
    .nonnegative("Stock must be a non-negative integer")
    .nullable(),
  basket_ids: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")),
});

export type CreateProductInput = z.infer<typeof baseProductSchema>;

export const productSchema = baseProductSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Product = z.infer<typeof productSchema>;

export const updateProductSchema = productSchema.extend({
  id: z.string(),
});
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export type ProductUpdateData = Partial<Omit<Product, "id" | "createdAt">>;
export const getProductByTitleSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export type GetProductByTitleInput = z.infer<typeof getProductByTitleSchema>;