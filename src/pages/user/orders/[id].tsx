import { Link, useParams } from 'react-router-dom';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { Button } from '../../../components/ui/button';
import { formatCurrency } from '../../../lib/utils';
import { RatingModal } from '../../../components/ui/rating-modal';
import { ArrowLeft } from 'lucide-react';
import { useOrder } from '../../../lib/api/product';
import { useState } from 'react';
import { Breadcrumb } from '../../../components/ui/Breadcrumb';

export function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const { data: orderDetails, isLoading } = useOrder(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium">Loading Order Details...</div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium">Order Not Found</div>
      </div>
    );
  }

  // Simulated order tracking and activity log
  const statusSteps = ['Order Placed', 'Packaging', 'On The Road', 'Delivered'];
  const currentStatusStep = 3;

  const activityLog = [
    {
      message: 'Your order has been delivered. Thank you for shopping at V-store!',
      timestamp: '2021-01-23T19:32:00Z',
    },
    {
      message: 'Our delivery man (John Wick) has picked up your order for delivery.',
      timestamp: '2021-01-23T14:00:00Z',
    },
    {
      message: 'Your order has reached the last mile hub.',
      timestamp: '2021-01-22T08:00:00Z',
    },
    {
      message: 'Your order is on the way to the last mile hub.',
      timestamp: '2021-01-21T05:32:00Z',
    },
    {
      message: 'Your order is successfully verified.',
      timestamp: '2021-01-20T19:32:00Z',
    },
    {
      message: 'Your order has been confirmed.',
      timestamp: '2021-01-19T14:01:00Z',
    },
  ];

  const breadcrumbItems = [
    { label: 'order', href: '/order' },
    { label: 'order details' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="pt-6 px-6 border-b">
                <Breadcrumb items={breadcrumbItems} />
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <Link to="/user/orders">
                      <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-lg font-semibold">ORDER DETAILS</h1>
                  </div>
                  <Button
                    onClick={() => setShowRatingModal(true)}
                    className="text-primary-100 bg-transparent"
                  >
                    Leave a Rating →
                  </Button>
                </div>

                {/* Order Summary */}
                <div className="bg-yellow/20 p-4 rounded-lg mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-medium">#{orderDetails.id}</h2>
                      <p className="text-sm text-gray-600">
                        Order placed on{' '}
                        {new Date(orderDetails.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-xl font-semibold">
                      {formatCurrency(orderDetails.total_amount)}
                    </div>
                  </div>
                </div>

                {/* Tracking Progress */}
                <div className="mb-8">
                  <h2 className="font-meduim mb-4">Order espected to be delivered in:</h2>
                  <div className="relative flex items-center justify-between">
                    {statusSteps.map((step, index) => {
                      const isCompleted = index <= currentStatusStep;
                      const isLast = index === statusSteps.length - 1;

                      return (
                        <div key={index} className="flex-1 flex flex-col items-center relative">
                          {/* Circle */}
                          <div
                            className={`w-6 h-6 rounded-full z-10 ${isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                              }`}
                          ></div>

                          {/* Step label */}
                          <p className="text-xs mt-2 text-center">{step}</p>

                          {/* Connector Line (except for the last step) */}
                          {!isLast && (
                            <div
                              className={`absolute top-3 left-1/2 h-1 w-full -translate-x-0.5 z-0 ${index < currentStatusStep ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                            ></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Activity Log */}
                <div className="mb-8">
                  <h2 className="font-semibold mb-4">Order Activity</h2>
                  <ul className="space-y-4">
                    {activityLog.map((log, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-sm">{log.message}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Products */}
                <div className="mb-8">
                  <h2 className="font-semibold mb-4">
                    Products ({orderDetails.items.length})
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-4 font-medium">PRODUCT</th>
                          <th className="pb-4 font-medium">PRICE</th>
                          <th className="pb-4 font-medium">QUANTITY</th>
                          <th className="pb-4 font-medium">SUBTOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetails.items.map((item: any) => (
                          <tr key={item.id} className="border-b">
                            <td className="py-4">
                              <div className="flex items-center gap-4">
                                {item.product?.images?.length > 0 && (
                                  <img
                                    src={item.product.images[0].image_url}
                                    alt={item.product.name}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <p className="text-sm">{item.product?.name}</p>
                              </div>
                            </td>
                            <td className="py-4">{formatCurrency(item.price)}</td>
                            <td className="py-4">×{item.quantity}</td>
                            <td className="py-4">
                              {formatCurrency(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Future: Billing & Shipping Info */}
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