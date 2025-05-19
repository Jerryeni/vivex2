import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ProductSkeleton } from '../../components/ui/ProductSkeleton';
import Pagination from '../../components/ui/pagination';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useCategories, useProducts } from '../../lib/api/product';
import { ProductCard } from '../../components/ui/ProductCard';
import { Search } from '../../components/ui/search';
import { RangeSlider } from '../../components/ui/range-slider';
import useCartStore from '../../lib/store/useCartStore';

const sortOptions = [
  { value: 'most-popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const { cart, fetchCart } = useCartStore();
 

  // Fetch data
  const { data, isLoading, error } = useProducts({ search: searchQuery });
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCart();
  }, []);
  useEffect(() => {
    if (categories?.length) {
      setSelectedCategory(categories[0].name); // Set first category active by default
    }
  }, [categories]);

  if (isLoading || categoriesLoading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500">Failed to load products.</p>;

  const products = data.results || [];
  console.log('Products:', products);

  // Extract unique brands
  const brands: string[] = Array.from(
    new Set(products.map((p: any) => p.brand).filter(Boolean))
  );

  const filteredProducts = products.filter((product: any) => {
    const matchesCategory = selectedCategory ? product.category?.name === selectedCategory : true;
    const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
    const matchesTags =
      selectedTags.length > 0 ? selectedTags.every(tag => product.tags?.includes(tag)) : true;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return (
      matchesCategory &&
      matchesBrand &&
      matchesTags &&
      matchesPrice &&
      matchesSearch
    );
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);



  const breadcrumbItems = [
    { label: 'products', href: '/products' },
    { label: selectedCategory || 'All Products' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset pagination on new search
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">CATEGORY</h3>
              <div className="space-y-2">
                {categories.map((category: any) => (
                  <label key={category.name} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => {
                        setSelectedCategory(category.name);
                        setPage(1);
                      }}
                      className="w-5 h-5 text-orange-600 border-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* BRAND FILTER */}
            <div>
              <h3 className="text-lg font-semibold mb-4">BRAND</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === brand}
                      onChange={() => {
                        setSelectedBrand(brand);
                        setPage(1);
                      }}
                      className="w-5 h-5 text-orange-600 border-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE RANGE FILTER */}
            <div>
              <h3 className="text-lg font-semibold mb-4">PRICE RANGE</h3>
              <RangeSlider
                min={0}
                max={100000}
                step={10}
                value={priceRange}
                onChange={(value) => {
                  setPriceRange(value);
                  setPage(1);
                }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedTags([]);
                  setPriceRange([0, 100000]);
                  setSearchQuery('');
                  setPage(1);
                }}
                className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <Search placeholder="Search for products..." className="w-full" />

              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-md px-3 py-2"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-gray-100">
                <span className="text-sm text-gray-500">Active Filters:</span>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    <span>{selectedCategory}</span>
                    <X className="h-4 w-4" />
                  </button>
                )}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    <span>"{searchQuery}"</span>
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            {/* Results Count */}
            {/* <div className="mb-6">
              <p className="text-sm text-gray-500">{totalResults} Results found</p>
            </div> */}

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(9)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {paginatedProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {filteredProducts.length === 0 && (
                  <p className="text-gray-500 col-span-4">No products found for this category.</p>
                )}
              </div>
            )}

            {/* Pagination */}
            <Pagination totalPages={totalPages} currentPage={itemsPerPage} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
};