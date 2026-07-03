"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import { createProduct, updateProduct } from "@/lib/api";

type Props = {
  initial?: Product | null;
  onSaved: () => void;
  onCancel: () => void;
};

const inputClass =
  "border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary";

export const ProductForm = ({ initial, onSaved, onCancel }: Props) => {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [stock, setStock] = useState(
    initial?.stock != null ? String(initial.stock) : ""
  );
  const [sizes, setSizes] = useState((initial?.size ?? []).join(", "));
  const [introduction, setIntroduction] = useState(initial?.introduction ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [inStock, setInStock] = useState(initial?.status ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const sizeList = sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      introduction: introduction || null,
      body: null,
      description: description || null,
      price: Number(price),
      status: inStock,
      stock: stock === "" ? null : Number(stock),
      category: category || null,
      size: sizeList,
      image: image || null,
      basket_ids: [],
    };

    try {
      if (initial) {
        await updateProduct(initial.id, payload);
      } else {
        await createProduct(payload);
      }
      onSaved();
    } catch (err) {
      console.error("Failed to save product:", err);
      setError("Failed to save product. Check the fields and try again.");
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 border border-stone-200 rounded-lg bg-white"
    >
      <h3 className="font-semibold">
        {initial ? "Edit product" : "New product"}
      </h3>

      <input
        className={inputClass}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className="flex gap-3">
        <input
          className={`${inputClass} w-1/2`}
          type="number"
          placeholder="Price (kr)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className={`${inputClass} w-1/2`}
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <input
        className={inputClass}
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className={inputClass}
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        className={inputClass}
        placeholder="Sizes (comma separated)"
        value={sizes}
        onChange={(e) => setSizes(e.target.value)}
      />
      <input
        className={inputClass}
        placeholder="Short introduction"
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
      />
      <textarea
        className={inputClass}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
        />
        In stock
      </label>

      {error && <p className="text-sm text-primary">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-primary text-white text-sm rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-stone-100 text-stone-700 text-sm rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
