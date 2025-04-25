import React, { useState } from "react";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Ensure toast is imported
import useCartStore from "../../lib/store/useCartStore";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const { addToCart, cart } = useCartStore(); // Get cart data from Zustand store

  // Find the first available variation (where quantity > 0)
  const availableVariation = product.variations?.find((variation) => variation.quantity > 0);

  const handleAddToCart = () => {
    if (!availableVariation) {
      toast.error("No available variations for this product.");
      return;
    }

    addToCart(product.id, availableVariation.id, 1);
  };

  return (
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
            <button className="p-2 bg-orange-500 text-white rounded-full hover:bg-gray-200 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button
              className="relative p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {/* Badge for cart count */}
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
                  className={`h-4 w-4 ${i < (product.average_rating ?? 0) ? "text-orange-400 fill-orange-400" : "text-gray-300"}`}
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
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};