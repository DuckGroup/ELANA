import type { Request, Response } from "express";
import { prisma } from "../../db";

export const checkUser = async (req: Request, res: Response): Promise<void> => {
  const rawAuth0Id = req.headers.auth0Id;
  console.log(rawAuth0Id)
  const auth0Id =
    typeof rawAuth0Id === "string"
      ? rawAuth0Id
      : Array.isArray(rawAuth0Id) && typeof rawAuth0Id[0] === "string"
      ? rawAuth0Id[0]
      : undefined;

  if (!auth0Id) {
    res.status(404).json({
      success: false,
      data: auth0Id,
      message: "Invalid data, could not find user in database",
    });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      auth0Id: auth0Id,
    },
  });
  if (!user) {
    res.status(400).json({
      success: false,
      data: user,
      message: "Invalid data, could not find user in database",
    });
    return;
  }
};
