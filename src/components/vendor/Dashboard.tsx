import React from 'react';
import { Package, ShoppingCart, DollarSign, TrendingUp, Users, Eye } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Total Products', value: '2,345', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Total Orders', value: '1,234', icon: ShoppingCart, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Total Revenue', value: '$45,678', icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Growth Rate', value: '12.5%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order #{order}2345</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">$123.45</p>
                  <p className="text-xs text-green-600">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((product) => (
              <div key={product} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Product {product}</p>
                    <p className="text-sm text-gray-500">Category</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">$89.99</p>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">1.2k views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;