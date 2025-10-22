import type { Response, Request } from "express";
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from "../services/userService";
import {
  baseUserSchema,
  updateUserSchema,
  getUserByIdSchema,
} from "../validators/user";
import z from "zod";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error("Could not fetch users:", error);
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await getUserByIdService(req.params.id as string);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = baseUserSchema.parse(req.body);

    const user = await createUserService(
      validatedData.email,
      validatedData.role as string
    );

    res.status(201).json(user);
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
      res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await deleteUserService(req.params.id as string);
    res.status(200).json({ message: "User deleted", user });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    const user = await updateUserService(
      req.params.id as string,
      validatedData
    );

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        errors: error.issues,
        message: "Invalid input data",
      });
      return;
    }
    res.status(400).json({ message: (error as Error).message });
  }
};
