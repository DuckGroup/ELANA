import { PrismaClient } from "@prisma/client/extension";
import { Router } from "express";

const prisma = new PrismaClient();

export const authRouter = Router();

authRouter.post("/auth/sync", async (req, res) => {
  try {
    const { email, auth0Id } = req.body;

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email, auth0Id },
      });
    }
    res.json(user);
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ message: "Failed to sync user" });
  }
});