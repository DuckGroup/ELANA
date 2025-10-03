import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
  try {
    const URL = process.env.MONGODB_URI;
    if (!URL) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(URL);
    console.log("DataBase connected successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error while connecting to DataBase: ${error.message}`);
    }
  }
}

export default connectDB;
