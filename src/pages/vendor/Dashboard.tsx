// import React, { useMemo } from 'react';
// import {
//   TrendingUp,
//   DollarSign,
//   Package,
//   ShoppingCart,
//   Users,
//   Eye,
// } from 'lucide-react';
// import { useVendorOrders, useVendorStores } from '../../lib/hooks/useVendorQueries';

// const Dashboard: React.FC = () => {
//   const { data: stores, isLoading: storesLoading } = useVendorStores();
//   const { data: orders, isLoading: ordersLoading } = useVendorOrders();



//   const recentOrders = useMemo(() => orders?.data?.data.slice(0, 4) || [], [orders?.data]);

//   const topProducts = [
//     { id: '1', name: 'Wireless Headphones', sales: 1234, revenue: '$24,680', views: '12.3k' },
//     { id: '2', name: 'Smart Watch', sales: 987, revenue: '$19,740', views: '9.8k' },
//     { id: '3', name: 'Laptop Stand', sales: 654, revenue: '$5,886', views: '6.5k' },
//     { id: '4', name: 'Phone Case', sales: 432, revenue: '$1,080', views: '4.3k' },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <div
//             key={stat.name}
//             className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{stat.name}</p>
//                 <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
//                 <p
//                   className={`text-xs mt-2 flex items-center ${
//                     stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
//                   }`}
//                 >
//                   <TrendingUp className="h-3 w-3 mr-1" />
//                   {stat.change} from last month
//                 </p>
//               </div>
//               <div className="p-3 bg-blue-50 rounded-lg">
//                 <stat.icon className="h-6 w-6 text-blue-600" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Orders and Top Products */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Orders */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
//           </div>
//           <div className="p-6">
//             {ordersLoading ? (
//               <p className="text-sm text-gray-500">Loading orders...</p>
//             ) : (
//               <div className="space-y-4">
//                 {recentOrders.map((order: any) => (
//                   <div
//                     key={order.id}
//                     className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                         <ShoppingCart className="h-5 w-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
//                         <p className="text-sm text-gray-500">{order.orderNumber}</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm font-medium text-gray-900">${order.totalAmount}</p>
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
//                           order.status === 'delivered'
//                             ? 'bg-green-100 text-green-800'
//                             : order.status === 'pending'
//                             ? 'bg-yellow-100 text-yellow-800'
//                             : 'bg-blue-100 text-blue-800'
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//                 {recentOrders.length === 0 && (
//                   <p className="text-sm text-gray-500">No recent orders.</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Top Products */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
//           </div>
//           <div className="p-6">
//             <div className="space-y-4">
//               {topProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-gray-300 rounded-lg" />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{product.name}</p>
//                       <p className="text-sm text-gray-500">{product.sales} sales</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
//                     <div className="flex items-center space-x-1">
//                       <Eye className="h-3 w-3 text-gray-400" />
//                       <span className="text-xs text-gray-500">{product.views}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useMemo } from 'react';
import {
  ShoppingCart,
  Eye,
} from 'lucide-react';
import { useVendorOrders, useVendorStores, useProducts } from '../../lib/hooks/useVendorQueries';
import { formatCurrency } from '../../lib/utils';
import { Product } from '../../types/vendor';
import { OptimizedImage } from '../../components/ui/OptimizedImage';

interface Order {
  id: string;
  order_tracking_id: string;
  user: string;
  items: Product[];
  total_amount: number;
  payment_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

const Dashboard: React.FC = () => {
  const { data: stores, isLoading: storesLoading } = useVendorStores();
  const { data: orders, isLoading: ordersLoading } = useVendorOrders();
  const { data: productsResponse, isLoading: productsLoading } = useProducts();

  const recentOrders = useMemo(() => {
    return (orders?.data?.data?.slice(0, 4) || []) as Order[];
  }, [orders?.data]);

  const topProducts = useMemo(() => {
    if (!productsResponse?.data?.data) return [];

    return productsResponse.data.data
      .map((product: Product) => ({
        ...product,
        sales: product.sales_count || 0,
        revenue: formatCurrency((product.price || 0) * (product.sales_count || 0)),
        views: product.view_count ? `${(product.view_count / 1000).toFixed(1)}k` : '0',
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4);
  }, [productsResponse]);

  const isLoading = storesLoading || ordersLoading || productsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="p-6">
            {recentOrders.length === 0 ? (
              <p className="text-sm text-gray-500">No recent orders found.</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order?.items?.length} item{order?.items?.length > 1 ? 's' : ''}
                        </p>
                        <p className="text-sm text-gray-500">{order.order_tracking_id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(order.total_amount)}
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.payment_status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.payment_status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
          </div>
          <div className="p-6">
            {topProducts.length === 0 ? (
              <p className="text-sm text-gray-500">No products available</p>
            ) : (
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {product.images?.[0] ? (
                        <OptimizedImage
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-lg" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {product.name || 'Unnamed Product'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.sales.toLocaleString()} sales
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{product.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div> */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
           <div className="p-6 border-b border-gray-200">
             <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
           </div>
           <div className="p-6">
             <div className="space-y-4">
               {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                  {product.images?.[0] ? (
                        <OptimizedImage
                          src={product.images[0]}
                          alt={product.name}
                          className="w-4 h-4 object-cover rounded-lg"
                          containerClassName="w-10 h-10"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-lg" />
                      )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{product.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;