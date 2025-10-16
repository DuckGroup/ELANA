import { PrismaClient } from "@prisma/client";
import type { Response, Request } from "express";
import { prisma } from "../../prisma/prisma";

export const getUsersService = async () => {
  const users = await prisma.user.findMany();
  if (!users) {
    throw new Error("No users found!");
  }
  return users;
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
