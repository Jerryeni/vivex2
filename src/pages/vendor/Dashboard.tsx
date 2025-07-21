import React, { useMemo } from 'react';
import {
  TrendingUp,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Eye,
} from 'lucide-react';
import { useVendorOrders, useVendorStores } from '../../lib/hooks/useVendorQueries';

const Dashboard: React.FC = () => {
  const { data: stores, isLoading: storesLoading } = useVendorStores();
  const { data: orders, isLoading: ordersLoading } = useVendorOrders();

  

  const recentOrders = useMemo(() => orders?.data?.data.slice(0, 4) || [], [orders?.data]);

  const topProducts = [
    { id: '1', name: 'Wireless Headphones', sales: 1234, revenue: '$24,680', views: '12.3k' },
    { id: '2', name: 'Smart Watch', sales: 987, revenue: '$19,740', views: '9.8k' },
    { id: '3', name: 'Laptop Stand', sales: 654, revenue: '$5,886', views: '6.5k' },
    { id: '4', name: 'Phone Case', sales: 432, revenue: '$1,080', views: '4.3k' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p
                  className={`text-xs mt-2 flex items-center ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="p-6">
            {ordersLoading ? (
              <p className="text-sm text-gray-500">Loading orders...</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.orderNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${order.totalAmount}</p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
                {recentOrders.length === 0 && (
                  <p className="text-sm text-gray-500">No recent orders.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
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
                    <div className="w-10 h-10 bg-gray-300 rounded-lg" />
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


// import React from 'react';
// import {
//   DollarSign,
//   ShoppingCart,
//   Package,
//   Users,
//   TrendingUp,
//   Eye,
// } from 'lucide-react';
// import { useVendorStores } from '../../lib/hooks/useVendorQueries';

// const stats = [
//   {
//     name: 'Total Revenue',
//     value: '$18,234.00',
//     change: '+15%',
//     icon: DollarSign,
//     changeType: 'positive',
//   },
//   {
//     name: 'Products',
//     value: '1,240',
//     change: '+8.2%',
//     icon: Package,
//     changeType: 'positive',
//   },
//   {
//     name: 'Orders',
//     value: '3,582',
//     change: '+12.5%',
//     icon: ShoppingCart,
//     changeType: 'positive',
//   },
//   {
//     name: 'Customers',
//     value: '842',
//     change: '+4.7%',
//     icon: Users,
//     changeType: 'positive',
//   },
// ];

// const recentOrders = [
//   { id: 'O-001', customer: 'Jane Doe', amount: 120.5, status: 'delivered' },
//   { id: 'O-002', customer: 'John Smith', amount: 89.99, status: 'pending' },
//   { id: 'O-003', customer: 'Alice Brown', amount: 54.0, status: 'shipped' },
//   { id: 'O-004', customer: 'Mark Black', amount: 240.0, status: 'cancelled' },
// ];

// const topProducts = [
//   { id: 'P-001', name: 'Bluetooth Speaker', revenue: '$2,300', views: '8.2k', sales: 320 },
//   { id: 'P-002', name: 'Gaming Mouse', revenue: '$1,750', views: '6.4k', sales: 278 },
//   { id: 'P-003', name: 'Smartwatch', revenue: '$1,210', views: '5.1k', sales: 194 },
// ];

// const SampleDashboard: React.FC = () => {
//   return (
//     <div className="space-y-6">
//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <div key={stat.name} className="p-6 bg-white rounded-xl shadow border border-gray-200">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-500">{stat.name}</p>
//                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//                 <p className={`text-xs mt-1 flex items-center ${
//                   stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
//                 }`}>
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

//       {/* Orders and Products */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Orders */}
//         <div className="bg-white rounded-xl border border-gray-200 shadow">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
//           </div>
//           <div className="p-6 space-y-4">
//             {recentOrders.map((order) => (
//               <div key={order.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">{order.customer}</p>
//                   <p className="text-xs text-gray-500">{order.id}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-semibold">${order.amount.toFixed(2)}</p>
//                   <span className={`text-xs px-2 py-1 rounded-full font-medium ${
//                     order.status === 'delivered'
//                       ? 'bg-green-100 text-green-700'
//                       : order.status === 'pending'
//                       ? 'bg-yellow-100 text-yellow-700'
//                       : order.status === 'shipped'
//                       ? 'bg-blue-100 text-blue-700'
//                       : 'bg-red-100 text-red-700'
//                   }`}>
//                     {order.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Top Products */}
//         <div className="bg-white rounded-xl border border-gray-200 shadow">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
//           </div>
//           <div className="p-6 space-y-4">
//             {topProducts.map((product) => (
//               <div key={product.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">{product.name}</p>
//                   <p className="text-xs text-gray-500">{product.sales} sales</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-semibold">{product.revenue}</p>
//                   <div className="flex items-center text-xs text-gray-500 space-x-1">
//                     <Eye className="h-3 w-3" />
//                     <span>{product.views}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SampleDashboard;