import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";

const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/by-title", getProducts);

export default productRouter;
