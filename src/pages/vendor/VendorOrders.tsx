import React from 'react';
import { Package, Calendar, DollarSign, User } from 'lucide-react';
import { useVendorOrders } from '../../lib/hooks/useVendorQueries';
import { formatCurrency } from '../../lib/utils';
import { Product } from '../../types/vendor';

interface Order {
  id: string;
  order_tracking_id: string;
  user: string;
  customerName?: string;
  products?: Product[];
  items?: Product[];
  total_amount: number;
  totalAmount?: number;
  payment_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  status?: string;
  created_at: string;
  updated_at: string;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  bg: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, bg }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center">
      <div className={`p-2 rounded-lg ${bg}`}>{icon}</div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const VendorOrders: React.FC = () => {
  const { data: orders, isLoading, isError } = useVendorOrders();

  const getStatusColor = (status: string = '') => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error loading orders. Please try again later.</p>
      </div>
    );
  }

  const orderList: Order[] = orders?.data?.data || [];

  // Calculate statistics
  const totalOrders = orderList.length;
  const pendingOrders = orderList.filter((order) => 
    order.payment_status === 'pending' || order.status === 'pending'
  ).length;
  const totalRevenue = orderList.reduce(
    (sum, order) => sum + (order.total_amount || order.totalAmount || 0), 
    0
  );
  const uniqueCustomers = new Set(
    orderList.map((order) => order.customerName || order.user)
  ).size;

  // Get products count from either 'products' or 'items' array
  const getProductsCount = (order: Order) => {
    if (order.products?.length) return order.products.length;
    if (order.items?.length) return order.items.length;
    return 0;
  };

  // Get status from either 'payment_status' or 'status'
  const getOrderStatus = (order: Order) => {
    return order.payment_status || order.status || 'unknown';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <p className="text-gray-600 mt-1">Track and manage your customer orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          icon={<Package className="h-6 w-6 text-blue-600" />} 
          label="Total Orders" 
          value={totalOrders} 
          bg="bg-blue-100" 
        />
        <StatCard 
          icon={<Calendar className="h-6 w-6 text-yellow-600" />} 
          label="Pending" 
          value={pendingOrders} 
          bg="bg-yellow-100" 
        />
        <StatCard 
          icon={<DollarSign className="h-6 w-6 text-green-600" />} 
          label="Revenue" 
          value={`${formatCurrency(totalRevenue)}`} 
          bg="bg-green-100" 
        />
        <StatCard 
          icon={<User className="h-6 w-6 text-purple-600" />} 
          label="Customers" 
          value={uniqueCustomers} 
          bg="bg-purple-100" 
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Order ID', 'Customer', 'Products', 'Total', 'Status', 'Date'].map((title) => (
                  <th
                    key={title}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderList.length > 0 ? (
                orderList.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.order_tracking_id || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customerName || order.user || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getProductsCount(order)} item{getProductsCount(order) !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(order.total_amount || order.totalAmount || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(getOrderStatus(order))}`}
                      >
                        {getOrderStatus(order)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorOrders;