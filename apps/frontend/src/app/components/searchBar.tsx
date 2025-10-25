"use client";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
type Props = {
  onSearch?: (query: string) => void;
  placeholder: string;
};
export const SearchBar = ({ onSearch, placeholder = "search..." }: Props) => {
  const [query, setQuery] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 border-stone-600 border-2 p-2 w-full md:w-lg"
    >
      <button
         type="submit"
        className="text-stone-600 hover:text-stone-800 transition"
        >
      <Search size={24} className="stroke-stone-600" />
      </button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="outline-none focus:outline-none w-full"
      />
    </form>
  );
};
