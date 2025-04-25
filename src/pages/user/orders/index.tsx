import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { formatCurrency } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';

interface Order {
  id: string;
  status: 'IN PROGRESS' | 'COMPLETED' | 'CANCELLED';
  date: string;
  total: number;
  products: number;
}

const orders: Order[] = [
  {
    id: '95459761',
    status: 'IN PROGRESS',
    date: 'Dec 30, 2019 07:52',
    total: 80,
    products: 3,
  },
  {
    id: '71667167',
    status: 'COMPLETED',
    date: 'Dec 7, 2019 23:26',
    total: 70,
    products: 4,
  },
  {
    id: '95214302',
    status: 'CANCELLED',
    date: 'Dec 7, 2019 23:26',
    total: 2300,
    products: 2,
  },
  {
    id: '71667167',
    status: 'COMPLETED',
    date: 'Feb 2, 2019 19:28',
    total: 520,
    products: 1,
  },
  {
    id: '#ßß5746385',
    status: 'COMPLETED',
    date: 'Dec 30, 2019 07:52',
    total: 350,
    products: 2,
  },
  {
    id: '#55746385',
    status: 'CANCELLED',
    date: 'Dec 4, 2019 21:42',
    total: 220,
    products: 7,
  },
  {
    id: '#67397743',
    status: 'COMPLETED',
    date: 'Feb 2, 2019 19:28',
    total: 80,
    products: 1,
  },
  {
    id: '#67397743',
    status: 'COMPLETED',
    date: 'Mar 20, 2019 23:14',
    total: 500,
    products: 1,
  },
  {
    id: '#67397743',
    status: 'COMPLETED',
    date: 'Dec 4, 2019 21:42',
    total: 1500,
    products: 3,
  },
  {
    id: '#67397743',
    status: 'COMPLETED',
    date: 'Dec 30, 2019 05:18',
    total: 1500,
    products: 3,
  },
  {
    id: '#67397743',
    status: 'CANCELLED',
    date: 'Dec 30, 2019 07:52',
    total: 80,
    products: 1,
  },
];

export function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'IN PROGRESS':
        return 'text-blue-600 bg-blue-50';
      case 'COMPLETED':
        return 'text-green-600 bg-green-50';
      case 'CANCELLED':
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Link to="/" className="hover:text-gray-700">Home</Link>
                  <span>/</span>
                  <Link to="/dashboard" className="hover:text-gray-700">User Account</Link>
                  <span>/</span>
                  <span className="text-gray-900">Order History</span>
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-lg font-semibold mb-6">ORDER HISTORY</h1>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-4 font-medium">ORDER ID</th>
                        <th className="pb-4 font-medium">STATUS</th>
                        <th className="pb-4 font-medium">DATE</th>
                        <th className="pb-4 font-medium">TOTAL</th>
                        <th className="pb-4 font-medium text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b last:border-0">
                          <td className="py-4">{order.id}</td>
                          <td className="py-4">
                            <span
                              className={`inline-block px-2 py-1 rounded text-sm ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4">{order.date}</td>
                          <td className="py-4">
                            {formatCurrency(order.total)} ({order.products}{' '}
                            Products)
                          </td>
                          <td className="py-4 text-right">
                          <Link to={`/order/${order.id}`}>
                              <Button variant="ghost" size="sm" className="text-[#F86F03]">
                                View Details
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    className="w-8 h-8 flex items-center justify-center border rounded-full disabled:opacity-50"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`w-8 h-8 flex items-center justify-center border rounded-full ${
                        currentPage === page
                          ? 'bg-[#F86F03] text-white'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="w-8 h-8 flex items-center justify-center border rounded-full disabled:opacity-50"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}