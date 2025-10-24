import "./globals.css";
import { Header } from "./components/header";
import { useEffect, useState } from "react";
type Product = {
  title: string;
  price: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  introduction?: string | null;
  body?: string | null;
  description?: string | null;
  status?: boolean | null;
  stock?: number | null;
  basket_ids?: string[];
};

export default function Home() {
  //   const [products, setProducts] = useState<Product[]>([]);
  //   const apiBase = process.env.NEXT_PUBLIC_API_BASE!;

  //   useEffect(() => {
  //     // const session = await auth0.getSession();
  //     async function fetchFromBackend() {
  //       try {
  //         const res = await fetch(`${apiBase}/product`, {
  //           method: "GET",

  //           headers: {
  //             "Accept": "application/json"
  //           }
  //         });

  //         if (!res.ok) {
  //           throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  //         }

  //         const data = await res.json();
  //         setBackendData(data);
  //       } catch (err: any) {
  //         if (err.name === "AbortError") return;
  //         setError(err.message || "Unknown error");
  //       }
  //     }

  //     fetchFromBackend();
  //   }, [])
  return (
    <main>
      <Header></Header>
      <section className="bg-secondary h-105 flex items-center p-4">
        <h1 className="font-medium">
          <span className="text-primary">New</span> season. <br />
          Never known <span className="text-primary">designs</span>.
        </h1>
      </section>
    </main>
  );

  {
  }
}
