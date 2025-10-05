// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Breadcrumb } from '../../../components/Breadcrumb';
// import { Package, Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
// import { useTrackOrder } from '../../../lib/api/product';

// interface TrackingStep {
//   id: string;
//   message: string;
//   timestamp: string;
//   completed: boolean;
//   expected_arrival?: string;
// }

// interface OrderItem {
//   id: number;
//   product: {
//     id: number;
//     title: string;
//     // Add other product fields as needed
//   };
//   product_variation: any;
//   quantity: number;
// }

// interface TrackingData {
//   id: string;
//   total_amount: string;
//   created_at: string;
//   items: OrderItem[];
//   tracking_steps: TrackingStep[];
// }

// export const TrackOrderDetails = () => {
//   const { id: trackingId } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { mutate: trackOrder, data, isPending, isError, error } = useTrackOrder();

//   const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

//   useEffect(() => {
//     if (trackingId) {
//       trackOrder(trackingId, {
//         onSuccess: (res) => {
//           setTrackingData(res);
//         },
//         onError: (err) => {
//           console.error('Failed to fetch tracking data:', err);
//           setTrackingData(null);
//         },
//       });
//     }
//   }, [trackingId, trackOrder]);

//   const breadcrumbItems = [
//     { label: 'Home', href: '/' },
//     { label: 'Pages', href: '/pages' },
//     { label: 'Track Order', href: '/track-order' },
//     { label: 'Details' },
//   ];

//   const formatDateTime = (datetime: string) => {
//     const d = new Date(datetime);
//     return {
//       date: d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }),
//       time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };
//   };

//   const getProgressSteps = () => {
//     return ['Order Placed', 'Packaging', 'On The Road', 'Delivered'];
//   };

//   const getCurrentStep = (trackingSteps: TrackingStep[] = []) => {
//     // Ensure trackingSteps is an array and has items
//     if (!Array.isArray(trackingSteps) || trackingSteps.length === 0) {
//       return -1; // No steps completed
//     }
    
//     // Find the last completed step
//     const completedSteps = trackingSteps.filter(step => step.completed);
//     return completedSteps.length > 0 ? completedSteps.length - 1 : -1;
//   };

//   if (isPending) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <Breadcrumb items={breadcrumbItems} />
//           <div className="mt-8 text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-10bg-primary-100"></div>
//             <p className="mt-4 text-gray-600">Loading tracking information...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !trackingData) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <Breadcrumb items={breadcrumbItems} />
//           <div className="mt-8 max-w-md mx-auto">
//             <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
//               <h2 className="text-lg font-semibold text-red-800 mb-2">Tracking Information Not Found</h2>
//               <p className="text-red-700 mb-4">
//                 We couldn't find tracking information for order ID: {trackingId}
//               </p>
//               <button
//                 onClick={() => navigate('/track-order')}
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center space-x-2 mx-auto"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//                 <span>Back to Track Order</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const { id, total_amount, created_at, items = [], tracking_steps = [] } = trackingData;
//   const currentStep = getCurrentStep(tracking_steps);
//   const progressSteps = getProgressSteps();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Breadcrumb items={breadcrumbItems} />

//         <div className="mt-4 mb-6">
//           <button
//             onClick={() => navigate('/track-order')}
//             className="flex items-center space-x-2 text-primary-10bg-primary-100 hover:text-blue-800 focus:outline-none"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span>Back to Track Order</span>
//           </button>
//         </div>

//         <div className="mt-8 max-w-4xl mx-auto">
//           {/* Order Summary */}
//           <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg mb-8">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-gray-600">#{id}</p>
//                 <p className="text-sm text-gray-500">
//                   {items.length} Products • Order Placed on {formatDateTime(created_at).date} at {formatDateTime(created_at).time}
//                 </p>
//               </div>
//               <div className="text-xl font-bold text-primary-10bg-primary-100">${total_amount}</div>
//             </div>
//           </div>

//           {/* Expected Arrival */}
//           <div className="text-sm text-gray-500 mb-4 font-medium">
//             Order expected arrival{' '}
//             <span className="text-black">
//               {tracking_steps.find(step => step.expected_arrival)?.expected_arrival || 'N/A'}
//             </span>
//           </div>

//           {/* Progress Tracker */}
//           <div className="relative mb-10">
//             <div className="flex justify-between mb-8">
//               {progressSteps.map((label, index) => {
//                 const isCompleted = index <= currentStep;
//                 const Icon = index === 2 ? Truck : index === 0 ? Package : CheckCircle;
//                 return (
//                   <div className="flex flex-col items-center" key={label}>
//                     <div
//                       className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
//                         isCompleted ? 'bg-orange-500' : 'bg-gray-200 text-gray-400'
//                       }`}
//                     >
//                       <Icon className="h-5 w-5" />
//                     </div>
//                     <p className="mt-2 text-sm font-medium">{label}</p>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
//               <div 
//                 className="h-full bg-orange-500 transition-all duration-300" 
//                 style={{ 
//                   width: currentStep >= 0 
//                     ? `${((currentStep + 1) / progressSteps.length) * 100}%` 
//                     : '0%' 
//                 }} 
//               />
//             </div>
//           </div>

//           {/* Order Items */}
//           {items.length > 0 && (
//             <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
//               <h3 className="text-lg font-semibold mb-4">Order Items</h3>
//               <div className="space-y-4">
//                 {items.map((item) => (
//                   <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
//                     <div className="flex-1">
//                       <h4 className="font-medium text-gray-900">{item.product?.title || 'Unknown Product'}</h4>
//                       <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//                       {item.product_variation && (
//                         <p className="text-sm text-gray-500">
//                           Variation: {typeof item.product_variation === 'object' 
//                             ? JSON.stringify(item.product_variation) 
//                             : item.product_variation}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Order Activity */}
//           {tracking_steps.length > 0 && (
//             <div className="bg-white rounded-lg shadow-sm border p-6">
//               <h2 className="text-lg font-semibold mb-6">Order Activity</h2>
//               <div className="space-y-6">
//                 {tracking_steps
//                   .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // Sort by most recent first
//                   .map((step, index) => {
//                     const { date, time } = formatDateTime(step.timestamp);
//                     return (
//                       <div key={step.id || index} className="flex items-start space-x-4">
//                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                           step.completed ? 'bg-green-50' : 'bg-blue-50'
//                         }`}>
//                           {step.completed ? (
//                             <CheckCircle className="h-5 w-5 text-green-500" />
//                           ) : (
//                             <Clock className="h-5 w-5 text-blue-500" />
//                           )}
//                         </div>
//                         <div>
//                           <p className="text-gray-700">{step.message}</p>
//                           <p className="text-sm text-gray-500">
//                             {date} at {time}
//                           </p>
//                         </div>
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>
//           )}

//           {/* No tracking data message */}
//           {tracking_steps.length === 0 && (
//             <div className="bg-white rounded-lg shadow-sm border p-6">
//               <h2 className="text-lg font-semibold mb-4">Order Activity</h2>
//               <div className="text-center py-8">
//                 <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500">No tracking information available yet.</p>
//                 <p className="text-sm text-gray-400 mt-2">
//                   Tracking details will appear here once your order is processed.
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="mt-8 flex justify-center space-x-4">
//             <button
//               onClick={() => navigate('/track-order')}
//               className="bg-primary-100 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Track Another Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Breadcrumb } from '../../../components/Breadcrumb';
// import { Package, Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
// import { useTrackOrder } from '../../../lib/api/product';

// interface OrderItem {
//   id: number;
//   product: {
//     id: number;
//     name?: string;
//     title?: string;
//     // Add other product fields as needed
//   };
//   product_variation: any;
//   quantity: number;
//   price: number;
// }

// interface TrackingData {
//   id: number;
//   cart_id: string;
//   order_tracking_id: string;
//   status: string;
//   amount_paid: number;
//   payment_status: string;
//   cancel_order: boolean;
//   reasons_for_cancelling_orders: string | null;
//   response_data: any;
//   created_at: string;
//   updated_at: string;
//   delivery_address: number;
//   items: OrderItem[];
// }

// export const TrackOrderDetails = () => {
//   const { id: trackingId } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { mutate: trackOrder, data, isPending, isError, error } = useTrackOrder();

//   const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

//   useEffect(() => {
//     if (trackingId) {
//       trackOrder(trackingId, {
//         onSuccess: (res) => {
//           setTrackingData(res);
//         },
//         onError: (err) => {
//           console.error('Failed to fetch tracking data:', err);
//           setTrackingData(null);
//         },
//       });
//     }
//   }, [trackingId, trackOrder]);

//   const breadcrumbItems = [
//     { label: 'Home', href: '/' },
//     { label: 'Pages', href: '/pages' },
//     { label: 'Track Order', href: '/track-order' },
//     { label: 'Details' },
//   ];

//   const formatDateTime = (datetime: string) => {
//     const d = new Date(datetime);
//     return {
//       date: d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }),
//       time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };
//   };

//   const getProgressSteps = () => {
//     return ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
//   };

//   const getCurrentStep = (status: string) => {
//     const statusMap: { [key: string]: number } = {
//       'pending': 0,
//       'processing': 1,
//       'shipped': 2,
//       'delivered': 3,
//       'cancelled': -1
//     };
//     return statusMap[status?.toLowerCase()] ?? 0;
//   };

//   const getStatusColor = (status: string | undefined) => {
//     if (!status) return 'bg-gray-100 text-gray-800';
    
//     const statusStr = typeof status === 'string' ? status.toLowerCase() : String(status).toLowerCase();
    
//     const colorMap: { [key: string]: string } = {
//       'pending': 'bg-yellow-100 text-yellow-800',
//       'processing': 'bg-blue-100 text-blue-800',
//       'shipped': 'bg-purple-100 text-purple-800',
//       'delivered': 'bg-green-100 text-green-800',
//       'cancelled': 'bg-red-100 text-red-800'
//     };
    
//     return colorMap[statusStr] ?? 'bg-gray-100 text-gray-800';
//   };

//   if (isPending) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <Breadcrumb items={breadcrumbItems} />
//           <div className="mt-8 text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-10bg-primary-100"></div>
//             <p className="mt-4 text-gray-600">Loading tracking information...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !trackingData) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <Breadcrumb items={breadcrumbItems} />
//           <div className="mt-8 max-w-md mx-auto">
//             <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
//               <h2 className="text-lg font-semibold text-red-800 mb-2">Tracking Information Not Found</h2>
//               <p className="text-red-700 mb-4">
//                 We couldn't find tracking information for order ID: {trackingId}
//               </p>
//               <button
//                 onClick={() => navigate('/track-order')}
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center space-x-2 mx-auto"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//                 <span>Back to Track Order</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const { 
//     id, 
//     order_tracking_id,
//     amount_paid, 
//     created_at, 
//     updated_at,
//     status,
//     payment_status,
//     cancel_order,
//     items = [] 
//   } = trackingData;
  
//   const currentStep = getCurrentStep(status);
//   const progressSteps = getProgressSteps();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Breadcrumb items={breadcrumbItems} />

//         <div className="mt-4 mb-6">
//           <button
//             onClick={() => navigate('/track-order')}
//             className="flex items-center space-x-2 text-primary-10bg-primary-100 hover:text-blue-800 focus:outline-none"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span>Back to Track Order</span>
//           </button>
//         </div>

//         <div className="mt-8 max-w-4xl mx-auto">
//           {/* Order Summary */}
//           <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg mb-8">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-gray-600">Order #{id}</p>
//                 <p className="text-sm text-gray-500">
//                   Tracking ID: {order_tracking_id}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {items.length} Products • Order Placed on {formatDateTime(created_at).date} at {formatDateTime(created_at).time}
//                 </p>
//                 <div className="flex items-center gap-2 mt-2">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
//                     {status.charAt(0).toUpperCase() + status.slice(1)}
//                   </span>
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment_status)}`}>
//                     Payment: {payment_status.charAt(0).toUpperCase() + payment_status.slice(1)}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-xl font-bold text-primary-10bg-primary-100">${amount_paid}</div>
//             </div>
//           </div>

//           {/* Cancellation Notice */}
//           {cancel_order && (
//             <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-8">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-sm font-medium text-red-800">
//                     Order Cancelled
//                   </h3>
//                   <div className="mt-2 text-sm text-red-700">
//                     <p>This order has been cancelled.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Expected Arrival */}
//           <div className="text-sm text-gray-500 mb-4 font-medium">
//             Last Updated: <span className="text-black">{formatDateTime(updated_at).date} at {formatDateTime(updated_at).time}</span>
//           </div>

//           {/* Progress Tracker */}
//           {!cancel_order && (
//             <div className="relative mb-10">
//               <div className="flex justify-between mb-8">
//                 {progressSteps.map((label, index) => {
//                   const isCompleted = index <= currentStep;
//                   const Icon = index === 2 ? Truck : index === 0 ? Package : CheckCircle;
//                   return (
//                     <div className="flex flex-col items-center" key={label}>
//                       <div
//                         className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
//                           isCompleted ? 'bg-orange-500' : 'bg-gray-200 text-gray-400'
//                         }`}
//                       >
//                         <Icon className="h-5 w-5" />
//                       </div>
//                       <p className="mt-2 text-sm font-medium">{label}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//               <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
//                 <div 
//                   className="h-full bg-orange-500 transition-all duration-300" 
//                   style={{ 
//                     width: currentStep >= 0 
//                       ? `${((currentStep + 1) / progressSteps.length) * 100}%` 
//                       : '0%' 
//                   }} 
//                 />
//               </div>
//             </div>
//           )}

//           {/* Order Items */}
//           {items.length > 0 && (
//             <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
//               <h3 className="text-lg font-semibold mb-4">Order Items</h3>
//               <div className="space-y-4">
//                 {items.map((item) => (
//                   <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
//                     <div className="flex-1">
//                       <h4 className="font-medium text-gray-900">
//                         {item.product?.name || item.product?.title || 'Unknown Product'}
//                       </h4>
//                       <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//                       <p className="text-sm text-gray-500">Price: ${item.price}</p>
//                       {item.product_variation && (
//                         <p className="text-sm text-gray-500">
//                           Variation: {typeof item.product_variation === 'object' 
//                             ? JSON.stringify(item.product_variation) 
//                             : item.product_variation}
//                         </p>
//                       )}
//                     </div>
//                     <div className="text-right">
//                       <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Order Activity */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-lg font-semibold mb-6">Order Information</h2>
//             <div className="space-y-4">
//               <div className="flex items-start space-x-4">
//                 <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-50">
//                   <Package className="h-5 w-5 text-green-500" />
//                 </div>
//                 <div>
//                   <p className="text-gray-700">Order Created</p>
//                   <p className="text-sm text-gray-500">
//                     {formatDateTime(created_at).date} at {formatDateTime(created_at).time}
//                   </p>
//                 </div>
//               </div>
              
//               {updated_at !== created_at && (
//                 <div className="flex items-start space-x-4">
//                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50">
//                     <Clock className="h-5 w-5 text-blue-500" />
//                   </div>
//                   <div>
//                     <p className="text-gray-700">Last Updated</p>
//                     <p className="text-sm text-gray-500">
//                       {formatDateTime(updated_at).date} at {formatDateTime(updated_at).time}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <div className="flex items-start space-x-4">
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                   status === 'delivered' ? 'bg-green-50' : 'bg-blue-50'
//                 }`}>
//                   {status === 'delivered' ? (
//                     <CheckCircle className="h-5 w-5 text-green-500" />
//                   ) : (
//                     <Clock className="h-5 w-5 text-blue-500" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-gray-700">Current Status: {status.charAt(0).toUpperCase() + status.slice(1)}</p>
//                   <p className="text-sm text-gray-500">
//                     Payment Status: {payment_status.charAt(0).toUpperCase() + payment_status.slice(1)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="mt-8 flex justify-center space-x-4">
//             <button
//               onClick={() => navigate('/track-order')}
//               className="bg-primary-100 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Track Another Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Breadcrumb } from '../../../components/Breadcrumb';
// import { Package, Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
// import { useTrackOrder } from '../../../lib/api/product';

// interface OrderItem {
//   id: number;
//   product: {
//     id: number;
//     name?: string;
//     title?: string;
//     // Add other product fields as needed
//   };
//   product_variation: any;
//   quantity: number;
//   price: number;
// }

// interface TrackingData {
//   id: number;
//   cart_id: string;
//   order_tracking_id: string;
//   status: string;
//   amount_paid: number;
//   payment_status: string;
//   cancel_order: boolean;
//   reasons_for_cancelling_orders: string | null;
//   response_data: any;
//   created_at: string;
//   updated_at: string;
//   delivery_address: number;
//   items: OrderItem[];
// }

// export const TrackOrderDetails = () => {
//   const { id: trackingId } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { mutate: trackOrder, data, isPending, isError, error } = useTrackOrder();

//   const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

//   useEffect(() => {
//     if (trackingId) {
//       trackOrder(trackingId, {
//         onSuccess: (res) => {
//           setTrackingData(res);
//         },
//         onError: (err) => {
//           console.error('Failed to fetch tracking data:', err);
//           setTrackingData(null);
//         },
//       });
//     }
//   }, [trackingId, trackOrder]);

//   const breadcrumbItems = [
//     { label: 'Home', href: '/' },
//     { label: 'Pages', href: '/pages' },
//     { label: 'Track Order', href: '/track-order' },
//     { label: 'Details' },
//   ];

//   const formatDateTime = (datetime: string) => {
//     const d = new Date(datetime);
//     return {
//       date: d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }),
//       time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };
//   };

//   const getProgressSteps = () => {
//     return ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
//   };

//   const getCurrentStep = (status: string | undefined | null): number => {
//     if (!status) return 0;
    
//     const statusStr = String(status).toLowerCase();
    
//     const statusMap: Record<string, number> = {
//       'pending': 0,
//       'processing': 1,
//       'shipped': 2,
//       'delivered': 3,
//       'cancelled': -1
//     };
    
//     return statusMap[statusStr] ?? 0;
//   };
  
//   const getStatusColor = (status: string | undefined | null): string => {
//     if (!status) return 'bg-gray-100 text-gray-800';
    
//     const statusStr = String(status).toLowerCase();
    
//     const colorMap: Record<string, string> = {
//       'pending': 'bg-yellow-100 text-yellow-800',
//       'processing': 'bg-blue-100 text-blue-800',
//       'shipped': 'bg-purple-100 text-purple-800',
//       'delivered': 'bg-green-100 text-green-800',
//       'cancelled': 'bg-red-100 text-red-800'
//     };
    
//     return colorMap[statusStr] ?? 'bg-gray-100 text-gray-800';
//   };

//   // Safe string formatting utility
// const formatStatusText = (status: string | undefined | null): string => {
//   if (!status) return 'Unknown';
//   const str = String(status);
//   return str.charAt(0).toUpperCase() + str.slice(1);
// };

//   if (isPending) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <Breadcrumb items={breadcrumbItems} />
//           <div className="mt-8 text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-10bg-primary-100"></div>
//             <p className="mt-4 text-gray-600">Loading tracking information...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isError || !trackingData) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <Breadcrumb items={breadcrumbItems} />
//           <div className="mt-8 max-w-md mx-auto">
//             <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
//               <h2 className="text-lg font-semibold text-red-800 mb-2">Tracking Information Not Found</h2>
//               <p className="text-red-700 mb-4">
//                 We couldn't find tracking information for order ID: {trackingId}
//               </p>
//               <button
//                 onClick={() => navigate('/track-order')}
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center space-x-2 mx-auto"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//                 <span>Back to Track Order</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const { 
//     id, 
//     order_tracking_id,
//     amount_paid, 
//     created_at, 
//     updated_at,
//     status,
//     payment_status,
//     cancel_order,
//     items = [] 
//   } = trackingData;
  
//   const currentStep = getCurrentStep(status);
//   const progressSteps = getProgressSteps();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Breadcrumb items={breadcrumbItems} />

//         <div className="mt-4 mb-6">
//           <button
//             onClick={() => navigate('/track-order')}
//             className="flex items-center space-x-2 text-primary-10bg-primary-100 hover:text-blue-800 focus:outline-none"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span>Back to Track Order</span>
//           </button>
//         </div>

//         <div className="mt-8 max-w-4xl mx-auto">
//           {/* Order Summary */}
//           <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg mb-8">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-gray-600">Order #{id}</p>
//                 <p className="text-sm text-gray-500">
//                   Tracking ID: {order_tracking_id}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {items.length} Products • Order Placed on {formatDateTime(created_at).date} at {formatDateTime(created_at).time}
//                 </p>
//                 <div className="flex items-center gap-2 mt-2">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
//                     {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
//                   </span>
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment_status)}`}>
//                     Payment: {payment_status?.charAt(0)?.toUpperCase() + payment_status?.slice(1)}
//                   </span>
//                 </div>
//               </div>
//               <div className="text-xl font-bold text-primary-10bg-primary-100">${amount_paid}</div>
//             </div>
//           </div>

//           {/* Cancellation Notice */}
//           {cancel_order && (
//             <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-8">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-sm font-medium text-red-800">
//                     Order Cancelled
//                   </h3>
//                   <div className="mt-2 text-sm text-red-700">
//                     <p>This order has been cancelled.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Expected Arrival */}
//           <div className="text-sm text-gray-500 mb-4 font-medium">
//             Last Updated: <span className="text-black">{formatDateTime(updated_at).date} at {formatDateTime(updated_at).time}</span>
//           </div>

//           {/* Progress Tracker */}
//           {!cancel_order && (
//             <div className="relative mb-10">
//               <div className="flex justify-between mb-8">
//                 {progressSteps.map((label, index) => {
//                   const isCompleted = index <= currentStep;
//                   const Icon = index === 2 ? Truck : index === 0 ? Package : CheckCircle;
//                   return (
//                     <div className="flex flex-col items-center" key={label}>
//                       <div
//                         className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
//                           isCompleted ? 'bg-orange-500' : 'bg-gray-200 text-gray-400'
//                         }`}
//                       >
//                         <Icon className="h-5 w-5" />
//                       </div>
//                       <p className="mt-2 text-sm font-medium">{label}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//               <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
//                 <div 
//                   className="h-full bg-orange-500 transition-all duration-300" 
//                   style={{ 
//                     width: currentStep >= 0 
//                       ? `${((currentStep + 1) / progressSteps.length) * 100}%` 
//                       : '0%' 
//                   }} 
//                 />
//               </div>
//             </div>
//           )}

//           {/* Order Items */}
//           {items.length > 0 && (
//             <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
//               <h3 className="text-lg font-semibold mb-4">Order Items</h3>
//               <div className="space-y-4">
//                 {items.map((item) => (
//                   <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
//                     <div className="flex-1">
//                       <h4 className="font-medium text-gray-900">
//                         {item.product?.name || item.product?.title || 'Unknown Product'}
//                       </h4>
//                       <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//                       <p className="text-sm text-gray-500">Price: ${item.price}</p>
//                       {item.product_variation && (
//                         <p className="text-sm text-gray-500">
//                           Variation: {typeof item.product_variation === 'object' 
//                             ? JSON.stringify(item.product_variation) 
//                             : item.product_variation}
//                         </p>
//                       )}
//                     </div>
//                     <div className="text-right">
//                       <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Order Activity */}
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-lg font-semibold mb-6">Order Information</h2>
//             <div className="space-y-4">
//               <div className="flex items-start space-x-4">
//                 <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-50">
//                   <Package className="h-5 w-5 text-green-500" />
//                 </div>
//                 <div>
//                   <p className="text-gray-700">Order Created</p>
//                   <p className="text-sm text-gray-500">
//                     {formatDateTime(created_at).date} at {formatDateTime(created_at).time}
//                   </p>
//                 </div>
//               </div>
              
//               {updated_at !== created_at && (
//                 <div className="flex items-start space-x-4">
//                   <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50">
//                     <Clock className="h-5 w-5 text-blue-500" />
//                   </div>
//                   <div>
//                     <p className="text-gray-700">Last Updated</p>
//                     <p className="text-sm text-gray-500">
//                       {formatDateTime(updated_at).date} at {formatDateTime(updated_at).time}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <div className="flex items-start space-x-4">
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                   status === 'delivered' ? 'bg-green-50' : 'bg-blue-50'
//                 }`}>
//                   {status === 'delivered' ? (
//                     <CheckCircle className="h-5 w-5 text-green-500" />
//                   ) : (
//                     <Clock className="h-5 w-5 text-blue-500" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-gray-700">Current Status: {status?.charAt(0)?.toUpperCase() + status?.slice(1)}</p>
//                   <p className="text-sm text-gray-500">
//                     Payment Status: {payment_status?.charAt(0)?.toUpperCase() + payment_status?.slice(1)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="mt-8 flex justify-center space-x-4">
//             <button
//               onClick={() => navigate('/track-order')}
//               className="bg-primary-100 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Track Another Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { useTrackOrder } from '../../../lib/api/product';
import { formatCurrency } from '../../../lib/utils';

interface OrderItem {
  id: number;
  product: {
    id: number;
    name?: string;
    title?: string;
  };
  product_variation: any;
  quantity: number;
  price: number;
}

interface TrackingData {
  id: number;
  cart_id: string;
  order_tracking_id: string;
  status: string;
  amount_paid: number;
  payment_status: string;
  cancel_order: boolean;
  reasons_for_cancelling_orders: string | null;
  response_data: any;
  created_at: string;
  updated_at: string;
  delivery_address: number;
  items: OrderItem[];
}

// Safe status formatting utilities
const formatStatusText = (status: string | undefined | null): string => {
  if (!status) return 'Unknown';
  const str = String(status);
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getCurrentStep = (status: string | undefined | null): number => {
  if (!status) return 0;
  const statusStr = String(status).toLowerCase();
  
  const statusMap: Record<string, number> = {
    'pending': 0,
    'processing': 1,
    'shipped': 2,
    'delivered': 3,
    'cancelled': -1
  };
  
  return statusMap[statusStr] ?? 0;
};

const getStatusColor = (status: string | undefined | null): string => {
  if (!status) return 'bg-gray-100 text-gray-800';
  const statusStr = String(status).toLowerCase();
  
  const colorMap: Record<string, string> = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'shipped': 'bg-purple-100 text-purple-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  return colorMap[statusStr] ?? 'bg-gray-100 text-gray-800';
};

const getProgressSteps = (): string[] => {
  return ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
};

export const TrackOrderDetails = () => {
  const { id: trackingId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mutate: trackOrder, data, isPending, isError, error } = useTrackOrder();
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  useEffect(() => {
    if (trackingId) {
      trackOrder(trackingId, {
        onSuccess: (res) => {
          setTrackingData(res.data);
        },
        onError: (err) => {
          console.error('Failed to fetch tracking data:', err);
          setTrackingData(null);
        },
      });
    }
  }, [trackingId, trackOrder]);

  console.log(trackingData)
  console.log(trackOrder)

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pages', href: '/pages' },
    { label: 'Track Order', href: '/track-order' },
    { label: 'Details' },
  ];

  const formatDateTime = (datetime: string) => {
    const d = new Date(datetime);
    return {
      date: d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }),
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-10bg-primary-100"></div>
            <p className="mt-4 text-gray-600">Loading tracking information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !trackingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Tracking Information Not Found</h2>
              <p className="text-red-700 mb-4">
                We couldn't find tracking information for order ID: {trackingId}
              </p>
              <button
                onClick={() => navigate('/track-order')}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center space-x-2 mx-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Track Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { 
    id, 
    order_tracking_id,
    amount_paid, 
    created_at, 
    updated_at,
    status,
    payment_status,
    cancel_order,
    items = [] 
  } = trackingData;
  
  const currentStep = getCurrentStep(status);
  const progressSteps = getProgressSteps();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-4 mb-6">
          <button
            onClick={() => navigate('/track-order')}
            className="flex items-center space-x-2 text-primary-10bg-primary-100 hover:text-blue-800 focus:outline-none"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Track Order</span>
          </button>
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          {/* Order Summary */}
          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Order #{id}</p>
                <p className="text-sm text-gray-500">
                  Tracking ID: {order_tracking_id}
                </p>
                <p className="text-sm text-gray-500">
                  {items.length} Products • Order Placed on {formatDateTime(created_at).date} at {formatDateTime(created_at).time}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                    {formatStatusText(status)}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment_status)}`}>
                    Payment: {formatStatusText(payment_status)}
                  </span>
                </div>
              </div>
              <div className="text-xl font-bold text-primary-10bg-primary-100">{formatCurrency(amount_paid)}</div>
            </div>
          </div>

          {/* Cancellation Notice */}
          {cancel_order && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Order Cancelled
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>This order has been cancelled.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Expected Arrival */}
          <div className="text-sm text-gray-500 mb-4 font-medium">
            Last Updated: <span className="text-black">{formatDateTime(updated_at).date} at {formatDateTime(updated_at).time}</span>
          </div>

          {/* Progress Tracker */}
          {!cancel_order && (
            <div className="relative mb-10">
              <div className="flex justify-between mb-8">
                {progressSteps.map((label, index) => {
                  const isCompleted = index <= currentStep;
                  const Icon = index === 2 ? Truck : index === 0 ? Package : CheckCircle;
                  return (
                    <div className="flex flex-col items-center" key={label}>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                          isCompleted ? 'bg-orange-500' : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-2 text-sm font-medium">{label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                <div 
                  className="h-full bg-orange-500 transition-all duration-300" 
                  style={{ 
                    width: currentStep >= 0 
                      ? `${((currentStep + 1) / progressSteps.length) * 100}%` 
                      : '0%' 
                  }} 
                />
              </div>
            </div>
          )}

          {/* Order Items */}
          {items.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.product?.name || item.product?.title || 'Unknown Product'}
                      </h4>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-500">Price: {formatCurrency(item.price)}</p>
                      {item.product_variation && (
                        <p className="text-sm text-gray-500">
                          Variation: {typeof item.product_variation === 'object' 
                            ? JSON.stringify(item.product_variation) 
                            : item.product_variation}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order Activity */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-6">Order Information</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-50">
                  <Package className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-700">Order Created</p>
                  <p className="text-sm text-gray-500">
                    {formatDateTime(created_at).date} at {formatDateTime(created_at).time}
                  </p>
                </div>
              </div>
              
              {updated_at !== created_at && (
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50">
                    <Clock className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-gray-700">Last Updated</p>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(updated_at).date} at {formatDateTime(updated_at).time}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  status === 'delivered' ? 'bg-green-50' : 'bg-blue-50'
                }`}>
                  {status === 'delivered' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="text-gray-700">Current Status: {formatStatusText(status)}</p>
                  <p className="text-sm text-gray-500">
                    Payment Status: {formatStatusText(payment_status)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => navigate('/track-order')}
              className="bg-primary-100 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Track Another Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};