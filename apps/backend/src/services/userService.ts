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

export const getUserByIdService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {id},
  })
  if (!user) throw new Error (`User with id ${id} not found`)
  return user;
}

export const deleteUserService = async (id: string) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  return user;
};

export const updateUserService = async (id: string, data: {email?: string, role?: string}) => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return user;
};

