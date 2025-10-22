import { z } from "zod";

export const baseBasketSchema = z.object({
    product_ids: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"))
    .optional(),
    user_id: z.string()
});

export type Basket = z.infer<typeof baseBasketSchema>;