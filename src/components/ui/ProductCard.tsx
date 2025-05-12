// import React, { useState } from "react";
// import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify"; // Ensure toast is imported
// import useCartStore from "../../lib/store/useCartStore";
// import { Product } from "../../types";

// interface ProductCardProps {
//   product: Product;
// }

// export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const [hovered, setHovered] = useState(false);
//   const { addToCart, cart } = useCartStore(); // Get cart data from Zustand store

//   // Find the first available variation (where quantity > 0)
//   const availableVariation = product.variations?.find((variation) => variation.quantity > 0);

//   const handleAddToCart = () => {
//     if (!availableVariation) {
//       toast.error("No available variations for this product.");
//       return;
//     }

//     addToCart(product.id, availableVariation.id, 1);
//   };

//   return (
//     <div
//       className="relative bg-white rounded-lg border overflow-hidden shadow-sm transition-all hover:shadow-lg"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div>
//         <img
//           src={product.images.length > 0 ? product.images[0].image_url : "/placeholder.jpg"}
//           alt={product.name}
//           className="w-full h-48 object-cover"
//         />

//         {hovered && (
//           <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 transition-opacity">
//             <button className="p-2 bg-orange-500 text-white rounded-full hover:bg-gray-200 transition-colors">
//               <Heart className="h-5 w-5" />
//             </button>
//             <button
//               className="relative p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
//               onClick={handleAddToCart}
//             >
//               <ShoppingCart className="h-5 w-5" />
//               {/* Badge for cart count */}
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                   {cart.length}
//                 </span>
//               )}
//             </button>
//             <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors">
//               <Eye className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>

//       <Link to={`/products/${product.id}`} className="block relative">
//         <div className="p-4">
//           <div className="flex items-center mb-2">
//             <div className="flex items-center">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`h-4 w-4 ${i < (product.average_rating ?? 0) ? "text-orange-400 fill-orange-400" : "text-gray-300"}`}
//                 />
//               ))}
//             </div>
//             <span className="text-xs text-orange-500 ml-2">({product.reviews ?? 0})</span>
//           </div>
//           <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

//           <div className="flex items-center justify-between">
//             <span className="text-md font-medium text-primary-default">₦{product.discount_price.toFixed(2)}</span>
//             {product.originalPrice && (
//               <span className="text-sm text-gray-400 line-through ml-2 text-primary">
//                 ${product.price.toFixed(2)}
//               </span>
//             )}
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// import React, { useState } from "react";
// import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import useCartStore from "../../lib/store/useCartStore";
// import useWishlistStore from "../../lib/store/useWishlistStore";
// import { Product } from "../../types";
// import Cookies from "js-cookie";

// export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
//   const [hovered, setHovered] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const { addToCart, cart } = useCartStore();
//   const { wishlist, addToWishlist } = useWishlistStore();

//   const availableVariation = product.variations?.find((variation) => variation.quantity > 0);
//   const isLoggedIn = !!Cookies.get("access_token");
//   const isInWishlist = wishlist.some((item) => item.product.id === product.id);

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

//     await addToWishlist(product.id, availableVariation.id);
//   };

//   const handleLoginSuccess = () => {
//     setShowLoginModal(false);
//     window.location.reload(); // Refresh after login
//   };

//   return (
//     <>
//       <div
//         className="relative bg-white rounded-lg border overflow-hidden shadow-sm transition-all hover:shadow-lg"
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <div>
//           <img
//             src={product.images.length > 0 ? product.images[0].image_url : "/placeholder.jpg"}
//             alt={product.name}
//             className="w-full h-48 object-cover"
//           />

//           {hovered && (
//             <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 transition-opacity">
//               <button
//                 className={`p-2 rounded-full transition-colors ${
//                   isInWishlist ? "bg-orange-600 text-white" : "bg-orange-500 text-white hover:bg-orange-600"
//                 }`}
//                 onClick={handleAddToWishlist}
//               >
//                 <Heart className="h-5 w-5" fill={isInWishlist ? "currentColor" : "none"} />
//               </button>
//               <button
//                 className="relative p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
//                 onClick={handleAddToCart}
//               >
//                 <ShoppingCart className="h-5 w-5" />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                     {cart.length}
//                   </span>
//                 )}
//               </button>
//               <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors">
//                 <Eye className="h-5 w-5" />
//               </button>
//             </div>
//           )}
//         </div>

//         <Link to={`/products/${product.id}`} className="block relative">
//           <div className="p-4">
//             <div className="flex items-center mb-2">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-4 w-4 ${
//                       i < (product.average_rating ?? 0) ? "text-orange-400 fill-orange-400" : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-xs text-orange-500 ml-2">({product.reviews ?? 0})</span>
//             </div>
//             <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

//             <div className="flex items-center justify-between">
//               <span className="text-md font-medium text-primary-default">₦{product.discount_price.toFixed(2)}</span>
//               {product.originalPrice && (
//                 <span className="text-sm text-gray-400 line-through ml-2 text-primary">
//                   ₦{product.price.toFixed(2)}
//                 </span>
//               )}
//             </div>
//           </div>
//         </Link>
//       </div>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
//             <h2 className="text-lg font-semibold mb-4">Please Login or Sign Up</h2>
//             <p className="text-sm text-gray-600 mb-4">
//               You need to be logged in to add items to your wishlist.
//             </p>
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowLoginModal(false)}
//                 className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <Link
//                 to="/login"
//                 onClick={handleLoginSuccess}
//                 className="px-4 py-2 text-sm bg-orange-500 text-white hover:bg-orange-600 rounded-md"
//               >
//                 Login / Signup
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
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

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart, cart } = useCartStore();
  const { wishlist, addToWishlist } = useWishlistStore();

  const availableVariation = product.variations?.find((variation) => variation.quantity > 0);
  const isLoggedIn = !!Cookies.get("access_token");

  const filteredVariation = product.variations?.find(
    (v) =>
      v.color === selectedColor &&
      v.size === selectedSize &&
      v.quantity > 0
  );

  const isInWishlist = wishlist.some((item) => item.product.id === product.id);

  const userId = Cookies.get("userId");
  console.log("User ID:", userId);

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

    await addToWishlist(Number(userId), availableVariation);
  };

  // const handleAddToWishlist = async () => {
  //   if (!isLoggedIn) {
  //     setShowLoginModal(true);
  //     return;
  //   }

  //   if (!filteredVariation) {
  //     toast.error("Please select available color and size.");
  //     return;
  //   }

  //   const product_variation = {
  //     color: selectedColor!,
  //     size: selectedSize!,
  //     quantity: 1,
  //   }

  //   await addToWishlist(Number(userId), product_variation);
  // };

  const uniqueColors = [...new Set(product.variations.map((v) => v.color))];
  const availableSizes = [...new Set(
    product.variations
      .filter((v) => v.color === selectedColor)
      .map((v) => v.size)
  )];

  return (
    <>
      <div
        className="relative bg-white rounded-lg border overflow-hidden shadow-sm transition-all hover:shadow-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div>
          <img
            src={product.images.length > 0 ? product.images[0].image_url : "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-48 object-cover"
          />

          {hovered && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 transition-opacity">
              <button
                className={`p-2 rounded-full transition-colors ${
                  isInWishlist ? "bg-orange-600 text-white" : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
                onClick={handleAddToWishlist}
              >
                <Heart className="h-5 w-5" fill={isInWishlist ? "currentColor" : "none"} />
              </button>
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
              <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors">
                <Eye className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <Link to={`/products/${product.id}`} className="block relative">
          <div className="p-4">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < (product.average_rating ?? 0) ? "text-orange-400 fill-orange-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-orange-500 ml-2">({product.reviews ?? 0})</span>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

            <div className="flex items-center justify-between">
              <span className="text-md font-medium text-primary-default">₦{product.discount_price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through ml-2 text-primary">
                  ₦{product.price.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label className="text-xs text-gray-500">Color:</label>
                <select
                  value={selectedColor || ""}
                  onChange={(e) => {
                    setSelectedColor(e.target.value);
                    setSelectedSize(null); // Reset size when color changes
                  }}
                  className="w-full mt-1 text-sm p-1 border rounded"
                >
                  <option value="" disabled>Select color</option>
                  {uniqueColors.map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
              {selectedColor && (
                <div>
                  <label className="text-xs text-gray-500">Size:</label>
                  <select
                    value={selectedSize || ""}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full mt-1 text-sm p-1 border rounded"
                  >
                    <option value="" disabled>Select size</option>
                    {availableSizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Please Login or Sign Up</h2>
            <p className="text-sm text-gray-600 mb-4">
              You need to be logged in to add items to your wishlist.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 text-sm bg-orange-500 text-white hover:bg-orange-600 rounded-md"
              >
                Login / Signup
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && <ModalAuth onClose={() => setShowModal(false)} />}
    </>
  );
};