import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Moon, Bell, Search, Eye, Heart, Trash2, User, ShoppingBag, Headphones, FileText } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  avatar: string;
  invoiceId: string;
  status: 'completed' | 'cancelled' | 'pending';
  totalAmount: number;
  amountDue: number;
  dueDate: string;
  paymentMethod: string;
}

const customers: Customer[] = [
  {
    id: '1',
    name: 'Michael A. Miner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    invoiceId: '#INV2540',
    status: 'completed',
    totalAmount: 4521,
    amountDue: 6901,
    dueDate: '07 Jan 2023',
    paymentMethod: 'Mastercard'
  },
  {
    id: '2',
    name: 'Theresa T. Besse',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    invoiceId: '#INV3924',
    status: 'cancelled',
    totalAmount: 7836,
    amountDue: 9902,
    dueDate: '03 Dec 2023',
    paymentMethod: 'Visa'
  },
  // Add more customers...
];

const stats = [
  {
    title: 'All Customers',
    value: '22.63k',
    change: '+5.4%',
    icon: <User className="h-5 w-5" />
  },
  {
    title: 'Orders',
    value: '4.5k',
    change: '-2.1%',
    icon: <ShoppingBag className="h-5 w-5" />
  },
  {
    title: 'Services Request',
    value: '1.03k',
    change: '+3.6%',
    icon: <Headphones className="h-5 w-5" />
  },
  {
    title: 'Invoice & Payment',
    value: '$38,908.00',
    change: '+4.8%',
    icon: <FileText className="h-5 w-5" />
  }
];

export const CustomerList = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1F2937] text-white">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <span className="text-xl font-semibold">V-stores</span>
          </div>
        </div>

        {/* Sidebar navigation */}
        <nav className="p-4">
          {/* Add navigation items */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold">CUSTOMER LIST</h1>
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
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    {stat.icon}
                  </div>
                  <span className={`text-sm ${
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Customer Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">All Customers List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Invoice ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount Due
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={customer.avatar}
                            alt={customer.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {customer.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {customer.invoiceId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          customer.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : customer.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${customer.totalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${customer.amountDue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                  Showing 8 of 98,321 customers
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
      </main>
    </div>
  );
};