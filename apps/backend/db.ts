import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully with Prisma");
  } catch (error) {
    console.error("Error while connecting to database:", error);
    process.exit(1);
  }
}

export { prisma, connectDB };
