import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  introduction: z.string().optional(),
  body: z.string().optional(),
  description: z.string().optional(),
  price: z.number().int().positive("Price must be a positive integer"),
  status: z.boolean().optional(),
  stock: z
    .number()
    .int()
    .nonnegative("Stock must be a non-negative integer")
    .optional(),
  basket_ids: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"))
    .optional(),
});
export type CreateProductInput = z.infer<typeof createProductSchema>;

export type Product = {
  id: string;
  title: string;
  introduction: string | null;
  body: string | null;
  description: string | null;
  price: number;
  status: boolean | null;
  stock: number | null;
  basket_ids: string[];
  createdAt: Date;
  updatedAt: Date;
};
