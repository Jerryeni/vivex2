import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Heart, Minus, Plus } from "lucide-react";
import { ProductSkeleton } from "../../components/ui/ProductSkeleton";
import { ProductCard } from "../../components/ui/ProductCard";
import { useProduct, useProducts } from "../../lib/api/product";
import useCartStore from "../../lib/store/useCartStore";
import useWishlistStore from "../../lib/store/useWishlistStore";
import { useAuthStore } from "../../lib/store/useAuthStore";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { ModalAuth } from "../../components/ui/LoginSignupModal";

const userId = Cookies.get("userId");

export const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const { data: allProducts = { results: [] }, isLoading: isRelatedLoading } = useProducts();

  const { addToCart, updateCartItem, removeFromCart, fetchCart, cart } = useCartStore();
  const { wishlist, addToWishlist, removeFromWishlist, fetchWishlist } = useWishlistStore();
  const { user } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const [liked, setLiked] = useState(false);

  const isLoggedIn = !!Cookies.get("access_token");

  useEffect(() => {
    if (product?.data?.variations?.length && !selectedVariation) {
      const available = product.data.variations.filter((v: any) => v.quantity > 0);
      setSelectedVariation(available[0] || null);
    }
  }, [product?.data]);

  useEffect(() => {
    if (!product?.data || !selectedVariation) return;
    const isInWishlist = wishlist.some(
      (item) =>
        item.product?.id === product.data.id &&
        item.product_variation?.id === selectedVariation.id
    );
    setLiked(isInWishlist);
  }, [wishlist, product?.data, selectedVariation]);

  if (isLoading) return <ProductSkeleton />;
  if (error || !product?.data) return <div className="text-center text-red-500">Failed to load product</div>;

  const productData = product.data;
  const availableVariations = productData.variations?.filter((v: any) => v.quantity > 0) || [];
  const defaultVariation = selectedVariation;

  const cartItem = cart.find(
    (item) =>
      item.product?.id === productData.id &&
      item.product_variation?.id === defaultVariation?.id
  );

  const handleIncreaseQuantity = async () => {
    if (!defaultVariation) return;
    if (cartItem) {
      await updateCartItem(cartItem.id, cartItem.quantity + 1);
    } else {
      await addToCart(productData.id, defaultVariation.id, 1);
    }
    await fetchCart();
  };

  const handleDecreaseQuantity = async () => {
    if (!defaultVariation || !cartItem) return;
    if (cartItem.quantity > 1) {
      await updateCartItem(cartItem.id, cartItem.quantity - 1);
    } else {
      await removeFromCart(cartItem.id);
    }
    await fetchCart();
  };

  const handleAddToCart = async () => {
    if (!defaultVariation) return;
    await addToCart(productData.id, defaultVariation.id, 1);
    await fetchCart();
  };

  const toggleWishlist = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const wishlistItem = wishlist.find(
      (item) =>
        item.product.id === productData.id &&
        item.product_variation.id === defaultVariation.id
    );

    if (wishlistItem) {
      await removeFromWishlist(wishlistItem.id);
    } else {
      await addToWishlist({
        userId: user?.id,
        productId: productData.id,
        productVariationId: defaultVariation.id,
        quantity: 1,
      });
    }

    await fetchWishlist();
  };

  const relatedProducts = allProducts.results
    ?.filter((p: any) => p.category?.id === productData.category?.id && p.id !== productData.id)
    .slice(0, 4) || [];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Viewer */}
              <div>
                <div className="aspect-w-4 aspect-h-3 mb-4">
                  <img
                    src={productData.images?.[selectedImage]?.image_url || "https://via.placeholder.com/400"}
                    alt={productData.name}
                    className="w-full max-h-[300px] object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {productData.images?.map((image: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-lg border overflow-hidden ${selectedImage === index ? "ring-2 ring-blue-500" : ""}`}
                    >
                      <img
                        src={image.image_url || "https://via.placeholder.com/400"}
                        alt={productData.name}
                        className="w-full h-full object-cover p-2"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(Number(productData.average_rating)) ? "text-yellow-400 fill-orange-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {productData.average_rating} Star Rating ({productData.reviews} Reviews)
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{productData.name}</h1>
                <div className="flex items-center mb-6 text-sm text-gray-600">
                  <span className="mx-4">|</span>
                  <span>Brand: <strong>{productData.brand}</strong></span>
                  <span className="mx-4">|</span>
                  <span>Category: <strong>{productData.category?.name || "N/A"}</strong></span>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-xl font-bold text-secondary-100">
                    ${Number(productData.selling_price).toFixed(2)}
                  </span>
                  {productData.price && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        ${Number(productData.price).toFixed(2)}
                      </span>
                      <span className="px-2 py-1 text-sm text-black bg-yellow/25 rounded">
                        {Math.round(((productData.price - productData.selling_price) / productData.price) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {defaultVariation ? (
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
                    <button onClick={toggleWishlist} className={`px-4 py-3 border rounded-md hover:bg-gray-50 ${liked ? "text-red-500" : "text-gray-400"}`}>
                      <Heart className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                ) : (
                  <div className="text-red-500 font-semibold mt-4">Out of Stock</div>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {isRelatedLoading ? (
                <p>Loading related products...</p>
              ) : relatedProducts.length > 0 ? (
                relatedProducts.map((relatedProduct: any) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))
              ) : (
                <p>No related products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && <ModalAuth onClose={() => setShowLoginModal(false)} />}
    </>
  );
};