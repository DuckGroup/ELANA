"use client";

type Props = {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
};

export const CategoryFilter = ({ categories, selected, onSelect }: Props) => {
  if (categories.length === 0) {
    return null;
  }

  const chip = (active: boolean) =>
    `px-4 py-1.5 rounded-full text-sm border transition-colors ${
      active
        ? "bg-primary text-white border-primary"
        : "bg-white text-stone-700 border-stone-300 hover:border-primary"
    }`;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className={chip(selected === null)}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={chip(selected === category)}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
