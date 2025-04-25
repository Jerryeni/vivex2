import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Heart, Minus, Plus } from "lucide-react";
import { ProductSkeleton } from "../../components/ui/ProductSkeleton";
import { ProductCard } from "../../components/ui/ProductCard";
import { useProduct, useProducts } from "../../lib/api/product";
import useCartStore from "../../lib/store/useCartStore";

export const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const { data: allProducts = { results: [] }, isLoading: isRelatedLoading } = useProducts();
  const { addToCart, updateCartItem, removeFromCart, fetchCart, cart } = useCartStore();
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) return <ProductSkeleton />;
  if (error || !product) return <div className="text-center text-red-500">Failed to load product</div>;

  const relatedProducts = allProducts.results?.filter(
    (p:any) => p.category?.id === product.category?.id && p.id !== product.id
  ).slice(0, 4) || [];

  const availableVariation = product.variations?.find((variation:any) => variation.quantity > 0);

  const cartItem = cart.find(
    (item) =>
      item.data?.product?.id === product?.id &&
      item.data?.product_variation?.id === availableVariation?.id
  )?.data;

  const handleIncreaseQuantity = async () => {
    if (cartItem) {
      await updateCartItem(cartItem.id, cartItem.quantity + 1);
    } else {
      await addToCart(product.id, availableVariation.id, 1);
    }
    await fetchCart();
  };

  const handleDecreaseQuantity = async () => {
    if (cartItem && cartItem.quantity > 1) {
      await updateCartItem(cartItem.id, cartItem.quantity - 1);
    } else if (cartItem && cartItem.quantity === 1) {
      await removeFromCart(cartItem.id);
    }
    await fetchCart();
  };

  const handleAddToCart = async () => {
    await addToCart(product.id, availableVariation.id, 1);
    await fetchCart();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="aspect-w-4 aspect-h-3 mb-4">
                <img
                  src={product.images?.[selectedImage]?.image_url || "https://via.placeholder.com/400"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.images?.map((image: any, index:any) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg border overflow-hidden ${selectedImage === index ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <img
                      src={image.image_url || "https://via.placeholder.com/400"}
                      alt={product.name}
                      className="w-full h-full object-cover p-2"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(Number(product.rating)) ? "text-yellow-400 fill-orange-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {String(product.rating)} Star Rating ({String(product.reviews)} Reviews)
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center mb-6 text-sm text-gray-600">
                <span className="mx-4">|</span>
                <span>Brand: <strong>{String(product.brand)}</strong></span>
                <span className="mx-4">|</span>
                <span>Category: <strong>{String(product.category?.name || "N/A")}</strong></span>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-xl font-bold text-secondary-100">
                  ${Number(product.price).toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${Number(product.originalPrice).toFixed(2)}
                    </span>
                    <span className="px-2 py-1 text-sm text-white bg-yellow-500 rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <button onClick={handleDecreaseQuantity} className="px-3 py-2 border-r hover:bg-gray-50">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2">{cartItem?.quantity || 1}</span>
                  <button onClick={handleIncreaseQuantity} className="px-3 py-2 border-l hover:bg-gray-50">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button onClick={handleAddToCart} className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors">
                  ADD TO CART
                </button>
                <button className="px-4 py-3 border rounded-md hover:bg-gray-50">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isRelatedLoading ? <p>Loading related products...</p> : relatedProducts.length > 0 ? relatedProducts.map((relatedProduct: any) => <ProductCard key={relatedProduct.id} product={relatedProduct} />) : <p>No related products found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
