import { z } from "zod";

export const emailValidation = z
  .string()
  .email("Invalid email format. Example: user@example.com");

export const roleValidation = z
  .enum(["admin", "user", "guest"])
  .optional();

export const objectIdValidation = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

export const baseUserSchema = z.object({
  email: emailValidation,
  role: roleValidation,
  auth0Id: z.string().optional(),
});

export const userSchema = baseUserSchema.extend({
  id: objectIdValidation,
  // basket: z.any().optional(),  Could later be replaced with Basket type
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const updateUserSchema = baseUserSchema.partial();

export const getUserByIdSchema = z.object({
  id: objectIdValidation,
});

export type BaseUserInput = z.infer<typeof baseUserSchema>;
export type User = z.infer<typeof userSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;
