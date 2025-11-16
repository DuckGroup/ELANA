import type { Request, Response } from "express";
import { ZodError } from "zod";
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from "../services/userService";
import {
  createUserSchema,
  updateUserSchema,
  getUserByIdSchema,
} from "../validators/user";
import { publishToQueue } from "../queues/connection";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error("Could not fetch users:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = getUserByIdSchema.parse({ id: req.params.id });
    const user = await getUserByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ success: false, errors: error.issues, message: "Invalid id" });
      return;
    }
    res.status(404).json({ message: (error as Error).message });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = createUserSchema.parse(req.body);

    const user = await createUserService(
      validatedData.email,
      validatedData.auth0Id
    );

    await publishToQueue({
      event: "create.basket",
      data: { user_id: user.id },
    });

    res.status(201).json({
      success: true,
      data: { user },
      message: "User and basket creation queued successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        errors: error.issues,
        message: "Invalid input data",
      });
      return;
    }
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
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
    const { id } = getUserByIdSchema.parse({ id: req.params.id });
    const user = await deleteUserService(id);
    res.status(200).json({ message: "User deleted", user });
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ success: false, errors: error.issues, message: "Invalid id" });
      return;
    }
    res.status(404).json({ message: (error as Error).message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = getUserByIdSchema.parse({ id: req.params.id });
    const validatedData = updateUserSchema.parse(req.body);
    const user = await updateUserService(id, validatedData);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof ZodError) {
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
