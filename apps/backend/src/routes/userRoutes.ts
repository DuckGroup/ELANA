import {Router } from "express"; 
import { createUser, getUsers } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/create", createUser);

export default userRouter;