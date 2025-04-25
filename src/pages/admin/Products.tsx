import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  List as ListIcon, 
  Heart, 
  Eye, 
  Star, 
  Plus,
  Settings as FilterIcon,
  Search,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  stock: {
    left: number;
    sold: number;
  };
  sizes: string[];
}

const products: Product[] = [
  {
    id: '1',
    name: 'Men Black Slim Fit T-shirt',
    price: 100,
    salePrice: 50,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
    rating: 4.5,
    reviews: 156,
    category: 'Fashion',
    stock: { left: 486, sold: 155 },
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Olive Green Leather Bag',
    price: 156,
    salePrice: 136,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    rating: 4.1,
    reviews: 143,
    category: 'Hand Bag',
    stock: { left: 784, sold: 674 },
    sizes: ['S', 'M']
  },
  // Add more products...
];

const categories = [
  'All Categories',
  'Fashion Men, Women & Kid\'s',
  'Eye Wear & Sunglass',
  'Watch',
  'Electronics Items',
  'Furniture',
  'Headphones',
  'Beauty & Health',
  'Foot Wear'
];

const priceRanges = [
  'All Price',
  'Below $50 (+54)',
  '$50 - $100 (+155)',
  '$100 - $500 (+274)',
  '$500 - $1000 (+274)',
  '$1000 - $1500 (+23)'
];

const genders = [
  { label: 'Men', count: 8834 },
  { label: 'Women', count: 2834 },
  { label: 'Kid\'s', count: 2311 }
];

const sizes = [
  'S (1,245)',
  'M (2,879)',
  'L (3,875)',
  'XL (7,364)',
  'XXL (1,203)'
];

export const ProductsPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-[#1F2937] text-white">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="V-stores" className="h-6" />
            <span className="text-xl font-semibold">V-stores</span>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-gray-400 hover:text-white cursor-pointer">
                <span className="text-sm font-medium">GENERAL</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="mt-2 space-y-1">
                <Link to="/admin" className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white">
                  <LayoutGrid className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-600 text-white">
                  <div className="flex items-center space-x-2">
                    <ListIcon className="h-5 w-5" />
                    <span>Products</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">PRODUCT {viewMode.toUpperCase()}</h1>
            <div className="flex items-center space-x-4">
              <button 
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button 
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
                onClick={() => setViewMode('list')}
              >
                <ListIcon className="h-5 w-5" />
              </button>
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
                <FilterIcon className="h-5 w-5" />
                <span>More Setting</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg">
                <Plus className="h-5 w-5" />
                <Link to="/admin/products/create">Add Product</Link>
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filters */}
            <div className="w-64 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-4">Product Price</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="price"
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-600">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-4">Gender</h3>
                <div className="space-y-2">
                  {genders.map((gender) => (
                    <label key={gender.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-600">{gender.label}</span>
                      </div>
                      <span className="text-sm text-gray-400">({gender.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size & Fit */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold mb-4">Size & Fit</h3>
                <div className="space-y-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-600">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="flex-1">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg p-4">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full hover:bg-gray-100">
                          <Heart className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="flex items-center mb-2">
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
                        <span className="text-sm text-gray-500 ml-1">
                          ({product.reviews})
                        </span>
                      </div>
                      <h3 className="text-sm font-medium mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-blue-600 font-bold">${product.salePrice}</span>
                          {product.salePrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        <button className="text-orange-500 hover:text-orange-600">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Product Name & Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Rating
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Size: {product.sizes.join(', ')}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {product.stock.left} Items Left
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.stock.sold} Sold
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="px-6 py-4">
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
                              <span className="text-sm text-gray-500 ml-2">
                                ({product.reviews})
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <Eye className="h-5 w-5 text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <Heart className="h-5 w-5 text-gray-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};