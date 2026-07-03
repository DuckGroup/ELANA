import { Product } from "./product";

export type Basket = {
  id: string;
  user_id: string;
  product_ids: string[];
  products: Product[];
  createdAt: string;
  updatedAt: string;
};
