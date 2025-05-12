import { useParams } from 'react-router-dom';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { Button } from '../../../components/ui/button';
import { formatCurrency } from '../../../lib/utils';
import { RatingModal } from '../../../components/ui/rating-modal';
import { ArrowLeft } from 'lucide-react';
import { useOrder } from '../../../lib/api/product';
import { useState } from 'react';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                {/* Breadcrumbs */}
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
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
                      <h2 className="font-medium">#{orderDetails.id}</h2>
                      <p className="text-sm text-gray-600">
                        Order placed on {new Date(orderDetails.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-xl font-semibold">
                      {formatCurrency(orderDetails.total_amount)}
                    </div>
                  </div>
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
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <p className="text-sm">{item.name}</p>
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

                {/* Billing/Shipping/Notes */}
                {/* You can conditionally render delivery address, etc here */}
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
