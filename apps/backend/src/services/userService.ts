import { PrismaClient } from "@prisma/client";
import type { Response, Request } from "express";
import { prisma } from "../../prisma/prisma";

export const getUsersService = async (req: Request, res: Response) => {
     try {
       const users = await prisma.user.findMany();
       console.log(users)
       console.log(!users)
       if (!users) {
         res.status(400).json("no users found");
         return;
       }
       return users;
     } catch (error) {
       console.error("Error fetching user:", error);
       res.status(400).json({ message: "Error fetching user" });
     }
}