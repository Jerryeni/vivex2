// import React, { useState } from 'react';
// import { Star, Heart, ShoppingCart, Eye, X } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useBestDealProducts } from '../../lib/api/product';
// import { ProductSkeleton } from '../ui/ProductSkeleton';
// import useCartStore from '../../lib/store/useCartStore';
// import useWishlistStore from '../../lib/store/useWishlistStore';
// import { Product } from '../../types';
// import toast from 'react-hot-toast';
// import Cookies from 'js-cookie';
// import { ModalAuth } from '../ui/LoginSignupModal';
// import { formatCurrency } from '../../lib/utils';

// export const BestDeals: React.FC = () => {
//   const { addToCart } = useCartStore();
//   const { addToWishlist, isInWishlist } = useWishlistStore();
//   const { data, isLoading, error } = useBestDealProducts();

//   const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const isLoggedIn = !!Cookies.get("access_token");
//   const userId = Cookies.get("userId");

//   if (isLoading) return <ProductSkeleton />;
//   if (error) return <p>Failed to load best deals.</p>;

//   const products: Product[] = Array.isArray(data?.data)
//     ? data.data.filter((p: Product) => p.is_best_deal).slice(0, 9)
//     : [];

//   const handleAddToCart = async (product: Product) => {
//     const variation = product.variations?.find(v => v.quantity > 0);
//     if (!variation) return toast.error("No available variation for this product.");
//     await addToCart(product.id, variation.id);
//     toast.success("Added to cart!");
//   };

//   const handleAddToWishlist = async (product: Product) => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }

//     const availableVariation = product.variations?.find(v => v.quantity > 0);
//     if (!availableVariation) return toast.error("No available variation for this product.");

//     await addToWishlist({
//       userId: Number(userId),
//       productId: product.id,
//       productVariationId: availableVariation.id,
//       quantity: 1,
//     });

//     toast.success("Added to wishlist");
//   };

//   return (
//     <section className="max-w-7xl bg-white mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-4">
//           <h2 className="text-2xl font-bold">Best Deals</h2>
//           <div className="bg-yellow-100 px-3 py-1 rounded text-sm">
//             Deals ends in <span className='bg-yellow/50 p-2'>16d : 21h : 57m : 23s</span>
//           </div>
//         </div>
//         <Link to="/products" className="text-blue-500 hover:underline">
//           Browse All Product →
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4x">
//         {/* First product special display */}
//         {products.length > 0 && (
//           <div className="lg:col-span-1">
//             <div
//               className="bg-transparent overflow-hidden border px-2"
//               onMouseEnter={() => setHoveredProduct(products[0].id)}
//               onMouseLeave={() => setHoveredProduct(null)}
//             >
//               <div className="relative p-2">
//                 {products[0].is_hot && (
                  
//                   <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 roundedx">
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
//                         className={`h-4 w-4 ${i < (products[0].average_rating || 0) ? 'text-yellow-400 fill-orange-400' : 'text-gray-300'}`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-xs text-gray-500 ml-2">
//                     ({products[0].reviews?.toLocaleString()})
//                   </span>
//                 </div>
//                 <Link to={`/products/${products[0].id}`}>
//                   <h3 className="text-sm font-medium mb-2x">{products[0].name}</h3>

//                 </Link>
//                 <div className="py-2">
//                   <span className="text-[#2DA5F3] font-medium">{formatCurrency(products[0].selling_price)}</span>
//                   {products[0].price > products[0].selling_price && (
//                     <span className="text-sm text-gray-400 line-through ml-2">
//                       {formatCurrency(products[0].price)}
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-xs text-gray-500 line-clamp-3 mb-4">
//                   {products[0].description}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <div className="flex gap-2 w-full">
//                     <button
//                       onClick={() => handleAddToWishlist(products[0])}
//                       className={`p-2 ${isInWishlist(products[0].id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500/20 text-white hover:bg-gray-100 '} `}
//                       disabled={isInWishlist(products[0].id)}
//                     >
//                       <Heart className="h-5 w-5 text-black/70" />
//                     </button>
//                     <button
//                       onClick={() => handleAddToCart(products[0])}
//                       className="w-full bg-orange-500 text-white px-4 py-2 roundedx hover:bg-orange-600 transition-colors"
//                     >
//                       ADD TO CART
//                     </button>
//                     <Link to={`/products/${products[0].id}`}>
//                       <button className="p-2 bg-orange-500/20 hover:bg-gray-100">
//                         <Eye className="h-6 w-5" />
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Remaining products */}
//         <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4x">
//           {products.slice(1).map((product) => (
//             <div
//               key={product.id}
//               className="bg-white overflow-hidden border h-[250px]x p-2"
//               onMouseEnter={() => setHoveredProduct(product.id)}
//               onMouseLeave={() => setHoveredProduct(null)}
//             >
//               <div className="relative">
//                 <img
//                   src={product.images[0]?.image_url || 'https://via.placeholder.com/150'}
//                   alt={product.name}
//                   className="w-full h-28 object-contain"
//                 />
//                 {hoveredProduct === product.id && (
//                   <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2">
//                     <button
//                       onClick={() => handleAddToWishlist(product)}
//                       className={`p-2 ${isInWishlist(product.id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500 text-white'} rounded-full`}
//                       disabled={isInWishlist(product.id)}
//                     >
//                       <Heart className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       <ShoppingCart className="h-5 w-5" />
//                     </button>
//                     <Link to={`/products/${product.id}`}>
//                       <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
//                         <Eye className="h-5 w-5" />
//                       </button>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//               <div className="p-2">
//                 <Link to={`/products/${product.id}`}>
//                   <h3 className="text-xs font-normal mb-2">{product.name}</h3>
//                 </Link>
//                 <span className="text-[#2DA5F3] font-normal text-sm">{formatCurrency(product.selling_price)}</span>
//                 {product.price > product.selling_price && (
//                   <span className="text-gray-400 text-sm line-through ml-2">{formatCurrency(product.price)}</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Login Modal */}
//       {showLoginModal && <ModalAuth onClose={() => setShowLoginModal(false)} />}
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
import Cookies from 'js-cookie';
import { ModalAuth } from '../ui/LoginSignupModal';
import { formatCurrency, getImageSrc } from '../../lib/utils';
import { OptimizedImage } from '../ui/OptimizedImage';

export const BestDeals: React.FC = () => {
  const { addToCart } = useCartStore();
  const { addToWishlist, isInWishlist } = useWishlistStore();
  const { data, isLoading, error } = useBestDealProducts();

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isLoggedIn = !!Cookies.get("access_token");
  const userId = Cookies.get("userId");

  if (isLoading) return <ProductSkeleton />;
  if (error) return <p>Failed to load best deals.</p>;

  const products: Product[] = Array.isArray(data?.data)
    ? data.data.filter((p: Product) => p.is_best_deal).slice(0, 9)
    : [];

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
    if (!availableVariation) return toast.error("No available variation for this product.");

    await addToWishlist({
      userId: Number(userId),
      productId: product.id,
      productVariationId: availableVariation.id,
      quantity: 1,
    });

    toast.success("Added to wishlist");
  };

  

  return (
    <section className="max-w-7xl bg-white mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Best Deals</h2>
          <div className="bg-yellow-100 px-3 py-1 rounded text-sm">
            {/* Deals ends in <span className='bg-yellow/50 p-2'>16d : 21h : 57m : 23s</span> */}
          </div>
        </div>
        <Link to="/products" className="text-blue-500 hover:underline">
          Browse All Product →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4x">
        {products.length > 0 && (
          <div className="lg:col-span-1">
            <div
              className="bg-transparent overflow-hidden border px-2"
              onMouseEnter={() => setHoveredProduct(products[0].id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative p-2">
                {products[0].is_hot && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 roundedx">
                    HOT
                  </span>
                )}
                <OptimizedImage
                  src={products}
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
                        className={`h-4 w-4 ${i < (products[0].average_rating || 0) ? 'text-yellow-400 fill-orange-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    ({products[0].reviews?.toLocaleString()})
                  </span>
                </div>
                <Link to={`/products/${products[0].id}`}>
                  <h3 className="text-sm font-medium mb-2x">{products[0].name}</h3>
                </Link>
                <div className="py-2">
                  <span className="text-[#2DA5F3] font-medium">{formatCurrency(products[0].selling_price)}</span>
                  {products[0].price > products[0].selling_price && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      {formatCurrency(products[0].price)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 line-clamp-3 mb-4">
                  {products[0].description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => handleAddToWishlist(products[0])}
                      className={`p-2 ${isInWishlist(products[0].id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-500/20 text-white hover:bg-gray-100 '} `}
                      disabled={isInWishlist(products[0].id)}
                    >
                      <Heart className="h-5 w-5 text-black/70" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(products[0])}
                      className="w-full bg-orange-500 text-white px-4 py-2 roundedx hover:bg-orange-600 transition-colors"
                    >
                      ADD TO CART
                    </button>
                    <Link to={`/products/${products[0].id}`}>
                      <button className="p-2 bg-orange-500/20 hover:bg-gray-100">
                        <Eye className="h-6 w-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4x">
          {products.slice(1).map((product) => (
            <div
              key={product.id}
              className="bg-white overflow-hidden border h-[250px]x p-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative">
                <OptimizedImage
                  src={product}
                  alt={product.name}
                  className="w-full h-28 object-contain"
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
                    <Link to={`/products/${product.id}`}>
                      <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="p-2">
                <Link to={`/products/${product.id}`}>
                  <h3 className="text-xs font-normal mb-2">{product.name}</h3>
                </Link>
                <span className="text-[#2DA5F3] font-normal text-sm">{formatCurrency(product.selling_price)}</span>
                {product.price > product.selling_price && (
                  <span className="text-gray-400 text-sm line-through ml-2">{formatCurrency(product.price)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showLoginModal && <ModalAuth onClose={() => setShowLoginModal(false)} />}
    </section>
  );
};
