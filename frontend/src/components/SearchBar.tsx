import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  onSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="relative w-full flex items-center border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 shadow focus-within:ring-2 focus-within:ring-blue-500"
    >
      <div className="pl-4 text-slate-400">
        <Search className="h-5 w-5" />
      </div>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-3 bg-transparent 
             text-slate-900 dark:text-slate-100 
             placeholder-slate-400 dark:placeholder-slate-500 
             focus:outline-none"
      />
    </form>
  );
};

export default SearchBar;
