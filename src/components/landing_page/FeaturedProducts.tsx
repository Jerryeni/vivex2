import React, { useState } from 'react';
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import TimerCard from '../ui/time-card';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useCategories, useFeaturedProducts } from '../../lib/api/product';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ProductSkeleton } from '../ui/ProductSkeleton';
import { ProductCard } from '../ui/ProductCard';

export const FeaturedProducts: React.FC = () => {
  const { dispatch } = useCart();
  const { data, isLoading, error } = useFeaturedProducts();
  const { data: categories } = useCategories();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Category Filter State

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className='text-center'>Failed to load featured products.</p>;

  // Ensure products is an array before filtering
  const products: Product[] = Array.isArray(data?.data)
    ? data.data.filter((p: Product) => p.is_featured).slice(0, 8)
    : [];

  // **Filter products based on selected category**
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category?.name === selectedCategory)
    : products;

  const addToCart = (product: Product) => {
    // dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <section className="flex flex-col lg:flex-row gap-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:w-[30%] w-full space-y-4">
        <TimerCard />
        <div className="bg-blue-900 text-white p-6 rounded">
          <h3 className="text-xl font-bold mb-2">37% DISCOUNT</h3>
          <p className="mb-4">Only for SmartPhone product.</p>
          <button className="bg-[#2DA5F3] text-white px-4 py-2 rounded">
            SHOP NOW →
          </button>
        </div>
      </div>

      <div className="w-full lg:w-[70%]">
        <div className="flex relative flex-col lg:flex-row justify-between gap-3 w-full h-fit items-center mb-4">
          <h2 className="text-xl font-medium w-full md:w-[30%] h-fit">Featured Products</h2>
          <div className="flex gap-3 overflow-x-auto h-fit w-full md:w-[80%] place-content-end items-end">
            {/* Category Filter Buttons */}
            <button
              onClick={() => setSelectedCategory(null)}
              className={`whitespace-nowrap h-fit px-2 text-xs ${selectedCategory === null ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'
                }`}
            >
              All
            </button>
            {categories?.map((category: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`whitespace-nowrap h-fit px-2 text-xs ${selectedCategory === category.name ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'
                  }`}
              >
                {category.name}
              </button>
            ))}

            {/* <Link to="/products" className="absolute top-2 md:block text-orange-500 h-fit text-xs w-fit hover:underline">
              Browse All Product →
            </Link> */}
          </div>
          <Link to="/products" className="absolute left-1/2 top-2 md:block text-orange-500 h-fit text-xs w-fit hover:underline">
            Browse All Product →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(9)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (

        <div className="flex w-full gap-2 overflow-x-auto">
          <div className="col-span-3 grid grid-cols-2 sm:grid-cols-2 w-full lg:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                // <div
                //   key={product.id}
                //   className="bg-white border w-full rounded shadow-sm overflow-hidden relative"
                //   onMouseEnter={() => setHoveredProduct(product.id)}
                //   onMouseLeave={() => setHoveredProduct(null)}
                // >
                //   {product.is_hot && (
                //     <div className="bg-[#2DA5F3] text-white text-xs px-2 py-1 absolute top-2 right-2">
                //       HOT
                //     </div>
                //   )}
                //   <div className="relative">
                //     <img
                //       src={product.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
                //       alt={product.name}
                //       className="w-full h-32 object-contain p-1"
                //     />
                //     {hoveredProduct === product.id && (
                //       <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2">
                //         <button className="p-2 bg-orange-500 text-white rounded-full hover:bg-gray-100 transition-colors">
                //           <Heart className="h-5 w-5" />
                //         </button>
                //         <button
                //           onClick={() => addToCart(product)}
                //           className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                //         >
                //           <ShoppingCart className="h-5 w-5" />
                //         </button>
                //         <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                //           <Eye className="h-5 w-5" />
                //         </button>
                //       </div>
                //     )}
                //   </div>

                //   <div className="p-4">
                //     <div className="flex items-center mb-2">
                //       {[...Array(5)].map((_, i) => (
                //         <Star
                //           key={i}
                //           className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                //         />
                //       ))}
                //       <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                //     </div>
                //     <h3 className="text-sm font-medium mb-2">{product.name}</h3>
                //     <span className="text-[#2DA5F3] font-normal">${product.price}</span>
                //   </div>
                // </div>
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-4">No products found for this category.</p>
            )}
          </div>
        </div>
      )}
      </div>
    </section>
  );
};