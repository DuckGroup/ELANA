import { Router } from "express";
import { createProduct } from "../controllers/productController";

const productRouter = Router();

productRouter.post("/create", createProduct);

export default productRouter;
