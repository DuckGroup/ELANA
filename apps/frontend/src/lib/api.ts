import { Product } from "@/types/product";
import { getAccessToken } from "@auth0/nextjs-auth0";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3012";

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
  const res = await api.get("/product");
  const products = res.data.data;

  return Array.isArray(products) ? products : [];
}

export async function getProductsByTitle(query: string): Promise<Product[]> {
  const res = await api.post("/product/by-title", { title: query });
  console.log(res);
  const products = res.data.data;
  return Array.isArray(products) ? products : [];
}
