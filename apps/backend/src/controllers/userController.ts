import type { Response, Request } from "express";
import { getUsersService } from "../services/userService";
import { PrismaClient } from "@prisma/client/extension";
import { prisma } from "../../prisma/prisma";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getUsersService(req, res)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};