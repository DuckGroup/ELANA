"use client";
import { useState } from "react";

type Props = {
  sizes: string[];
};

export const SizePicker = ({ sizes }: Props) => {
  const [selected, setSelected] = useState<string | null>(sizes[0] ?? null);

  if (sizes.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-stone-700">Size</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setSelected(size)}
            className={`min-w-12 px-4 py-2 border text-sm transition-colors ${
              selected === size
                ? "border-primary bg-primary text-white"
                : "border-stone-300 hover:border-primary"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
