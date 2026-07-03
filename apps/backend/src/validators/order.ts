import { z } from "zod";

export const createOrderSchema = z.object({
  basket_id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid basket_id"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
