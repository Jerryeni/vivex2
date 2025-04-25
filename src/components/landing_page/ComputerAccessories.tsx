import React, { useState, useEffect } from 'react';
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import TimerCard from '../ui/time-card';
import { useCart } from '../../context/CartContext';
import { useBestSellerProducts, useCategories } from '../../lib/api/product';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Product } from '../../types';

export const ComputerAccessories: React.FC = () => {
  const { data, isLoading, error } = useBestSellerProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (categories?.length) {
      setSelectedCategory(categories[0].name); // Set first category active by default
    }
  }, [categories]);

  if (isLoading || categoriesLoading) return <LoadingSpinner />;
  if (error) return <p className="text-center">Failed to load featured products.</p>;

  // Ensure products is an array before filtering
  const products: Product[] = Array.isArray(data?.data) ? data.data.slice(0, 8) : [];

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category?.name === selectedCategory)
    : products;

  const addToCart = (product: Product) => {
    // dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <section className="flex flex-col lg:flex-row gap-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full lg:w-[70%]">
        <div className="flex justify-between gap-3 w-full h-fit items-center mb-4">
          <h2 className="text-xl font-medium w-[30%] h-fit">Computer Accessories</h2>
          <div className="flex gap-6 mb-6 overflow-x-auto">
            {categories?.map((category: any, index: any) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`whitespace-nowrap px-4 py-2 rounded transition-colors ${
                  selectedCategory === category.name
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-full gap-3 overflow-x-auto">
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border shadow-sm overflow-hidden"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {product.is_best_deal && (
                    <div className="bg-blue-500 text-white text-xs px-2 py-1 absolute">HOT</div>
                  )}

                  <div className="relative">
                    <img
                      src={product.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
                      alt={product.name}
                      className="w-full h-32 p-2 object-contain"
                    />
                    {hoveredProduct === product.id && (
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2">
                        <button className="p-2 bg-orange-500 text-white rounded-full hover:bg-gray-100 transition-colors">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                        <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                    <h3 className="text-sm font-medium mb-2">{product.name}</h3>
                    <span className="text-blue-600 font-bold">${product.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-4">No products found for this category.</p>
            )}
          </div>
        </div>
      </div>

      <div className="lg:w-[30%] w-full space-y-4">
        <TimerCard />
        <div className="bg-blue-900 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">37% DISCOUNT</h3>
          <p className="mb-4">Only for SmartPhone products.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">SHOP NOW →</button>
        </div>
      </div>
    </section>
  );
};