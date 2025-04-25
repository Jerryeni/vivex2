import React from 'react';
import { useParams } from 'react-router-dom';
import { Package, Moon, Bell, Search, Download, MessageSquare, ArrowDown } from 'lucide-react';
// import { Line } from 'react-chartjs-2';

interface CustomerDetails {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  accountId: string;
  deliveryAddress: string;
  language: string;
  latestInvoiceId: string;
  stats: {
    totalInvoice: number;
    totalOrder: number;
    totalExpense: number;
  };
  transactions: {
    invoiceId: string;
    status: 'completed' | 'cancelled' | 'pending';
    totalAmount: number;
    dueDate: string;
    paymentMethod: string;
  }[];
  balance: {
    current: number;
    previous: number;
  };
  coupons: number;
}

const customerData: CustomerDetails = {
  id: '1',
  name: 'Michael A. Miner',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  email: 'michaelminer@gmail.com',
  phone: '+1 (857) 160-010-27',
  accountId: 'AC-278699',
  deliveryAddress: '82, rue des Nations Unies 22000 SAINT-BRIEUC',
  language: 'English',
  latestInvoiceId: '#INV2540',
  stats: {
    totalInvoice: 234,
    totalOrder: 219,
    totalExpense: 2189
  },
  transactions: [
    {
      invoiceId: '#INV2540',
      status: 'completed',
      totalAmount: 4521,
      dueDate: '07 Jan 2023',
      paymentMethod: 'Mastercard'
    },
    // Add more transactions...
  ],
  balance: {
    current: 4700,
    previous: 4232
  },
  coupons: 3764
};

export const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex h-screen bg-gray-50">
    
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold">CUSTOMER DETAILS</h1>
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
                src={customerData.avatar}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Customer Profile */}
            <div className="col-span-1 space-y-6">
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={customerData.avatar}
                    alt={customerData.name}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{customerData.name}</h2>
                    <p className="text-sm text-gray-500">{customerData.email}</p>
                    <p className="text-sm text-gray-500">{customerData.phone}</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                    Send Message
                  </button>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Customer Details</h3>
                  <button className="text-sm text-blue-600">Active User</button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Account ID</label>
                    <p className="font-medium">{customerData.accountId}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Invoice Email</label>
                    <p className="font-medium">{customerData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Delivery Address</label>
                    <p className="font-medium">{customerData.deliveryAddress}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Language</label>
                    <p className="font-medium">{customerData.language}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Latest Invoice ID</label>
                    <p className="font-medium">{customerData.latestInvoiceId}</p>
                  </div>
                </div>
              </div>

              {/* Latest Invoice */}
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Latest Invoice</h3>
                  <button className="text-sm text-orange-500">View All</button>
                </div>

                <div className="space-y-4">
                  {customerData.transactions.slice(0, 4).map((transaction) => (
                    <div key={transaction.invoiceId} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-orange-100 rounded">
                          <Download className="h-4 w-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Invoice {transaction.invoiceId}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.dueDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="col-span-2 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm text-gray-500">Total Invoice</h3>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                      +2.5%
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{customerData.stats.totalInvoice}</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm text-gray-500">Total Order</h3>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                      +4.2%
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{customerData.stats.totalOrder}</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm text-gray-500">Total Expense</h3>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                      -1.5%
                    </span>
                  </div>
                  <p className="text-2xl font-bold">${customerData.stats.totalExpense}</p>
                </div>
              </div>

              {/* Transaction Table */}
              <div className="bg-white rounded-lg">
                <div className="p-6 border-b">
                  <h3 className="font-semibold">Transaction History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
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
                          Due Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Payment Method
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {customerData.transactions.map((transaction) => (
                        <tr key={transaction.invoiceId}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                            {transaction.invoiceId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              transaction.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : transaction.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${transaction.totalAmount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.dueDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.paymentMethod}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Balance Chart */}
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold">Welcome Back</h3>
                    <p className="text-sm text-gray-500">Account Balance</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${customerData.balance.current}</p>
                    <p className="text-sm text-gray-500">
                      <ArrowDown className="h-4 w-4 inline text-red-500" />
                      ${customerData.balance.previous}
                    </p>
                  </div>
                </div>
                {/* Add Line chart component here */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};