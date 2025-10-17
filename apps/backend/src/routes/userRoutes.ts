import {Router } from "express"; 
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUserById)
userRouter.post("/users", createUser);
userRouter.delete("/users/:id", deleteUser);
userRouter.patch("/users/:id", updateUser);


export default userRouter;