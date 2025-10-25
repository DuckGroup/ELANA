"use client";
import "./globals.css";
import { Header } from "./components/header";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import { ProductDisplay } from "./components/products/productDisplay";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const apiBase = process.env.NEXT_PUBLIC_API_BASE! || "";

  useEffect(() => {
    // const session = await auth0.getSession();
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error: unknown) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, [apiBase]);
  return (
    <main>
      <Header></Header>
      <section className="bg-secondary h-96 flex items-center p-4">
        <h1 className="font-medium">
          <span className="text-primary">New</span> season.
          <br />
          Never known <span className="text-primary">designs</span>.
        </h1>
      </section>

      <ProductDisplay products={products} />
    </main>
  );
}
