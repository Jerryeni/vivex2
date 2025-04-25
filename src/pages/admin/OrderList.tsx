import React from 'react';
import { Eye, Heart, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderSummary {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
  };
  priority: 'Normal' | 'High';
  total: number;
  paymentStatus: 'Paid' | 'Unpaid' | 'Refund';
  items: number;
  deliveryNumber?: string;
  status: 'Draft' | 'Packaging' | 'Completed' | 'Cancelled';
}

const orders: OrderSummary[] = [
  {
    id: 'P534988/RD',
    createdAt: 'Apr 23, 2024',
    customer: {
      name: 'Bart C. Anderson',
      email: 'bart@example.com'
    },
    priority: 'Normal',
    total: 1298.00,
    paymentStatus: 'Unpaid',
    items: 4,
    status: 'Draft'
  },
  {
    id: 'P567548/RD',
    createdAt: 'Apr 20, 2024',
    customer: {
      name: 'Jung S. Ayala',
      email: 'jung@example.com'
    },
    priority: 'Normal',
    total: 3987.00,
    paymentStatus: 'Paid',
    items: 2,
    status: 'Packaging'
  },
  {
    id: 'P576246/RD',
    createdAt: 'Apr 19, 2024',
    customer: {
      name: 'David A. Arnold',
      email: 'david@example.com'
    },
    priority: 'High',
    total: 1478.00,
    paymentStatus: 'Paid',
    items: 5,
    deliveryNumber: '#D-578675/35',
    status: 'Completed'
  }
];

const stats = [
  { label: 'Payment Refund', value: 490, icon: '💰' },
  { label: 'Order Cancel', value: 241, icon: '🛒' },
  { label: 'Order Shipped', value: 630, icon: '🚚' },
  { label: 'Order Delivering', value: 170, icon: '📦' },
  { label: 'Pending Review', value: 210, icon: '⏳' },
  { label: 'Pending Payment', value: 588, icon: '💳' },
  { label: 'Delivered', value: 200, icon: '✅' },
  { label: 'In Progress', value: 656, icon: '🔄' }
];

const OrderList = () => {
  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-xl font-semibold">ORDERS LIST</h1>
        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-gray-600">{stat.label}</h3>
                <p className="text-xl md:text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <span className="text-xl md:text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 md:p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="font-semibold">All Order List</h2>
          <select className="w-full md:w-auto px-3 py-2 border rounded-md">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
        </div>
        
        {/* Responsive table wrapper */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Created at
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Delivery Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-sm text-blue-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.createdAt}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-orange-500">
                          {order.customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.priority}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.paymentStatus === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : order.paymentStatus === 'Refund'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.items}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.deliveryNumber || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : order.status === 'Packaging'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Link to={`/admin/orders/${order.id}`} className="text-gray-400 hover:text-gray-500">
                          <Eye className="h-5 w-5" />
                        </Link>
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
        </div>

        {/* Pagination */}
        <div className="px-4 md:px-6 py-4 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 order-2 md:order-1">
              Showing 10 of 100 orders
            </p>
            <div className="flex items-center space-x-2 order-1 md:order-2">
              <button className="px-3 py-1 bg-orange-500 text-white rounded">1</button>
              <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded">2</button>
              <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded">3</button>
              <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { OrderList };