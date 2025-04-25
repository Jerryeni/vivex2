import React from 'react';
// import { Breadcrumb } from '../components/Breadcrumb';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Breadcrumb } from '../../../components/Breadcrumb';

interface OrderActivity {
  message: string;
  date: string;
  time: string;
}

const orderActivities: OrderActivity[] = [
  {
    message: 'Your order has been delivered! Thank you for shopping at Ciscoit!',
    date: '23 Jan, 2020',
    time: '7:35 PM'
  },
  {
    message: 'Our delivery man (John Wick) Has picked up your order for delivery.',
    date: '23 Jan, 2020',
    time: '4:00 PM'
  },
  {
    message: 'Your order has reached at last mile hub.',
    date: '22 Jan, 2020',
    time: '8:00 AM'
  },
  {
    message: 'Your order is on the way to last mile hub.',
    date: '21, 2020',
    time: '5:32 AM'
  },
  {
    message: 'Your order is successfully verified.',
    date: '20 Jan, 2020',
    time: '7:32 PM'
  },
  {
    message: 'Your order has been confirmed.',
    date: '19 Jan, 2021',
    time: '2:01 PM'
  }
];

export const TrackOrderDetails = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pages', href: '/pages' },
    { label: 'Track Order', href: '/track-order' },
    { label: 'Details' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-8 max-w-3xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">#96459761</p>
                <p className="text-sm text-gray-500">4 Products • Order Placed in 17 Jan, 2021 at 7:32 PM</p>
              </div>
              <div className="text-xl font-bold text-blue-600">$1199.00</div>
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-between mb-8">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  <Package className="h-5 w-5" />
                </div>
                <p className="mt-2 text-sm font-medium">Order Placed</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="mt-2 text-sm font-medium">Packaging</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                  <Truck className="h-5 w-5" />
                </div>
                <p className="mt-2 text-sm font-medium">On The Road</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="mt-2 text-sm font-medium">Delivered</p>
              </div>
            </div>

            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
              <div className="w-1/2 h-full bg-orange-500"></div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-lg font-semibold mb-6">Order Activity</h2>
            <div className="space-y-6">
              {orderActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-gray-700">{activity.message}</p>
                    <p className="text-sm text-gray-500">
                      {activity.date} at {activity.time}
                    </p>
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