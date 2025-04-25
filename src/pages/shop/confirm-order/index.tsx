import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from '../../../components/Breadcrumb';

export const Confirmation: React.FC = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Order Confirmation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-2xl font-bold text-green-600 mb-4">Thank you for your order!</h1>
        <p className="text-gray-700 mb-6">Your order has been successfully placed.</p>
        {orderId && <p className="text-sm text-gray-500 mb-6">Order ID: <strong>{orderId}</strong></p>}
        <Link
          to="/products"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;