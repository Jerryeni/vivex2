import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Info,
  Gift,
  Headphones,
  ChevronDown,
  ChevronRight,
  Moon,
  Bell,
  Search
} from 'lucide-react';

interface Admin_ProductDetails {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  review: number;
  status: 'New Arrival' | 'Best Seller' | 'Sale';
  colors: {
    name: string;
    code: string;
  }[];
  sizes: string[];
  stock: {
    inStock: boolean;
    quantity: number;
  };
  shipping: {
    freeDelivery: boolean;
    deliveryTime: string;
  };
  discount: {
    code: string;
    percentage: number;
  };
  description: string;
  offers: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  specifications: {
    dimensions: string;
    weight: string;
    manufacturer: string;
    origin: string;
    department: string;
    model: string;
    date: string;
  };
  reviews: {
    id: string;
    user: {
      name: string;
      avatar: string;
      location: string;
      date: string;
    };
    rating: number;
    title: string;
    comment: string;
    helpful: number;
  }[];
  images: string[];
}

const productData: Admin_ProductDetails = {
  id: 'T-123',
  name: 'Men Black Slim Fit T-shirt',
  price: 80.00,
  originalPrice: 100.00,
  rating: 4.5,
  review: 156,
  status: 'New Arrival',
  colors: [
    { name: 'Black', code: '#000000' },
    { name: 'Beige', code: '#F5F5DC' },
    { name: 'Gray', code: '#808080' },
    { name: 'Green', code: '#008000' }
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  stock: {
    inStock: true,
    quantity: 150
  },
  shipping: {
    freeDelivery: true,
    deliveryTime: '2-3 business days'
  },
  discount: {
    code: 'CODE123',
    percentage: 10
  },
  description: 'Top in sweatshirt fabric made from a cotton blend with a soft brushed inside. Relaxed fit with dropped shoulders, long sleeves and ribbing around the neckline, cuffs and hem. Small metal text applique.',
  offers: [
    {
      title: 'Bank Offer',
      description: '10% instant discount on Bank Debit Card, up to $30 on orders of $50 and above',
      icon: <Gift className="h-5 w-5 text-green-500" />
    },
    {
      title: 'Special discounts for customers',
      description: 'Coupons up to $100',
      icon: <Gift className="h-5 w-5 text-orange-500" />
    },
    {
      title: 'Free gift wrapping',
      description: 'With 100 letters custom note',
      icon: <Gift className="h-5 w-5 text-blue-500" />
    },
    {
      title: 'Expert Customer Service',
      description: '8AM - 10PM, 7 days/week',
      icon: <Headphones className="h-5 w-5 text-purple-500" />
    }
  ],
  specifications: {
    dimensions: '53.3 x 40.6 x 4.5 cm; 500 Grams',
    weight: '500 g',
    manufacturer: 'Greensilver, NC 27401 Phillips Rd',
    origin: 'U.S.A',
    department: 'Men',
    model: 'T117AZ',
    date: '22 September 2023'
  },
  reviews: [
    {
      id: '1',
      user: {
        name: 'Manny K. Mark',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        location: 'Canada',
        date: '16 November 2023'
      },
      rating: 4.5,
      title: 'Excellent Quality',
      comment: 'Medium thickness. Did not shrink after wash. Good durability. XL size Perfectly fit for 5.10 height and heavy body. Did not fade after wash. Only for decent colour t-shirt cotton tight jeans fit first wash lost not faded. I recommend this product.',
      helpful: 12
    },
    {
      id: '2',
      user: {
        name: 'Jorge Harry',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        location: 'U.S.A',
        date: '21 December 2023'
      },
      rating: 4,
      title: 'Good Quality',
      comment: 'I liked the t-shirt, it\'s pure cotton & skin friendly, but the size is smaller to compare standard size, best rated.',
      helpful: 8
    }
  ],
  images: [
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1b',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1c',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1d'
  ]
};

export const ProductDetailsPage = () => {
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Same as Products page */}
      <aside className="w-64 bg-[#1F2937] text-white">
        {/* Sidebar content */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold">PRODUCT DETAILS</h1>
            <div className="flex items-center space-x-4">
              <Moon className="h-5 w-5 text-gray-500" />
              <Bell className="h-5 w-5 text-gray-500" />
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <img
                src={productData.reviews[0].user.avatar}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="bg-white p-6 rounded-lg">
                <div className="aspect-w-1 aspect-h-1 mb-4">
                  <img
                    src={productData.images[selectedImage]}
                    alt={productData.name}
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {productData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative rounded-lg overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Product view ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-white p-6 rounded-lg">
                {productData.status && (
                  <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded mb-4">
                    {productData.status}
                  </span>
                )}
                <h1 className="text-2xl font-semibold mb-2">{productData.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(productData.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {productData.rating} ({productData.review} Reviews)
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-2xl font-bold text-blue-600">
                    ${productData.price.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${productData.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-red-500">
                    {Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)}% OFF
                  </span>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Colors</span>
                    <span className="text-sm text-gray-500">{selectedColor.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    {productData.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor.name === color.name
                            ? 'border-blue-500'
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color.code }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Size</span>
                    <span className="text-sm text-gray-500">{selectedSize}</span>
                  </div>
                  <div className="flex space-x-2">
                    {productData.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-md border ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <span className="text-sm font-medium mb-2 block">Quantity:</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 border-r hover:bg-gray-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 border-l hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {productData.stock.quantity} items available
                    </span>
                  </div>
                </div>

                {/* Stock & Shipping */}
                <div className="space-y-2 mb-6">
                  {productData.stock.inStock && (
                    <div className="flex items-center text-green-500">
                      <Info className="h-4 w-4 mr-2" />
                      <span className="text-sm">In Stock</span>
                    </div>
                  )}
                  {productData.shipping.freeDelivery && (
                    <div className="flex items-center text-blue-500">
                      <Info className="h-4 w-4 mr-2" />
                      <span className="text-sm">Free delivery available</span>
                    </div>
                  )}
                  {productData.discount.code && (
                    <div className="flex items-center text-orange-500">
                      <Info className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        Sale {productData.discount.percentage}% OFF Use Code: {productData.discount.code}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add To Cart</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border rounded-lg hover:bg-gray-50">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Offers */}
              <div className="bg-white p-6 rounded-lg">
                <h2 className="font-semibold mb-4">Available offers:</h2>
                <div className="space-y-4">
                  {productData.offers.map((offer, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {offer.icon}
                      <div>
                        <h3 className="font-medium text-sm">{offer.title}</h3>
                        <p className="text-sm text-gray-600">{offer.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details & Reviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Specifications */}
            <div className="bg-white p-6 rounded-lg">
              <h2 className="font-semibold mb-4">Items Detail</h2>
              <div className="space-y-4">
                {Object.entries(productData.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="text-sm text-gray-600">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                    <span className="text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-6 rounded-lg">
              <h2 className="font-semibold mb-4">Top Review From World</h2>
              <div className="space-y-6">
                {productData.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="h-12 w-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{review.user.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>Reviewed in {review.user.location} on {review.user.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(review.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium">{review.title}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{review.comment}</p>
                    <div className="flex items-center space-x-4">
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        Helpful ({review.helpful})
                      </button>
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};