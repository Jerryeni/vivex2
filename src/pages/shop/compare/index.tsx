import React from 'react';
import { Star, ShoppingCart, Heart, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../../components/Breadcrumb';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  brand: string;
  model: string;
  stockStatus: 'IN STOCK' | 'OUT OF STOCK';
  size: string;
  weight: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Gamdias ARES M2 Gaming Keyboard, Mouse and Mouse Mat Combo',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
    price: 899,
    rating: 4.5,
    reviews: 446385,
    brand: 'StarTech',
    model: 'ARES M2 and ZEUS E2',
    stockStatus: 'IN STOCK',
    size: '47 inches, 110.5 cm',
    weight: '650 g (7.41 oz)'
  },
  {
    id: '2',
    name: 'Apple iMac 24" 4K Retina Display M1 8 Core CPU, 8 Core GPU, 256GB SSD, Blue (MGPK3ZP/A) 2021',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4',
    price: 1699,
    rating: 4.8,
    reviews: 373743,
    brand: 'Apple',
    model: 'Apple iMac 24" M1 Blue 2021',
    stockStatus: 'IN STOCK',
    size: '6.7 inches, 109.8 cm',
    weight: '240 g (8.47 oz)'
  },
  {
    id: '3',
    name: 'Samsung Galaxy S21 FE 5G Cell Phone, Factory Unlocked Android Smartphone, 128GB',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf',
    price: 699.99,
    rating: 4.6,
    reviews: 455761,
    brand: 'Samsung',
    model: 'S21 FE',
    stockStatus: 'OUT OF STOCK',
    size: '6.4 inches, 98.9 cm',
    weight: '177 g (6.24 oz)'
  }
];

export const Compare = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Compare' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mt-8">
          <div className="grid grid-cols-4 gap-6">
            {/* Empty Column */}
            <div className="space-y-4">
              <div className="h-[300px]"></div>
              <div className="space-y-2">
                <p className="font-medium">Customer feedback:</p>
                <p>Price:</p>
                <p>Sold by:</p>
                <p>Brand:</p>
                <p>Model:</p>
                <p>Stock status:</p>
                <p>Size:</p>
                <p>Weight:</p>
              </div>
            </div>

            {/* Product Columns */}
            {products.map((product) => (
              <div key={product.id} className="space-y-4">
                <div className="relative bg-white p-4 rounded-lg">
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                    <X className="h-5 w-5" />
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="text-sm font-medium line-clamp-2 mb-4">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center space-x-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>ADD TO CARD</span>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews.toLocaleString()})</span>
                  </div>
                  <p className="text-blue-600 font-bold">${product.price}</p>
                  <p>{product.brand}</p>
                  <p>{product.model}</p>
                  <p className={`${
                    product.stockStatus === 'IN STOCK' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {product.stockStatus}
                  </p>
                  <p>{product.size}</p>
                  <p>{product.weight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};