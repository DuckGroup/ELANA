"use client";
import "./globals.css";
import { Header } from "./components/header";
import { useEffect, useMemo, useState } from "react";
import { getProducts, getProductsByTitle } from "@/lib/api";
import { Product } from "@/types/product";
import { ProductDisplay } from "./components/products/productDisplay";
import { CategoryFilter } from "./components/products/categoryFilter";
import { SearchBar } from "./components/searchBar";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error: unknown) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    for (const product of products) {
      if (product.category) unique.add(product.category);
    }
    return Array.from(unique);
  }, [products]);

  const visibleProducts = category
    ? products.filter((product) => product.category === category)
    : products;

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
      <section className="p-4 flex flex-col gap-4">
        <SearchBar
          onSearch={async (query) => {
            try {
              const result = await getProductsByTitle(query);
              setProducts(result ?? []);
              setCategory(null);
            } catch (error: unknown) {
              console.error("Search failed:", error);
              setProducts([]);
            }
          }}
          placeholder="search..."
        />
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />
      </section>
      <ProductDisplay products={visibleProducts} />
    </main>
  );
}
