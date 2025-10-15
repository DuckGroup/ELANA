import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  introduction: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  price: z.number().int().positive("Price must be a positive integer"),
  status: z.boolean().nullable().optional(),
  stock: z
    .number()
    .int()
    .nonnegative("Stock must be a non-negative integer")
    .nullable()
    .optional(),
  basket_ids: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"))
    .optional(),
});
export type CreateProductInput = z.infer<typeof createProductSchema>;

export const getProductByTitleSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export type GetProductByTitleInput = z.infer<typeof getProductByTitleSchema>;

export interface Product extends CreateProductInput {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  introduction: string | null;
  body: string | null;
  description: string | null;
  status: boolean | null;
  stock: number | null;
}
