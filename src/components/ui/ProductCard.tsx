// // import React, { useState } from "react";
// // import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
// // import { Link } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import useCartStore from "../../lib/store/useCartStore";
// // import useWishlistStore from "../../lib/store/useWishlistStore";
// // import { Product } from "../../types";
// // import Cookies from "js-cookie";
// // import { ModalAuth } from "./LoginSignupModal";
// // import { formatCurrency } from "../../lib/utils";

// // interface ProductCardProps {
// //   product: Product;
// //   showRatings?: boolean;
// //   showWishlist?: boolean;
// //   showQuickView?: boolean;
// //   showCartButton?: boolean;
// //   compact?: boolean;
// // }

// // export const ProductCard: React.FC<ProductCardProps> = ({
// //   product,
// //   showRatings = true,
// //   showWishlist = true,
// //   showQuickView = true,
// //   showCartButton = true,
// //   compact = false,
// // }) => {
// //   const [hovered, setHovered] = useState(false);
// //   const [showLoginModal, setShowLoginModal] = useState(false);
// //   const { addToCart, cart } = useCartStore();
// //   const { wishlist, addToWishlist } = useWishlistStore();

// //   const availableVariation = product.variations?.find((variation) => variation.quantity > 0);
// //   const isLoggedIn = !!Cookies.get("access_token");
// //   // const isInWishlist = wishlist.some((item) => item?.product.id === product.id);
// //   const userId = Cookies.get("userId");

// //   const handleAddToCart = () => {
// //     if (!availableVariation) {
// //       toast.error("No available variations for this product.");
// //       return;
// //     }
// //     addToCart(product.id, availableVariation.id, 1);
// //   };

// //   const handleAddToWishlist = async () => {
// //     if (!isLoggedIn) {
// //       setShowLoginModal(true);
// //       return;
// //     }

// //     if (!availableVariation) {
// //       toast.error("No available variations for this product.");
// //       return;
// //     }

// //     await addToWishlist({
// //       userId: Number(userId),
// //       productId: product.id,
// //       productVariationId: availableVariation.id,
// //       quantity: 1,
// //     });
// //   };

// //   return (
// //     <>
// //       <div
// //         className={`relative bg-white rounded border overflow-hidden transition-all hover:shadow-lg ${compact ? 'p-2' : ''}`}
// //         onMouseEnter={() => setHovered(true)}
// //         onMouseLeave={() => setHovered(false)}
// //       >
// //         <div className="px-2">
// //           <img
// //             src={product.images.length > 0 ? product.images[0].image_url : "/placeholder.jpg"}
// //             alt={product.name}
// //             className={`w-full ${compact ? 'h-32' : 'h-48'} object-contain`}
// //           />

// //           {hovered && (
// //             <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center gap-2 transition-opacity">
// //               {showWishlist && (
// //                 <button
// //                   className={`p-2 rounded-full transition-colors ${wishlist ? "bg-orange-600 text-white" : "bg-orange-500 text-white hover:bg-orange-600"
// //                     }`}
// //                   onClick={handleAddToWishlist}
// //                 >
// //                   <Heart className="h-5 w-5" fill={wishlist ? "currentColor" : "none"} />
// //                 </button>
// //               )}

// //               {showCartButton && (
// //                 <button
// //                   className="relative p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
// //                   onClick={handleAddToCart}
// //                 >
// //                   <ShoppingCart className="h-5 w-5" />
// //                   {cart.length > 0 && (
// //                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
// //                       {cart.length}
// //                     </span>
// //                   )}
// //                 </button>
// //               )}

// //               {showQuickView && (
// //                 <Link to={`/products/${product.id}`} className="block relative">
// //                   <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors">
// //                     <Eye className="h-5 w-5" />
// //                   </button>
// //                 </Link>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         <Link to={`/products/${product.id}`} className="block relative">
// //           <div className={`p-4 ${compact ? 'p-2' : ''}`}>
// //             {showRatings && (
// //               <div className="flex items-center mb-2">
// //                 <div className="flex items-center">
// //                   {[...Array(5)].map((_, i) => (
// //                     <Star
// //                       key={i}
// //                       className={`h-4 w-4 ${i < (product.average_rating ?? 0)
// //                         ? "text-orange-400 fill-orange-400"
// //                         : "text-gray-300"
// //                         }`}
// //                     />
// //                   ))}
// //                 </div>
// //                 <span className="text-xs text-orange-500 ml-2">({product.reviews ?? 0})</span>
// //               </div>
// //             )}
// //             <Link to={`/products/${product.id}`} className="block relative">

// //               <h3 className={`text-sm font-medium text-gray-900 mb-2 ${compact ? 'line-clamp-1' : 'line-clamp-2'}`}>{product.name}</h3>
// //             </Link>

// //             {/* <div className="flex items-center justify-between">
// //               <span className="text-md font-medium text-primary-default">
// //                 ₦{product?.discount_price.toFixed(2)}
// //               </span>
// //               {product.originalPrice && (
// //                 <span className="text-sm text-gray-400 line-through ml-2 text-primary">
// //                   ₦{product.price.toFixed(2)}
// //                 </span>
// //               )}
// //             </div> */}
// //             <div className="flex items-center justify-between">
// //               <span className="text-md font-medium text-primary-default">
// //                 {formatCurrency(product.price)}
// //               </span>
// //               {product.discount_price && product.discount_price < product.price && (
// //                 <span className="text-sm text-gray-400 line-through ml-2 text-primary">
// //                   {formatCurrency(product.discount_price)}
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //         </Link>
// //       </div>

// //       {showLoginModal && <ModalAuth onClose={() => setShowLoginModal(false)} />}
// //     </>
// //   );
// // };

// import React, { useState } from "react";
// import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import useCartStore from "../../lib/store/useCartStore";
// import useWishlistStore from "../../lib/store/useWishlistStore";
// import { Product } from "../../types";
// import Cookies from "js-cookie";
// import { ModalAuth } from "./LoginSignupModal";
// import { formatCurrency, getImageSrc } from "../../lib/utils";

// interface ProductCardProps {
//   product: Product;
//   showRatings?: boolean;
//   showWishlist?: boolean;
//   showQuickView?: boolean;
//   showCartButton?: boolean;
//   compact?: boolean;
// }

// export const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   showRatings = true,
//   showWishlist = true,
//   showQuickView = true,
//   showCartButton = true,
//   compact = false,
// }) => {
//   const [hovered, setHovered] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const { addToCart, cart } = useCartStore();
//   const { wishlist, addToWishlist } = useWishlistStore();

//   const availableVariation = product.variations?.find((variation) => variation.quantity > 0);
//   const isLoggedIn = !!Cookies.get("access_token");
//   const userId = Cookies.get("userId");



//   const handleAddToCart = () => {
//     if (!availableVariation) {
//       toast.error("No available variations for this product.");
//       return;
//     }
//     addToCart(product.id, availableVariation.id, 1);
//   };

//   const handleAddToWishlist = async () => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }

//     if (!availableVariation) {
//       toast.error("No available variations for this product.");
//       return;
//     }

//     await addToWishlist({
//       userId: Number(userId),
//       productId: product.id,
//       productVariationId: availableVariation.id,
//       quantity: 1,
//     });
//   };

//   return (
//     <>
//       <div
//         className={`relative bg-white rounded border overflow-hidden transition-all hover:shadow-lg ${compact ? 'p-2' : ''}`}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <div className="px-2">
//           <img
//             src={getImageSrc(product)}
//             alt={product.name}
//             className={`w-full ${compact ? 'h-32' : 'h-48'} object-contain`}
//           />

//           {hovered && (
//             <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center gap-2 transition-opacity">
//               {showWishlist && (
//                 <button
//                   className={`p-2 rounded-full transition-colors ${wishlist ? "bg-orange-600 text-white" : "bg-orange-500 text-white hover:bg-orange-600"}`}
//                   onClick={handleAddToWishlist}
//                 >
//                   <Heart className="h-5 w-5" fill={wishlist ? "currentColor" : "none"} />
//                 </button>
//               )}

//               {showCartButton && (
//                 <button
//                   className="relative p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
//                   onClick={handleAddToCart}
//                 >
//                   <ShoppingCart className="h-5 w-5" />
//                   {cart.length > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                       {cart.length}
//                     </span>
//                   )}
//                 </button>
//               )}

//               {showQuickView && (
//                 <Link to={`/products/${product.id}`} className="block relative">
//                   <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors">
//                     <Eye className="h-5 w-5" />
//                   </button>
//                 </Link>
//               )}
//             </div>
//           )}
//         </div>

//         <Link to={`/products/${product.id}`} className="block relative">
//           <div className={`p-4 ${compact ? 'p-2' : ''}`}>
//             {showRatings && (
//               <div className="flex items-center mb-2">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-4 w-4 ${i < (product.average_rating ?? 0) ? "text-orange-400 fill-orange-400" : "text-gray-300"}`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-xs text-orange-500 ml-2">({product.reviews ?? 0})</span>
//               </div>
//             )}

//             <h3 className={`text-sm font-medium text-gray-900 mb-2 ${compact ? 'line-clamp-1' : 'line-clamp-2'}`}>{product.name}</h3>

//             <div className="flex items-center justify-between">
//               <span className="text-md font-medium text-primary-default">
//                 {formatCurrency(product.price)}
//               </span>
//               {product.discount_price && product.discount_price < product.price && (
//                 <span className="text-sm text-gray-400 line-through ml-2 text-primary">
//                   {formatCurrency(product.discount_price)}
//                 </span>
//               )}
//             </div>
//           </div>
//         </Link>
//       </div>

//       {showLoginModal && <ModalAuth onClose={() => setShowLoginModal(false)} />}
//     </>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import useCartStore from "../../lib/store/useCartStore";
// import useWishlistStore from "../../lib/store/useWishlistStore";
// import { Product } from "../../types";
// import Cookies from "js-cookie";
// import { ModalAuth } from "./LoginSignupModal";
// import { formatCurrency } from "../../lib/utils";

// interface ProductCardProps {
//   product: Product;
//   showRatings?: boolean;
//   showWishlist?: boolean;
//   showQuickView?: boolean;
//   showCartButton?: boolean;
//   compact?: boolean;
// }

// // Utility function to convert image URL to base64
// const convertToBase64 = async (imageUrl: string): Promise<string> => {
//   try {
//     const response = await fetch(imageUrl);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch image: ${response.status}`);
//     }
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error('Error converting image to base64:', error);
//     throw error;
//   }
// };

// // Enhanced image source utility with base64 support
// const getImageSrc = (product: Product): string => {
//   if (product.images && product.images.length > 0) {
//     // Check if the image has base64_product_image field
//     if (product.images[0].base64_product_image) {
//       // If it's already a complete base64 string, return it
//       if (product.images[0].base64_product_image.startsWith('data:')) {
//         return product.images[0].base64_product_image;
//       }
//       // If it's just the base64 data without the data URI prefix, add it
//       return `data:image/jpeg;base64,${product.images[0].base64_product_image}`;
//     }
//     // Fallback to image_url if base64 is not available
//     if (product.images[0].image_url) {
//       return product.images[0].image_url;
//     }
//   }
//   return "/placeholder.jpg";
// };

// // Create a placeholder base64 image (1x1 transparent pixel)
// const createPlaceholderBase64 = (): string => {
//   return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlmYTZiMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=";
// };

// export const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   showRatings = true,
//   showWishlist = true,
//   showQuickView = true,
//   showCartButton = true,
//   compact = false,
// }) => {
//   const [hovered, setHovered] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [base64Image, setBase64Image] = useState<string>("");
//   const [imageLoading, setImageLoading] = useState(true);
//   const [imageError, setImageError] = useState(false);
  
//   const { addToCart, cart } = useCartStore();
//   const { wishlist, addToWishlist } = useWishlistStore();

//   const availableVariation = product.variations?.find((variation) => variation.quantity > 0);
//   const isLoggedIn = !!Cookies.get("access_token");
//   const userId = Cookies.get("userId");

//   // Convert image to base64 on component mount
//   useEffect(() => {
//     const loadImage = async () => {
//       setImageLoading(true);
//       setImageError(false);
      
//       try {
//         const imageUrl = getImageSrc(product);
        
//         // Check if it's already a base64 string (from API response)
//         if (imageUrl.startsWith('data:')) {
//           setBase64Image(imageUrl);
//           setImageLoading(false);
//           return;
//         }
        
//         // Check if it's a placeholder
//         if (imageUrl.includes('placeholder')) {
//           setBase64Image(createPlaceholderBase64());
//           setImageLoading(false);
//           return;
//         }
        
//         // Only convert external URLs to base64 if they're not already base64
//         try {
//           const base64 = await convertToBase64(imageUrl);
//           setBase64Image(base64);
//           setImageLoading(false);
//         } catch (conversionError) {
//           console.warn('Failed to convert image to base64, using original URL:', conversionError);
//           // If conversion fails, use the original URL
//           setBase64Image(imageUrl);
//           setImageLoading(false);
//         }
//       } catch (error) {
//         console.error('Failed to load image:', error);
//         setImageError(true);
//         setBase64Image(createPlaceholderBase64());
//         setImageLoading(false);
//       }
//     };

//     loadImage();
//   }, [product]);

//   const handleAddToCart = () => {
//     if (!availableVariation) {
//       toast.error("No available variations for this product.");
//       return;
//     }
//     addToCart(product.id, availableVariation.id, 1);
//   };

//   const handleAddToWishlist = async () => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//       return;
//     }

//     if (!availableVariation) {
//       toast.error("No available variations for this product.");
//       return;
//     }

//     await addToWishlist({
//       userId: Number(userId),
//       productId: product.id,
//       productVariationId: availableVariation.id,
//       quantity: 1,
//     });
//   };

//   return (
//     <>
//       <div
//         className={`relative bg-white rounded border overflow-hidden transition-all hover:shadow-lg ${compact ? 'p-2' : ''}`}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <div className="px-2 relative">
//           {imageLoading && (
//             <div className={`w-full ${compact ? 'h-32' : 'h-48'} bg-gray-200 animate-pulse flex items-center justify-center`}>
//               <div className="text-gray-400 text-sm">Loading...</div>
//             </div>
//           )}
          
//           {!imageLoading && (
//             <img
//               src={base64Image}
//               alt={product.name}
//               className={`w-full ${compact ? 'h-32' : 'h-48'} object-contain transition-opacity duration-300`}
//               onError={() => {
//                 if (!imageError) {
//                   setImageError(true);
//                   setBase64Image(createPlaceholderBase64());
//                 }
//               }}
//             />
//           )}

//           {hovered && !imageLoading && (
//             <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center gap-2 transition-opacity">
//               {showWishlist && (
//                 <button
//                   className={`p-2 rounded-full transition-colors ${wishlist ? "bg-orange-600 text-white" : "bg-orange-500 text-white hover:bg-orange-600"}`}
//                   onClick={handleAddToWishlist}
//                 >
//                   <Heart className="h-5 w-5" fill={wishlist ? "currentColor" : "none"} />
//                 </button>
//               )}

//               {showCartButton && (
//                 <button
//                   className="relative p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
//                   onClick={handleAddToCart}
//                 >
//                   <ShoppingCart className="h-5 w-5" />
//                   {cart.length > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                       {cart.length}
//                     </span>
//                   )}
//                 </button>
//               )}

//               {showQuickView && (
//                 <Link to={`/products/${product.id}`} className="block relative">
//                   <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors">
//                     <Eye className="h-5 w-5" />
//                   </button>
//                 </Link>
//               )}
//             </div>
//           )}
//         </div>

//         <Link to={`/products/${product.id}`} className="block relative">
//           <div className={`p-4 ${compact ? 'p-2' : ''}`}>
//             {showRatings && (
//               <div className="flex items-center mb-2">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-4 w-4 ${i < (product.average_rating ?? 0) ? "text-orange-400 fill-orange-400" : "text-gray-300"}`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-xs text-orange-500 ml-2">({product.reviews ?? 0})</span>
//               </div>
//             )}

//             <h3 className={`text-sm font-medium text-gray-900 mb-2 ${compact ? 'line-clamp-1' : 'line-clamp-2'}`}>
//               {product.name}
//             </h3>

//             <div className="flex items-center justify-between">
//               <span className="text-md font-medium text-primary-default">
//                 {formatCurrency(product.price)}
//               </span>
//               {product.discount_price && product.discount_price < product.price && (
//                 <span className="text-sm text-gray-400 line-through ml-2 text-primary">
//                   {formatCurrency(product.discount_price)}
//                 </span>
//               )}
//             </div>
//           </div>
//         </Link>
//       </div>

//       {showLoginModal && <ModalAuth onClose={() => setShowLoginModal(false)} />}
//     </>
//   );
// };

import React, { useState } from "react";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useCartStore from "../../lib/store/useCartStore";
import useWishlistStore from "../../lib/store/useWishlistStore";
import { Product } from "../../types";
import Cookies from "js-cookie";
import { ModalAuth } from "./LoginSignupModal";
import { formatCurrency } from "../../lib/utils";
import { OptimizedImage } from "./OptimizedImage";
// import { OptimizedImage } from "../../components/OptimizedImage";

interface ProductCardProps {
  product: Product;
  showRatings?: boolean;
  showWishlist?: boolean;
  showQuickView?: boolean;
  showCartButton?: boolean;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showRatings = true,
  showWishlist = true,
  showQuickView = true,
  showCartButton = true,
  compact = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { addToCart, cart } = useCartStore();
  const { wishlist, addToWishlist } = useWishlistStore();

  const availableVariation = product.variations?.find((variation) => variation.quantity > 0);
  const isLoggedIn = !!Cookies.get("access_token");
  const userId = Cookies.get("userId");

  const handleAddToCart = () => {
    if (!availableVariation) {
      toast.error("No available variations for this product.");
      return;
    }
    addToCart(product.id, availableVariation.id, 1);
  };

  const handleAddToWishlist = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (!availableVariation) {
      toast.error("No available variations for this product.");
      return;
    }

    await addToWishlist({
      userId: Number(userId),
      productId: product.id,
      productVariationId: availableVariation.id,
      quantity: 1,
    });
  };

  const handleImageError = () => {
    console.warn(`Failed to load image for product: ${product.name}`);
  };

  const handleImageLoad = () => {
    // Optional: Add any logic when image loads successfully
  };

  return (
    <>
      <div
        className={`relative bg-white rounded border overflow-hidden transition-all hover:shadow-lg ${compact ? 'p-2' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="px-2 relative">
          <OptimizedImage
            src={product}
            alt={product.name}
            className={`w-full ${compact ? 'h-32' : 'h-48'} object-contain`}
            containerClassName="relative"
            loading="lazy"
            placeholder="Product Image"
            
            onError={handleImageError}
            onLoad={handleImageLoad}
          />

          {hovered && (
            <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center gap-2 transition-opacity">
              {showWishlist && (
                <button
                  className={`p-2 rounded-full transition-colors ${wishlist ? "bg-orange-600 text-white" : "bg-orange-500 text-white hover:bg-orange-600"}`}
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-5 w-5" fill={wishlist ? "currentColor" : "none"} />
                </button>
              )}

              {showCartButton && (
                <button
                  className="relative p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </button>
              )}

              {showQuickView && (
                <Link to={`/products/${product.id}`} className="block relative">
                  <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors">
                    <Eye className="h-5 w-5" />
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>

        <Link to={`/products/${product.id}`} className="block relative">
          <div className={`p-4 ${compact ? 'p-2' : ''}`}>
            {showRatings && (
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < (product.average_rating ?? 0) ? "text-orange-400 fill-orange-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-orange-500 ml-2">({product.reviews ?? 0})</span>
              </div>
            )}

            <h3 className={`text-sm font-medium text-gray-900 mb-2 ${compact ? 'line-clamp-1' : 'line-clamp-2'}`}>
              {product.name}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-md font-medium text-primary-default">
                {formatCurrency(product.price)}
              </span>
              {product.discount_price && product.discount_price < product.price && (
                <span className="text-sm text-gray-400 line-through ml-2 text-primary">
                  {formatCurrency(product.discount_price)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>

      {showLoginModal && <ModalAuth onClose={() => setShowLoginModal(false)} />}
    </>
  );
};