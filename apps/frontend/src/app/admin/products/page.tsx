"use client";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@/lib/api";
import { Product } from "@/types/product";
import { ProductForm } from "../../components/admin/productForm";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSaved = () => {
    setShowForm(false);
    setEditing(null);
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const startCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const startEdit = (product: Product) => {
    setEditing(product);
    setShowForm(true);
  };

  return (
    <main className="flex flex-col px-4 py-2 w-full gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={startCreate}
          className="px-4 py-2 bg-primary text-white text-sm rounded"
        >
          New product
        </button>
      </div>

      {showForm && (
        <ProductForm
          initial={editing}
          onSaved={handleSaved}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {products.length === 0 ? (
        <p className="text-stone-500">No products yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-2 p-4 border border-stone-200 rounded-lg bg-white"
            >
              <div className="flex justify-between">
                <span className="font-medium">{product.title}</span>
                <span className="text-stone-600">{product.price} kr</span>
              </div>
              <span className="text-xs text-stone-500 uppercase">
                {product.category || "uncategorized"}
              </span>
              <span className="text-xs text-stone-500">
                Stock: {product.stock ?? "—"}
              </span>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => startEdit(product)}
                  className="flex-1 px-3 py-1.5 bg-stone-100 text-stone-700 text-sm rounded hover:bg-stone-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 px-3 py-1.5 bg-stone-100 text-primary text-sm rounded hover:bg-stone-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
