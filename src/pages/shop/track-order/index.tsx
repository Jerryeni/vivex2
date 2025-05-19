import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../../components/Breadcrumb';
import axios from 'axios';

export const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pages', href: '/pages' },
    { label: 'Track Order' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!orderId || !email) {
      setError('Please provide both Order ID and Billing Email.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(`/api/orders/track`, {
        params: { orderId, email },
      });

      if (response.data?.success) {
        // Assuming order exists, redirect
        navigate(`/track-order/details/${orderId}`);
      } else {
        setError('No matching order found. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-8 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Track Order</h1>
          <p className="text-gray-600 mb-8">
            To track your order please enter your order ID and billing email below. This was sent to you in your
            receipt and confirmation email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex w-full gap-4">
              <div className='w-full'>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
                  Order ID
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="mt-1 block w-full rounded-md py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 border border-gray-100"
                />
              </div>

              <div className='w-full'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Billing Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 border border-gray-100"
                />
              </div>
            </div>

            <div className="flex items-start space-x-2 text-sm text-gray-500">
              <Info className="h-5 w-5 flex-shrink-0" />
              <p>Order ID that we emailed to you in your receipt.</p>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'TRACK ORDER →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};