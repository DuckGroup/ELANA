import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";

const productRouter = Router();

productRouter.post("/create", createProduct);
productRouter.get("/products", getProducts);

export default productRouter;
