import React, { useState, useEffect } from 'react';
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import TimerCard from '../ui/time-card';
import { useBestSellerProducts, useCategories } from '../../lib/api/product';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Product } from '../../types';
import useCartStore from '../../lib/store/useCartStore';
import useWishlistStore from '../../lib/store/useWishlistStore';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import { ModalAuth } from '../ui/LoginSignupModal';


export const ComputerAccessories: React.FC = () => {
  const { addToCart } = useCartStore();
  const { addToWishlist, isInWishlist } = useWishlistStore();
  const { data, isLoading, error } = useBestSellerProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isLoggedIn = !!Cookies.get("access_token");
  const userId = Cookies.get("userId");

  const handleAddToCart = async (product: Product) => {
    const variation = product.variations?.find(v => v.quantity > 0);
    if (!variation) return toast.error("No available variation for this product.");
    await addToCart(product.id, variation.id);
    toast.success("Added to cart!");
  };

  const handleAddToWishlist = async (product: Product) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const availableVariation = product.variations?.find(v => v.quantity > 0);
    if (!availableVariation) {
      return toast.error("No available variation for this product.");
    }

    await addToWishlist({
      userId: Number(userId),
      productId: product.id,
      productVariationId: availableVariation.id,
      quantity: 1,
    });

    toast.success("Added to wishlist");
  };

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
                // <div
                //   key={product.id}
                //   className="bg-white rounded-lg border shadow-sm overflow-hidden"
                //   onMouseEnter={() => setHoveredProduct(product.id)}
                //   onMouseLeave={() => setHoveredProduct(null)}
                // >
                //   {product.is_best_deal && (
                //     <div className="bg-blue-500 text-white text-xs px-2 py-1 absolute">HOT</div>
                //   )}

                //   <div className="relative">
                //     <img
                //       src={product.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
                //       alt={product.name}
                //       className="w-full h-32 p-2 object-contain"
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
                //           className={`h-4 w-4 ${
                //             i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                //           }`}
                //         />
                //       ))}
                //       <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                //     </div>
                //     <h3 className="text-sm font-medium mb-2">{product.name}</h3>
                //     <span className="text-blue-600 font-bold">${product.price}</span>
                //   </div>
                // </div>
                <div
              key={product.id}
              className="bg-white overflow-hidden border h-full"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative">
                <img
                  src={product.images[0]?.image_url || 'https://via.placeholder.com/150'}
                  alt={product.name}
                  className="w-full h-32 object-contain"
                />
                {hoveredProduct === product.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className={`p-2 ${isInWishlist(product.id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white'} rounded-full`}
                      disabled={isInWishlist(product.id)}
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                    <Link to={`/products/${products[0].id}`} className="block relative">
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                      <Eye className="h-5 w-5" />
                    </button>
                  </Link>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xs font-normal mb-2">{product.name}</h3>
                <span className="text-[#2DA5F3] font-normal text-sm">${product.selling_price}</span>
                {product.price > product.selling_price && (
                  <span className="text-gray-400 text-sm line-through ml-2">${product.price}</span>
                )}
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
      {showLoginModal && <ModalAuth onClose={() => setShowLoginModal(false)} />}
    </section>
  );
};