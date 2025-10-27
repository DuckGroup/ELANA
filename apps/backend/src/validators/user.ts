import { z } from "zod";

export const emailValidation = z.string().email("Invalid email format. Example: user@example.com");

export const roleValidation = z.enum(["admin", "user", "guest"]).optional();

export const idValidation = z.string().min(1, "ID is required");

export const baseUserSchema = z.object({
  email: emailValidation,
  role: roleValidation,
  auth0Id: z.string().optional(),
});

export const createUserSchema = baseUserSchema.extend({
  auth0Id: z.string(),
});

const dateFromString = z.preprocess((arg) => {
  if (arg instanceof Date) return arg;
  if (typeof arg === "string") return new Date(arg);
  return undefined;
}, z.date());

export const userSchema = baseUserSchema.extend({
  id: idValidation,
  createdAt: dateFromString,
  updatedAt: dateFromString,
});

export const updateUserSchema = baseUserSchema.partial();

export const getUserByIdSchema = z.object({
  id: idValidation,
});

export type BaseUserInput = z.infer<typeof baseUserSchema>;
export type User = z.infer<typeof userSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;