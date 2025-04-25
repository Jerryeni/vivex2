import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, Trash2, Search, Plus } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  image: string;
  priceRange: string;
  createdBy: string;
  tagId: string;
  stock: number;
}

const categories: Category[] = [
  {
    id: 'FS16276',
    name: 'Fashion Men, Women & Kid\'s',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    priceRange: '$50 to $400',
    createdBy: 'Seller',
    tagId: 'FS16276',
    stock: 46233
  },
  {
    id: 'HB73829',
    name: 'Women Hand Bag',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    priceRange: '$120 to $500',
    createdBy: 'Admin',
    tagId: 'HB73829',
    stock: 2739
  },
  {
    id: 'CH89459',
    name: 'Cap and Hat',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee',
    priceRange: '$50 to $200',
    createdBy: 'Admin',
    tagId: 'CH89459',
    stock: 1829
  },
  {
    id: 'EC23816',
    name: 'Electronics Headphone',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    priceRange: '$100 to $700',
    createdBy: 'Seller',
    tagId: 'EC23816',
    stock: 1932
  }
];

const featuredCategories = [
  {
    id: 'fashion',
    name: 'Fashion Categories',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b'
  },
  {
    id: 'electronics',
    name: 'Electronics Headphone',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
  },
  {
    id: 'footwear',
    name: 'Foot Wares',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
  },
  {
    id: 'eyewear',
    name: 'Eye Ware & Sunglass',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083'
  }
];

export const CategoryList = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">CATEGORIES LIST</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {featuredCategories.map(category => (
          <div 
            key={category.id}
            className="relative bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg p-4 flex items-center space-x-4"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-medium text-sm">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-semibold">All Categories List</h2>
          <Link
            to="/admin/categories/create"
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Categories
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Starting Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Create by
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <span className="ml-3 text-sm font-medium">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {category.priceRange}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {category.createdBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {category.tagId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {category.stock}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Heart className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing 8 of 98,321 categories
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-orange-500 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded">
                2
              </button>
              <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded">
                3
              </button>
              <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};