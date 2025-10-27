import { prisma } from "../../prisma/prisma";

export const getUsersService = async () => {
  const users = await prisma.user.findMany();
  if (!users) {
    throw new Error("No users found!");
  }
  return users;
};

export const createUserService = async (email: string, auth0Id: string) => {
  if (!email || !auth0Id) {
    throw new Error("Missing email or auth0Id");
  }
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return existingUser; 
  }
  const user = await prisma.user.create({
    data: {
      email,
      auth0Id,
      role: "user",
    },
  });
  console.log("User synced:", user);
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

