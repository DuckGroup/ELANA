import { PrismaClient } from "@prisma/client";
import type { Response, Request } from "express";
import { prisma } from "../../prisma/prisma";

export const getUsersService = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
    console.log(!users);
    if (!users) {
      res.status(400).json("no users found");
      return;
    }
    return users;
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(400).json({ message: "Error fetching user" });
  }
};

export const createUserService = async (email: string, role: string) => {
  if (!email)
    throw new Error("No email", {
      cause: "400",
    });
  const user = await prisma.user.create({
    data: {
      email,
      role: role || "user",
    },
  });
  console.log("User created:", user);
  return user;
};
