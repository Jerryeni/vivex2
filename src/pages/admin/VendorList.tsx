import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye, Star, ChevronRight } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  logo: string;
  category: string;
  rating: number;
  reviews: number;
  website: string;
  email: string;
  phone: string;
  address: string;
  stats: {
    items: number;
    sales: {
      value: number;
      trend: number;
    };
    clients: {
      value: number;
      trend: number;
    };
  };
  revenue: {
    value: number;
    currency: string;
  };
}

const vendors: Vendor[] = [
  {
    id: '1',
    name: 'ZARA International',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1280px-Zara_Logo.svg.png',
    category: 'Fashion',
    rating: 4.5,
    reviews: 3.5,
    website: 'www.zarafashion.co',
    email: 'zarafashionworld@zara.com',
    phone: '+243 812-481-9335',
    address: '4654 , PHB Lane Kneza #4 47404',
    stats: {
      items: 865,
      sales: { value: 4.5, trend: 1 },
      clients: { value: 2, trend: 1 }
    },
    revenue: { value: 5200, currency: 'USD' }
  },
  {
    id: '2',
    name: 'Rolex Watches',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Rolex_logo.svg/1280px-Rolex_logo.svg.png',
    category: 'Watch',
    rating: 4.5,
    reviews: 1.2,
    website: 'www.rolexwatch.co',
    email: 'info@rolex.com',
    phone: '+243 762-923-1464',
    address: '1678 Avenue Milwaukee, WI 53202',
    stats: {
      items: 261,
      sales: { value: 2.9, trend: 1 },
      clients: { value: 1.4, trend: 1 }
    },
    revenue: { value: 3496, currency: 'USD' }
  },
];

export const VendorList = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-6">VENDOR LIST</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={vendor.logo}
                    alt={vendor.name}
                    className="h-8 object-contain"
                  />
                  <button className="text-gray-400 hover:text-gray-600">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{vendor.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm ml-1">{vendor.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">
                        {vendor.reviews}k
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 hover:underline">
                    {vendor.website}
                  </p>
                  <div className="text-sm text-gray-500 mt-2">
                    <p>{vendor.address}</p>
                    <p>{vendor.email}</p>
                    <p>{vendor.phone}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-500">{vendor.category}</span>
                    <span className="text-blue-600">${vendor.revenue.value}k</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="font-medium">{vendor.stats.items}</div>
                      <div className="text-xs text-gray-500">Item Stock</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-green-500">
                        +{vendor.stats.sales.value}%
                      </div>
                      <div className="text-xs text-gray-500">Sell</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-blue-500">
                        +{vendor.stats.clients.value}%
                      </div>
                      <div className="text-xs text-gray-500">Happy Client</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigate(`/admin/vendors/${vendor.id}`)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                      View Profile
                    </button>
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
