import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { Button } from '../../../components/ui/button';
import { formatCurrency } from '../../../lib/utils';
import { RatingModal } from '../../../components/ui/rating-modal';

interface OrderProduct {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderActivity {
  id: string;
  message: string;
  date: string;
  status: 'delivered' | 'shipping' | 'processing' | 'confirmed';
}

const orderDetails = {
  id: '#96459761',
  total: 1199.00,
  products: [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      name: 'Google Pixel 6 Pro 5G Android Phone - Unlocked Smartphone with Advanced Pixel C...',
      price: 899,
      quantity: 1,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
      name: 'TOCOL Full Clear for Google Pixel 6 Pro - Crystal Clear Phone Case with 3D Multi-O...',
      price: 39,
      quantity: 1,
    },
  ],
  orderDate: '17 Jan, 2020 at 7:32 PM',
  expectedDelivery: '23 Jan, 2021',
  activities: [
    {
      id: '1',
      message: 'Your order has been delivered. Thank you for shopping at Cloud!',
      date: '23 Jan, 2020 at 7:32 PM',
      status: 'delivered',
    },
    {
      id: '2',
      message: 'Our delivery man (John Wick) Has picked up your order for delivery.',
      date: '23 Jan, 2020 at 2:00 PM',
      status: 'shipping',
    },
    {
      id: '3',
      message: 'Your order has reached at last mile hub.',
      date: '22 Jan, 2020 at 10:00 AM',
      status: 'processing',
    },
    {
      id: '4',
      message: 'Your order on the way to last mile hub.',
      date: '21 2020 at 8:32 AM',
      status: 'processing',
    },
    {
      id: '5',
      message: 'Your order is successfully verified.',
      date: '20 Jan, 2020 at 7:32 PM',
      status: 'confirmed',
    },
    {
      id: '6',
      message: 'Your order has been confirmed.',
      date: '19 Jan, 2020 at 2:01 PM',
      status: 'confirmed',
    },
  ],
  billingAddress: {
    name: 'Kevin Gilbert',
    address: 'East Town East Word No. 54, Road No. 03, Sector DOHS, Plot No. 50, Dhaka-1205, Bangladesh',
    phone: '+1-202-555-0118',
    email: 'kevin.g@gmail.com',
  },
  shippingAddress: {
    name: 'Kevin Gilbert',
    address: 'East Town East Word No. 54, Road No. 03, Sector DOHS, Plot No. 50, Dhaka-1205, Bangladesh',
    phone: '+1-202-555-0118',
    email: 'kevin.g@gmail.com',
  },
  orderNotes: 'Dolor an vehicula turpis. Aliquam sagittis sed eu consectetur, aget malesuada diam lobortis. Aliquam erat volutpat. Aliquam malesuada.',
};

export function OrderDetails() {
  const { id } = useParams();
  const [showRatingModal, setShowRatingModal] = useState(false);

  const getStatusIcon = (status: OrderActivity['status']) => {
    switch (status) {
      case 'delivered':
        return '✓';
      case 'shipping':
        return '🚚';
      case 'processing':
        return '⚙️';
      case 'confirmed':
        return '✓';
      default:
        return '•';
    }
  };

  const getProgressStep = (activity: OrderActivity) => {
    switch (activity.status) {
      case 'delivered':
        return 4;
      case 'shipping':
        return 3;
      case 'processing':
        return 2;
      case 'confirmed':
        return 1;
      default:
        return 0;
    }
  };

  const currentStep = Math.max(...orderDetails.activities.map(getProgressStep));

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
                  <Link to="/orders" className="hover:text-gray-700">Order History</Link>
                  <span>/</span>
                  <span className="text-gray-900">Order Details</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <Link
                      to="/orders"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-lg font-semibold">ORDER DETAILS</h1>
                  </div>
                  <Button
                    onClick={() => setShowRatingModal(true)}
                    className="text-[#F86F03]"
                  >
                    Leave a Rating →
                  </Button>
                </div>

                {/* Order Summary */}
                <div className="bg-yellow-50 p-4 rounded-lg mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-medium">{orderDetails.id}</h2>
                      <p className="text-sm text-gray-600">
                        4 Products • Order Placed on {orderDetails.orderDate}
                      </p>
                    </div>
                    <div className="text-xl font-semibold">
                      {formatCurrency(orderDetails.total)}
                    </div>
                  </div>
                </div>

                {/* Order Progress */}
                <div className="mb-8">
                  <p className="text-sm text-gray-600 mb-4">
                    Order expected arrival {orderDetails.expectedDelivery}
                  </p>
                  <div className="relative">
                    <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-200">
                      <div
                        className="h-full bg-[#F86F03]"
                        style={{ width: `${(currentStep / 4) * 100}%` }}
                      />
                    </div>
                    <div className="relative flex justify-between">
                      <div className="text-center">
                        <div className={`w-4 h-4 rounded-full ${
                          currentStep >= 1 ? 'bg-[#F86F03]' : 'bg-gray-200'
                        } mb-2`} />
                        <p className="text-xs">Order Placed</p>
                      </div>
                      <div className="text-center">
                        <div className={`w-4 h-4 rounded-full ${
                          currentStep >= 2 ? 'bg-[#F86F03]' : 'bg-gray-200'
                        } mb-2`} />
                        <p className="text-xs">Packaging</p>
                      </div>
                      <div className="text-center">
                        <div className={`w-4 h-4 rounded-full ${
                          currentStep >= 3 ? 'bg-[#F86F03]' : 'bg-gray-200'
                        } mb-2`} />
                        <p className="text-xs">On The Road</p>
                      </div>
                      <div className="text-center">
                        <div className={`w-4 h-4 rounded-full ${
                          currentStep >= 4 ? 'bg-[#F86F03]' : 'bg-gray-200'
                        } mb-2`} />
                        <p className="text-xs">Delivered</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Activity */}
                <div className="mb-8">
                  <h2 className="font-semibold mb-4">Order Activity</h2>
                  <div className="space-y-4">
                    {orderDetails.activities.map((activity) => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                          {getStatusIcon(activity.status)}
                        </div>
                        <div>
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Products */}
                <div className="mb-8">
                  <h2 className="font-semibold mb-4">Product (02)</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-4 font-medium">PRODUCTS</th>
                          <th className="pb-4 font-medium">PRICE</th>
                          <th className="pb-4 font-medium">QUANTITY</th>
                          <th className="pb-4 font-medium">SUB-TOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetails.products.map((product) => (
                          <tr key={product.id} className="border-b">
                            <td className="py-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <p className="text-sm">{product.name}</p>
                              </div>
                            </td>
                            <td className="py-4">
                              {formatCurrency(product.price)}
                            </td>
                            <td className="py-4">×{product.quantity}</td>
                            <td className="py-4">
                              {formatCurrency(product.price * product.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Addresses */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <h2 className="font-semibold">Billing Address</h2>
                    <p className="font-medium">{orderDetails.billingAddress.name}</p>
                    <p className="text-sm text-gray-600">{orderDetails.billingAddress.address}</p>
                    <p className="text-sm text-gray-600">Phone Number: {orderDetails.billingAddress.phone}</p>
                    <p className="text-sm text-gray-600">Email: {orderDetails.billingAddress.email}</p>
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-semibold">Shipping Address</h2>
                    <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                    <p className="text-sm text-gray-600">{orderDetails.shippingAddress.address}</p>
                    <p className="text-sm text-gray-600">Phone Number: {orderDetails.shippingAddress.phone}</p>
                    <p className="text-sm text-gray-600">Email: {orderDetails.shippingAddress.email}</p>
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-semibold">Order Notes</h2>
                    <p className="text-sm text-gray-600">{orderDetails.orderNotes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RatingModal
        open={showRatingModal}
        onClose={() => setShowRatingModal(false)}
      />
    </div>
  );
}