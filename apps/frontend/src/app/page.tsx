"use client";
import "./globals.css";
import { Header } from "./components/header";
import { useEffect, useState } from "react";
import { getProducts, getProductsByTitle } from "@/lib/api";
import { Product } from "@/types/product";
import { ProductDisplay } from "./components/products/productDisplay";
import { SearchBar } from "./components/searchBar";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("GEt products")
        const data = await getProducts();
        setProducts(data);
      } catch (error: unknown) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

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
      <section className="p-4">
        <SearchBar
          onSearch={async (query) => {
            try {
              const result = await getProductsByTitle(query);
              console.log(result)
              setProducts(result ?? []);
            } catch (error: unknown) {
              console.error("Search failed:", error);
              setProducts([]);
            }
          }}
          placeholder="search..."
        />
      </section>
      <ProductDisplay products={products} />
    </main>
  );
}
