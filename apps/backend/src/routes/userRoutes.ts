import {Router } from "express"; 
import { createUser, getUsers } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.post("/users", createUser);

export default userRouter;