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
    const { email, auth0Id } = req.body;

    if (!email || !auth0Id) {
      res.status(400).json({ message: "Missing email or auth0Id" });
      return;
    }
    const user = await createUserService(email, auth0Id);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Failed to create user",
      error: (error as Error).message,
    });
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
