import type { Response, Request } from "express";
import { createUserService, getUsersService } from "../services/userService";
import { PrismaClient } from "@prisma/client/extension";
import { prisma } from "../../prisma/prisma";

export const getUsers = async (req: Request, res: Response): Promise<void> =>{
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error){
        console.error("Could not fetch users:", error);
        res.status(400).json({ message: (error as Error).message});
    }
}

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validera att email och role finns här
    const user = await createUserService(req.body.email, req.body.role);
    if (!res.headersSent) {
      res.status(201).json(user);
    }
  } catch (error) {
    const err = error as Error;

    if (err.cause) {
      res.status(Number(err.cause)).json({ message: err.message, error });
    }
    res.status(500).json({ message: "Error creating user", error });
  }
};
