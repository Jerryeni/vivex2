// import React, { useState } from 'react';
// import { Info } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { Breadcrumb } from '../../../components/Breadcrumb';
// import axios from 'axios';

// export const TrackOrder = () => {
//   const [orderId, setOrderId] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const breadcrumbItems = [
//     { label: 'Home', href: '/' },
//     { label: 'Pages', href: '/pages' },
//     { label: 'Track Order' }
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!orderId || !email) {
//       setError('Please provide both Order ID and Billing Email.');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.get(`/api/orders/track`, {
//         params: { orderId, email },
//       });

//       if (response.data?.success) {
//         // Assuming order exists, redirect
//         navigate(`/track-order/details/${orderId}`);
//       } else {
//         setError('No matching order found. Please check your credentials.');
//       }
//     } catch (err: any) {
//       setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Breadcrumb items={breadcrumbItems} />

//         <div className="mt-8 max-w-2xl mx-auto">
//           <h1 className="text-2xl font-bold mb-2">Track Order</h1>
//           <p className="text-gray-600 mb-8">
//             To track your order please enter your order ID and billing email below. This was sent to you in your
//             receipt and confirmation email.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="flex w-full gap-4">
//               <div className='w-full'>
//                 <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
//                   Order ID
//                 </label>
//                 <input
//                   type="text"
//                   id="orderId"
//                   value={orderId}
//                   onChange={(e) => setOrderId(e.target.value)}
//                   className="mt-1 block w-full rounded-md py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 border border-gray-100"
//                 />
//               </div>

//               <div className='w-full'>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Billing Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="mt-1 block w-full rounded-md py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 border border-gray-100"
//                 />
//               </div>
//             </div>

//             <div className="flex items-start space-x-2 text-sm text-gray-500">
//               <Info className="h-5 w-5 flex-shrink-0" />
//               <p>Order ID that we emailed to you in your receipt.</p>
//             </div>

//             {error && <p className="text-red-600 text-sm">{error}</p>}

//             <button
//               type="submit"
//               disabled={loading}
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
//             >
//               {loading ? 'Checking...' : 'TRACK ORDER →'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// src/pages/TrackOrderDetails.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useTrackOrder } from '../../../lib/api/product';

export const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get('order-tracking-id') || '';
  const { mutate: trackOrder, data, isPending, isError, error } = useTrackOrder();

  const [trackingData, setTrackingData] = useState<any>(null);

  useEffect(() => {
    if (trackingId) {
      trackOrder(trackingId, {
        onSuccess: (res) => {
          setTrackingData(res);
        },
      });
    }
  }, [trackingId, trackOrder]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pages', href: '/pages' },
    { label: 'Track Order', href: '/track-order' },
    { label: 'Details' },
  ];

  if (isPending) return <p>Loading...</p>;
  if (isError || !trackingData) return <p>Failed to fetch tracking data.</p>;

  const { id, total_amount, created_at, items, tracking_steps } = trackingData;

  const formatDateTime = (datetime: string) => {
    const d = new Date(datetime);
    return {
      date: d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }),
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const currentStep = tracking_steps.findIndex((step: { completed: boolean }) => step.completed);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">#{id}</p>
                <p className="text-sm text-gray-500">
                  {items?.length || 0} Products • Order Placed on {formatDateTime(created_at).date} at {formatDateTime(created_at).time}
                </p>
              </div>
              <div className="text-xl font-bold text-blue-600">${total_amount}</div>
            </div>
          </div>

          <div className="text-sm text-gray-500 mb-4 font-medium">
            Order expected arrival <span className="text-black">{tracking_steps?.[tracking_steps.length - 1]?.expected_arrival || 'N/A'}</span>
          </div>

          {/* Progress Tracker */}
          <div className="relative mb-10">
            <div className="flex justify-between mb-8">
              {['Order Placed', 'Packaging', 'On The Road', 'Delivered'].map((label, index) => {
                const isCompleted = index <= currentStep;
                const Icon = index === 2 ? Truck : CheckCircle;
                return (
                  <div className="flex flex-col items-center" key={label}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        isCompleted ? 'bg-orange-500' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {index === 0 ? <Package className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <p className="mt-2 text-sm font-medium">{label}</p>
                  </div>
                );
              })}
            </div>
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
              <div className="h-full bg-orange-500" style={{ width: `${((currentStep + 1) / 4) * 100}%` }} />
            </div>
          </div>

          {/* Order Activity */}
          <div className="mt-12">
            <h2 className="text-lg font-semibold mb-6">Order Activity</h2>
            <div className="space-y-6">
              {tracking_steps.map((step: any, index: number) => {
                const { date, time } = formatDateTime(step.timestamp);
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-gray-700">{step.message}</p>
                      <p className="text-sm text-gray-500">
                        {date} at {time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};