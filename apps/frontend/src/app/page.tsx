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
      <Header />

      <section className="bg-secondary">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-4">
          <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
            New season
          </span>
          <h1 className="font-medium text-4xl md:text-5xl max-w-2xl leading-tight">
            Timeless pieces,
            <br />
            <span className="text-primary">never known</span> designs.
          </h1>
          <p className="text-stone-600 max-w-xl">
            Handpicked jewelry for every day and every occasion.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
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
            placeholder="Search products..."
          />
          <CategoryFilter
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium">New arrivals</h2>
          <ProductDisplay products={visibleProducts} />
        </div>
      </div>
    </main>
  );
}
