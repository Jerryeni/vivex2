import React from 'react';
import { Link } from 'react-router-dom';
import { Package,   ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCard {
  title: string;
  value: string | number;
  change: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
}

interface RecentOrder {
  id: string;
  date: string;
  product: {
    name: string;
    image: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  payment: {
    type: string;
    status: 'completed' | 'processing';
  };
}

const stats: StatCard[] = [
  {
    title: 'Daily Returns',
    value: '13,647',
    change: { value: 2.3, type: 'increase', period: 'Last Week' }
  },
  {
    title: 'Daily Visitors',
    value: '9,526',
    change: { value: 5.1, type: 'increase', period: 'Last Month' }
  },
  {
    title: 'Daily Orders',
    value: '13,647',
    change: { value: 2.3, type: 'increase', period: 'Orders for Today' }
  },
  {
    title: 'Total Orders',
    value: '9,526',
    change: { value: 9.1, type: 'increase', period: 'Last Month' }
  },
  {
    title: 'Total Customers',
    value: '6k',
    change: { value: 1.5, type: 'decrease', period: 'Last Month' }
  },
  {
    title: 'Total Vendors',
    value: '3.6k',
    change: { value: 10.6, type: 'decrease', period: 'Last Month' }
  },
  {
    title: 'Daily Revenue',
    value: '9,760',
    change: { value: 12.3, type: 'decrease', period: 'Revenue for Today' }
  },
  {
    title: 'Total Revenue',
    value: '$123.6k',
    change: { value: 10.0, type: 'decrease', period: 'Last Month' }
  }
];

const recentOrders: RecentOrder[] = [
  {
    id: '#895525',
    date: '29 April 2024',
    product: {
      name: 'Apple MacBook Pro',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4'
    },
    customer: {
      name: 'Anna M. Hines',
      email: 'anna.hines@mail.com',
      phone: '(+1)-555-1564-261',
      address: 'Bar Ridge/Illinois'
    },
    payment: {
      type: 'Credit Card',
      status: 'completed'
    }
  },
  // Add more orders...
];


export const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 overflow-auto">

        {/* Welcome Banner */}
        <div className="p-6">
          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg mb-6">
            <p>Welcome to our admin dashboard!!!!</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white  rounded-lg shadow-sm">
                <div className="flex items-center p-6 justify-between mb-4">
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-orange-500" />
                    
                  </div>
                  
                  <div className="flex flex-col">
                      <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
                      <div className="text-2xl font-bold mb-2">{stat.value}</div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 text-sm bg-slate-100">
                  <div className="flex items-center">
                  {stat.change.type === 'increase' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={stat.change.type === 'increase' ? 'text-green-500' : 'text-red-500'}>
                    {stat.change.value}%
                  </span>
                  <span className="text-gray-500 ml-1">{stat.change.period}</span>
                  </div>
                  
                  <Link to="#" className="text-sm text-gray-700 hover:underline">
                    View More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <button className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg">
                Create Order
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={order.product.image}
                            alt={order.product.name}
                            className="h-8 w-8 rounded-lg object-cover"
                          />
                          <span className="ml-2 text-sm text-gray-900">{order.product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.payment.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.payment.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {order.payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing 5 of 98,321 orders
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
                    4
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};