import {Router } from "express"; 
import { getUsers } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/users", getUsers);
// userRouter.get("/create", createUser);

export default userRouter;