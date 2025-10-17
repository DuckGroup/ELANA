import type { Response, Request } from "express";
import { createUserService, deleteUserService, getUserByIdService, getUsersService, updateUserService } from "../services/userService";
import { PrismaClient } from "@prisma/client/extension";
import { prisma } from "../../prisma/prisma";

interface UserIdParams {
    id: string;
  }

export const getUsers = async (req: Request, res: Response): Promise<void> =>{
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error){
        console.error("Could not fetch users:", error);
        res.status(400).json({ message: (error as Error).message});
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
    
     const user = await getUserByIdService(req.params.id as string)   
     res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message});
    }

}

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await deleteUserService(req.params.id as string);
      res.status(200).json({ message: "User deleted", user });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await updateUserService(req.params.id as string, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
