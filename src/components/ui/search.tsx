import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "./input";
import { cn } from "../../lib/utils";
import { useSearchProducts } from "../../lib/api/product";

interface SearchProps {
  placeholder?: string;
  className?: string;
  minQueryLength?: number;
  debounceMs?: number;
}

export function Search({
  placeholder = "Search...",
  className,
  minQueryLength = 1, // Show results as soon as 1 character is typed
  debounceMs = 300,
}: SearchProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Fetch all products from API
  const { data, isLoading, refetch } = useSearchProducts({});
  const allProducts = Array.isArray(data?.data) ? data.data : [];

  // Local filtering: Match the query with product names or descriptions
  const filteredResults = allProducts.filter(
    (product: any) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase())
  );



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= minQueryLength) {
      clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(() => {
        refetch(); // Fetch new results from API if needed
        setShowResults(true);
      }, debounceMs);
    } else {
      setShowResults(false);
    }

    return () => clearTimeout(debounceTimeout.current);
  }, [query, minQueryLength, debounceMs, refetch]);

  const handleClear = () => {
    setQuery("");
    setShowResults(false);
  };

  return (
    <div className={cn("relative", className)} ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10x pr-10x text-black font-light w-[90%] mx-auto !rounded-none"
        />
        <SearchIcon className="absolute right-16 top-2.5 h-5 w-5 text-gray-400" />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border max-h-96 overflow-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : filteredResults.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No results found</div>
          ) : (
            <ul className="py-2">
              {filteredResults.map((product: any) => (
                <li key={product.id}>
                  <a
                    href={`/products/${product.id}`}
                    className="flex items-center gap-4 px-4 py-2 hover:bg-gray-50"
                  >
                    {product.image && (
                      <img
                      src={product.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
                      alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{product.name}</p>
                      {product.description && (
                        <p className="text-sm text-gray-500 truncate">{product.description}</p>
                      )}
                      {product.category && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {product.category.name}
                        </span>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}