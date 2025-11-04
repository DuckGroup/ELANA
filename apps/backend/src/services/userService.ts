import { prisma } from "../../prisma/prisma";

export const getUsersService = async () => {
  const users = await prisma.user.findMany();
  if (!users) {
    throw new Error("No users found!");
  }
  return users;
};

export const createUserService = async (email: string, auth0Id: string) => {
  console.log("createUserService called with:", { email, auth0Id });
  if (!email || !auth0Id) {
    throw new Error("Missing email or auth0Id");
  }
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    console.log("User already exists:", existingUser.id);
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

export const getUserByIdService = async (auth0Id: string) => {
  console.log("Looking up user with auth0Id:", auth0Id);

  const user = await prisma.user.findUnique({
    where: { auth0Id },
  });

  if (!user) {
    console.error(`User with auth0Id ${auth0Id} not found`);
    throw new Error(`User with auth0Id ${auth0Id} not found`);
  }

  return user;
};

export const deleteUserService = async (id: string) => {
  const user = await prisma.user.delete({
    where: { id },
  });
  return user;
};

export const updateUserService = async (
  id: string,
  data: { email?: string; role?: string }
) => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return user;
};
