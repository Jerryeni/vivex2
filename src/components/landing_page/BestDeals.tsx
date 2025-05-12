// import React, { useState } from 'react';
// import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useCart } from '../../context/CartContext';
// import { useBestDealProducts } from '../../lib/api/product';
// import { ProductSkeleton } from '../ui/ProductSkeleton';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   selling_price: number;
//   images: { id: number; image_url: string }[];
//   is_best_deal: boolean;
//   is_hot?: boolean;
//   rating?: number;
//   reviews?: number;
// }

// export const BestDeals: React.FC = () => {
//   const { dispatch } = useCart();
//   const { data, isLoading, error } = useBestDealProducts();
//   const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

//   if (isLoading) return <ProductSkeleton />
//   if (error) return <p>Failed to load best deals.</p>;
//   console.log(data);


//   // Filter products with is_best_deal === true and limit to 9
//   const products: Product[] = Array.isArray(data?.data) 
//   ? data.data.filter((p: Product) => p.is_best_deal).slice(0, 9) 
//   : [];
//   console.log(products);

//   const addToCart = (product: Product) => {
//     // dispatch({ type: 'ADD_TO_CART', payload: product });
//   };

//   return (
//     <section className="max-w-7xl bg-white mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center">
//           <h2 className="text-2xl font-bold">Best Deals</h2>
//           <div className="bg-yellow-100 px-3 py-1 rounded text-sm">
//             Deals ends in 16d : 21h : 57m : 23s
//           </div>
//         </div>
//         <Link to="/products" className="text-blue-500 hover:underline">
//           Browse All Product →
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//         {/* Featured Product - Left Side */}
//         {products.length > 0 && (
//           <div className="lg:col-span-1">
//             <div 
//               className="bg-transparent overflow-hidden border"
//               onMouseEnter={() => setHoveredProduct(products[0].id)}
//               onMouseLeave={() => setHoveredProduct(null)}
//             >
//               <div className="relative">
//                 {products[0].is_hot && (
//                   <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//                     HOT
//                   </span>
//                 )}
//                 <img 
//                   src={products[0].images[0]?.image_url || 'https://via.placeholder.com/150'}
//                   alt={products[0].name}
//                   className="w-full h-[300px] object-contain"
//                 />
//               </div>
//               <div className="p-4">
//                 <div className="flex items-center mb-2">
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`h-4 w-4 ${
//                           i < (products[0].rating || 0) ? 'text-yellow-400 fill-orange-400' : 'text-gray-300'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-xs text-gray-500 ml-2">({products[0].reviews?.toLocaleString()})</span>
//                 </div>
//                 <h3 className="text-sm font-medium mb-2">{products[0].name}</h3>
//                 <div className="mb-2">
//                   <span className="text-[#2DA5F3] font-bold">${products[0].selling_price}</span>
//                   {products[0].price > products[0].selling_price && (
//                     <span className="text-sm text-gray-400 line-through ml-2">
//                       ${products[0].price}
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex gap-2">
//                     <button className="p-2 hover:bg-gray-100 rounded">
//                       <Heart className="h-5 w-5" />
//                     </button>
//                     <button 
//                       onClick={() => addToCart(products[0])}
//                       className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
//                     >
//                       ADD TO CART
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded">
//                       <Eye className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Regular Products - Right Side */}
//         <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {products.slice(1).map(product => (
//             <div 
//               key={product.id}
//               className="bg-white overflow-hidden border h-full"
//               onMouseEnter={() => setHoveredProduct(product.id)}
//               onMouseLeave={() => setHoveredProduct(null)}
//             >
//               <div className="relative">
//                 <img 
//                   src={product.images[0]?.image_url || 'https://via.placeholder.com/150'}
//                   alt={product.name}
//                   className="w-full h-32 object-contain"
//                 />
//                 {hoveredProduct === product.id && (
//                   <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2">
//                     <button className="p-2 bg-orange-500 text-white rounded-full hover:bg-gray-100 transition-colors">
//                       <Heart className="h-5 w-5" />
//                     </button>
//                     <button 
//                       onClick={() => addToCart(product)}
//                       className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       <ShoppingCart className="h-5 w-5" />
//                     </button>
//                     <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
//                       <Eye className="h-5 w-5" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//               <div className="p-4">
//                 <h3 className="text-xs font-normal mb-2">{product.name}</h3>
//                 <span className="text-[#2DA5F3] font-normal text-sm">${product.selling_price}</span>
//                 {product.price > product.selling_price && (
//                   <span className="text-gray-400 text-sm line-through ml-2">${product.price}</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBestDealProducts } from '../../lib/api/product';
import { ProductSkeleton } from '../ui/ProductSkeleton';
import useCartStore from '../../lib/store/useCartStore';
import useWishlistStore from '../../lib/store/useWishlistStore';
import { Product } from '../../types';
import toast from 'react-hot-toast';

export const BestDeals: React.FC = () => {
  const { addToCart } = useCartStore();
  const { addToWishlist } = useWishlistStore();
  const { data, isLoading, error } = useBestDealProducts();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  if (isLoading) return <ProductSkeleton />;
  if (error) return <p>Failed to load best deals.</p>;

  const products: Product[] = Array.isArray(data?.data)
    ? data.data.filter((p: Product) => p.is_best_deal).slice(0, 9)
    : [];

  const handleAddToCart = async (product: Product) => {
    const variation = product.variations?.find(v => v.quantity > 0);
    if (!variation) {
      return toast.error("No available variation for this product.");
    }
    await addToCart(product.id, variation.id);
  };

  const handleAddToWishlist = async (product: Product) => {
    const variation = product.variations?.find(v => v.quantity > 0);
    if (!variation) {
      return toast.error("No available variation to add to wishlist.");
    }
    await addToWishlist(product.id, variation.id);
  };

  return (
    <section className="max-w-7xl bg-white mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Best Deals</h2>
          <div className="bg-yellow-100 px-3 py-1 rounded text-sm">
            Deals ends in 16d : 21h : 57m : 23s
          </div>
        </div>
        <Link to="/products" className="text-blue-500 hover:underline">
          Browse All Product →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {products.length > 0 && (
          <div className="lg:col-span-1">
            <div
              className="bg-transparent overflow-hidden border"
              onMouseEnter={() => setHoveredProduct(products[0].id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative">
                {products[0].is_hot && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    HOT
                  </span>
                )}
                <img
                  src={products[0].images[0]?.image_url || 'https://via.placeholder.com/150'}
                  alt={products[0].name}
                  className="w-full h-[300px] object-contain"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < (products[0].rating || 0) ? 'text-yellow-400 fill-orange-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({products[0].reviews?.toLocaleString()})</span>
                </div>
                <h3 className="text-sm font-medium mb-2">{products[0].name}</h3>
                <div className="mb-2">
                  <span className="text-[#2DA5F3] font-bold">${products[0].selling_price}</span>
                  {products[0].price > products[0].selling_price && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ${products[0].price}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button onClick={() => handleAddToWishlist(products[0])} className="p-2 hover:bg-gray-100 rounded">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(products[0])}
                      className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                    >
                      ADD TO CART
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(1).map(product => (
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
                      className="p-2 bg-orange-500 text-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
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
                <h3 className="text-xs font-normal mb-2">{product.name}</h3>
                <span className="text-[#2DA5F3] font-normal text-sm">${product.selling_price}</span>
                {product.price > product.selling_price && (
                  <span className="text-gray-400 text-sm line-through ml-2">${product.price}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
