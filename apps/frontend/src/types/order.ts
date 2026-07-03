import { Product } from "./product";
import { User } from "./user";

export type OrderStatus = "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED";

export type Order = {
  id: string;
  basket_id: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  basket?: {
    id: string;
    user?: User | null;
    products?: Product[];
  } | null;
};
