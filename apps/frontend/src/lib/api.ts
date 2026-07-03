import { Product } from "@/types/product";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { User } from "@/types/user";
import { Basket } from "@/types/basket";
import { Order } from "@/types/order";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3013";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async function (config) {
    let token;
    try {
      token = (await getAccessToken().catch()) || "";
    } catch (error) {
      token = "";
    }

    config.headers.Authorization = `Bearer ${token}`;

    console.log("Intercepted and added access token: ", token);

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await api.get("/product");
    const products = res.data.data;
    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductsByTitle(query: string): Promise<Product[]> {
  try {
    const res = await api.post("/product/by-title", { title: query });
    const products = res.data.data;
    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("Error fetching products by title:", error);
    return [];
  }
}

export async function getProductByTitle(query: string): Promise<Product | null> {
  try {
    const res = await api.get(`/product/${query}`);
    const product = res.data.data;
    console.log(product)
    return product;
  } catch (error) {
    console.error("Error fetching product by title:", error);
    return null;
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const res = await api.get("/users");
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function updateUser(
  id: string,
  data: { email?: string; role?: string }
): Promise<User> {
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
}

export interface OrderStats {
  totalOrders: number;
  activeOrders: number;
  shippingOrders: number;
}

export async function getOrderStats(): Promise<OrderStats> {
  const res = await api.get("/orders/stats");
  return res.data.data;
}

export async function getUserById(id: string): Promise<User> {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function getBasket(userId: string): Promise<Basket | null> {
  try {
    const res = await api.get(`/basket/${userId}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching basket:", error);
    return null;
  }
}

export async function addToBasket(
  basketId: string,
  productId: string
): Promise<void> {
  await api.post("/basket/add-product", {
    basket_id: basketId,
    product_id: productId,
  });
}

export async function removeFromBasket(
  basketId: string,
  productId: string
): Promise<void> {
  await api.delete("/basket/remove-product", {
    data: { basket_id: basketId, product_id: productId },
  });
}

export interface CheckoutSession {
  sessionId: string;
  checkoutUrl: string;
  amountTotal: number;
  currency: string;
}

export async function createOrder(basketId: string): Promise<CheckoutSession> {
  const res = await api.post("/orders", { basket_id: basketId });
  return res.data.checkout;
}

export async function getOrders(): Promise<Order[]> {
  try {
    const res = await api.get("/orders");
    const orders = res.data.data;
    return Array.isArray(orders) ? orders : [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export type ProductInput = {
  title: string;
  introduction: string | null;
  body: string | null;
  description: string | null;
  price: number;
  status: boolean | null;
  stock: number | null;
  category: string | null;
  size: string[];
  image: string | null;
  basket_ids: string[];
};

export async function createProduct(data: ProductInput): Promise<Product> {
  const res = await api.post("/product/create", data);
  return res.data;
}

export async function updateProduct(
  id: string,
  data: Partial<ProductInput>
): Promise<Product> {
  const res = await api.put(`/product/${id}`, data);
  return res.data.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/product/${id}`);
}
