import { Product } from "@/types/product";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { User } from "@/types/user";
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
    console.log(res);
    const products = res.data.data;
    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("Error fetching products by title:", error);
    return [];
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