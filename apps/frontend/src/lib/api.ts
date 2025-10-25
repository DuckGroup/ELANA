import { Product } from "@/types/product";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3012";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Accept": "application/json",
  },
  withCredentials: true,
});

export async function getProducts(): Promise<Product[]> {
  const res = await api.get("/product");
  return Array.isArray(res.data.data) ? res.data.data : [];
}