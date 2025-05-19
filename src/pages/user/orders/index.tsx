import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { formatCurrency } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { useOrders } from '../../../lib/api/product';



export function Orders() {
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useOrders();
  console.log("Orders:", orders);

  // const getStatusColor = (status: Order['status']) => {
  //   switch (status) {
  //     case 'IN PROGRESS':
  //       return 'text-blue-600 bg-blue-50';
  //     case 'COMPLETED':
  //       return 'text-green-600 bg-green-50';
  //     case 'CANCELLED':
  //       return 'text-red-600 bg-red-50';
  //   }
  // };

  // Helper to color status badge
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const recentOrders = orders
    ?.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    .slice(0, 3);


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

              {/* Recent Orders */}
              <div className="bg-white font-light p-6 rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">RECENT ORDER</h3>
                  <a href="/user/orders">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#F86F03]"
                    >
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </a>
                </div>

                <div className="overflow-x-auto">
                  {ordersLoading ? (
                    <p>Loading...</p>
                  ) : ordersError ? (
                    <p className="text-red-500">Failed to load recent orders.</p>
                  ) : recentOrders?.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-4 font-medium">ORDER ID</th>
                          <th className="pb-4 font-medium">STATUS</th>
                          <th className="pb-4 font-medium">TOTAL</th>
                          <th className="pb-4 font-medium text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order: any) => (
                          <tr key={order.id} className="border-b last:border-0">
                            <td className="py-4">{order.id}</td>
                            <td className="py-4">
                              <span
                                className={`inline-block px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4">
                              {formatCurrency(order.total_amount)} ({order.products?.length ?? 0} Products)
                            </td>
                            <td className="py-4 text-right">
                              <Link to={`/user/orders/${order.id}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-[#F86F03]"
                                >
                                  View Details
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </Link>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No recent orders found.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}