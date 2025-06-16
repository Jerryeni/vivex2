import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Heart, Minus, Plus, CarTaxiFront, ShoppingCart } from "lucide-react";
import { ProductSkeleton } from "../../components/ui/ProductSkeleton";
import { ProductCard } from "../../components/ui/ProductCard";
import { useProduct, useProducts } from "../../lib/api/product";
import useCartStore from "../../lib/store/useCartStore";
import useWishlistStore from "../../lib/store/useWishlistStore";
import { useAuthStore } from "../../lib/store/useAuthStore";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { ModalAuth } from "../../components/ui/LoginSignupModal";
import { cn, formatCurrency } from "../../lib/utils";
import HeroNav from "../../components/layout/HeroNav";
// import { Breadcrumb } from "../../components/ui/Breadcrumb";
import { FlashCard } from "../../components/ui/flash-card";
import { Breadcrumb } from "../../components/Breadcrumb";

const userId = Cookies.get("userId");
const tabs = ["DESCRIPTION", "ADDITIONAL INFORMATION", "SPECIFICATION", "REVIEW"];

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

  const featuredProducts = allProducts.results
  ?.filter((p: any) =>
    p.is_featured === true &&
    p.category?.id === productData.category?.id &&
    p.id !== productData.id
  )
  .slice(0, 4) || [];

  const computingProducts = allProducts.results
  ?.filter((p: any) =>
    p.category?.name?.toLowerCase() === "computing"
  )
  .slice(0, 4) || [];

  const appleProducts = allProducts.results
  ?.filter((p: any) =>
    p.brand?.toLowerCase() === "apple"
  )
  .slice(0, 4) || [];

  // const breadcrumbItems = [
  //   { label: 'products', href: '/products' },
  //   { label: product || 'All Products' },
  // ];
  const breadcrumbItems = [
    { label: 'products', href: '/products' },
    { label: product || 'All Products' },
  ];

  const [activeTab, setActiveTab] = useState("DESCRIPTION");

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HeroNav />
          {/* <Breadcrumb items={breadcrumbItems} /> */}

          {/* Product Details */}

          <div className="rounded p-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Viewer */}
              <div className="relative ">
                <div className="border rounded p-8 aspect-w-4 aspect-h-3 mb-4">
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
                      className={`rounded max-h-[100px] border overflow-hidden ${selectedImage === index ? "ring-2 ring-primary-100" : ""}`}
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
                <h1 className="text-lg font-medium  mb-2">{productData.name}</h1>
                <div className="grid grid-cols-2 items-center mb-2 text-sm text-gray-600">
                  <span className="text-xs">Brand: <strong>{productData.brand}</strong></span>
                  <span className="text-xs">Category: <strong>{productData.category?.name || "N/A"}</strong></span>
                </div>
                <div className="flex items-center space-x-4 ">
                  <span className="text-md font-medium text-secondary-100">
                    {formatCurrency(productData.selling_price)}
                  </span>
                  {productData.price && (
                    <>
                      <span className="text-md text-gray-400 line-through">
                        {formatCurrency(productData.price)}
                      </span>
                      <span className="px-2 py-1 text-sm text-black bg-yellow/50 rounded">
                        {Math.round(((productData.price - productData.selling_price) / productData.price) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
                <div className="h-px bg-gray-400/40 my-4"></div>
                <div className="flex flex-col my-3">
                  <div className="mt-3 space-y-2">
                    {productData?.variations?.length > 0 ? (
                      productData.variations.map((variation: { id: any; color: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; size: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, idx: any) => (
                        <div
                          key={variation.id || idx}
                          className="borderx p-3 rounded-md xbg-gray-50 flex items-center justify-between text-sm text-gray-800"
                        >
                          <div className="flex items-center space-x-2"><strong>Color:</strong> <span className={`rounded-full w-8 h-8 inline-block mr-1 bg-${variation.color}-400`}></span> {variation.color}</div>
                          <div><strong>Size:</strong> {variation.size}</div>
                          <div><strong>Qty:</strong> {variation.quantity}</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No variations available.</p>
                    )}
                  </div>
                </div>

                {defaultVariation ? (
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center border rounded">
                      <button onClick={handleDecreaseQuantity} className="px-3 py-4 border- hover:bg-gray-50">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2">{cartItem?.quantity || 1}</span>
                      <button onClick={handleIncreaseQuantity} className="px-3 py-4 border- hover:bg-gray-50">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button onClick={handleAddToCart} className="flex-1 bg-orange-500 text-white px-6 py-4 rounded hover:bg-orange-600 transition-colors flex justify-center gap-2">
                      ADD TO CART
                      <span><ShoppingCart /></span>
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

          {/* product description */}
          <div className="mt-10 mx-auto border rounded-md w-full">
            <div className=" items-center flex justify-center border-b overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={cn(
                    "px-4 py-3 text-sm font-medium  whitespace-nowrap",
                    activeTab === tab
                      ? "border-b-2 border-orange-500 text-orange-600"
                      : "text-gray-500 hover:text-orange-500"
                  )}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                {activeTab === "DESCRIPTION" && (
                  <>
                    <h3 className="font-semibold mb-3">Description</h3>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-6">
                      {productData?.description || "No description available."}
                    </p>
                  </>
                )}
                {activeTab === "ADDITIONAL INFORMATION" && (
                  <>
                    <h3 className="font-semibold mb-3">Additional Information</h3>
                    <ul className="text-sm text-gray-700 space-y-2 list-disc ml-5">
                      <li>Brand: {productData?.brand}</li>
                      <li>Category: {productData?.category?.name}</li>
                      <li>Available Variations:</li>
                    </ul>
                    <div className="mt-3 space-y-2">
                      {productData?.variations?.length > 0 ? (
                        productData.variations.map((variation: { id: any; color: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; size: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, idx: any) => (
                          <div
                            key={variation.id || idx}
                            className="border p-3 rounded-md bg-gray-50 flex items-center justify-between text-sm text-gray-800"
                          >
                            <div className="flex items-center space-x-2"><strong>Color:</strong> <span className={`rounded-full w-8 h-8 inline-block mr-1 bg-${variation.color}-500`}></span> {variation.color}</div>
                            <div><strong>Size:</strong> {variation.size}</div>
                            <div><strong>Qty:</strong> {variation.quantity}</div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No variations available.</p>
                      )}
                    </div>
                  </>
                )}
                {activeTab === "SPECIFICATION" && (
                  <>
                    <h3 className="font-semibold mb-3">Specification</h3>
                    <p className="text-sm text-gray-700">
                      {product?.specification || "Specifications not provided."}
                    </p>
                  </>
                )}
                {activeTab === "REVIEW" && (
                  <>
                    <h3 className="font-semibold mb-3">Customer Reviews</h3>
                    <p className="text-sm text-gray-700">
                      {product?.reviews || "No reviews yet."}
                    </p>
                  </>
                )}
              </div>

              {/* Side Section */}
              <div className="flex gap-2 md:col-span-2">
                <div className="px-4">
                  <h4 className="font-semibold mb-3">Feature</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✅ Free 1 Year Warranty</li>
                    <li>🚚 Free Shipping & Fast Delivery</li>
                    <li>💰 100% Money-back guarantee</li>
                    <li>📞 24/7 Customer support</li>
                    <li>🔐 Secure payment method</li>
                  </ul>
                </div>


                <div className="border-l px-4">
                  <h4 className="font-semibold mb-2">Shipping Information</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><strong>Courier:</strong> 2–4 days, free shipping</li>
                    <li><strong>Local Shipping:</strong> up to one week, $19.00</li>
                    <li><strong>UPS:</strong> 4–6 days, $29.00</li>
                    <li><strong>Global Export:</strong> 3–4 days, $39.00</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            <div className="mt-12">
              <h2 className="text-lg font-medium mb-6 uppercase">Related Products</h2>
              <div className="grid grid-cols-1 w-fit gap-6">
                {isRelatedLoading ? (
                  <p>Loading related products...</p>
                ) : relatedProducts.length > 0 ? (
                  relatedProducts.map((relatedProduct: any) => (
                    <FlashCard
                      key={relatedProduct.id}
                      imageSrc={relatedProduct.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
                      imageAlt={relatedProduct.name}
                      title={relatedProduct.name}
                      price={relatedProduct.price}
                    />
                  ))
                ) : (
                  <p>No related products found.</p>
                )}
              </div>
            </div>
           
            <div className="mt-12">
              <h2 className="text-lg font-medium mb-6 uppercase">Product Accessories</h2>
              <div className="grid grid-cols-1 w-fit gap-6">
                {isRelatedLoading ? (
                  <p>Loading related products...</p>
                ) : computingProducts.length > 0 ? (
                  computingProducts.map((relatedProduct: any) => (
                    <FlashCard
                      key={relatedProduct.id}
                      imageSrc={relatedProduct.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
                      imageAlt={relatedProduct.name}
                      title={relatedProduct.name}
                      price={relatedProduct.price}
                    />
                  ))
                ) : (
                  <p>No related products found.</p>
                )}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-lg font-medium mb-6 uppercase">Apple Products</h2>
              <div className="grid grid-cols-1 w-fit gap-6">
                {isRelatedLoading ? (
                  <p>Loading related products...</p>
                ) : appleProducts.length > 0 ? (
                  appleProducts.map((relatedProduct: any) => (
                    <FlashCard
                      key={relatedProduct.id}
                      imageSrc={relatedProduct.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
                      imageAlt={relatedProduct.name}
                      title={relatedProduct.name}
                      price={relatedProduct.price}
                    />
                  ))
                ) : (
                  <p>No related products found.</p>
                )}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-lg font-medium mb-6 uppercase">Featured Products</h2>
              <div className="grid grid-cols-1 w-fit gap-6">
                {isRelatedLoading ? (
                  <p>Loading related products...</p>
                ) : featuredProducts.length > 0 ? (
                  featuredProducts.map((relatedProduct: any) => (
                    <FlashCard
                      key={relatedProduct.id}
                      imageSrc={relatedProduct.images?.[0]?.image_url || 'https://via.placeholder.com/150'}
                      imageAlt={relatedProduct.name}
                      title={relatedProduct.name}
                      price={relatedProduct.price}
                    />
                  ))
                ) : (
                  <p>No related products found.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {showLoginModal && <ModalAuth onClose={() => setShowLoginModal(false)} />}
    </>
  );
};