import React, { useEffect, useState } from 'react';
import { Breadcrumb } from '../../../components/Breadcrumb';
import useCartStore from '../../../lib/store/useCartStore';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import {
  getAuthToken,
  useCreateOrder,
  useCreatePayment,
  useCreateShippingAddress
} from '../../../lib/api/product';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import { useAddressStore } from '../../../lib/store/useShippingStore';

interface BillingInfo {
  street: string;
  country: string;
  state: string;
  city: string;
  postal_code: string;
}

export const Checkout: React.FC = () => {
  const { cart, fetchCart, clearCart } = useCartStore();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const createShippingAddress = useCreateShippingAddress();
  const createOrder = useCreateOrder();
  const createPayment = useCreatePayment();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const { address, setAddress, clearAddress } = useAddressStore();
  const [showAddressForm, setShowAddressForm] = useState(!address);

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shopping Cart', href: '/cart' },
    { label: 'Checkout' }
  ];

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = Array.isArray(cart)
    ? cart.reduce((total, item) => total + (item?.sub_total || 0), 0)
    : 0;

  const shipping = 5.0;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAuthToken();

    if (!token) {
      navigate('/sign-in', { state: { from: location.pathname } });
      return;
    }

    setLoading(true);
    try {
      let shippingId = address?.id;

      if (!shippingId) {
        const shippingRes = await createShippingAddress.mutateAsync(billingInfo);
        shippingId = shippingRes?.id;
        setAddress({ id: shippingId, ...billingInfo });
      }

      const cart_id = Cookies.get('cart_id');

      const orderRes = await createOrder.mutateAsync({
        cart_id,
        delivery_address_id: shippingId,
        amount_paid: total,
      });

      clearCart();

      const paymentRes = await createPayment.mutateAsync({
        order_id: orderRes?.id,
      });

      window.location.href = paymentRes.paymentLink;
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong during checkout.');
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (country: Country | null) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    setBillingInfo({ ...billingInfo, country: country?.name || '', state: '', city: '' });
  };

  const handleStateChange = (state: State | null) => {
    setSelectedState(state);
    setSelectedCity(null);
    setBillingInfo({ ...billingInfo, state: state?.name || '', city: '' });
  };

  const handleCityChange = (city: City | null) => {
    setSelectedCity(city);
    setBillingInfo({ ...billingInfo, city: city?.name || '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Address Form or Display */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-6">Billing Information</h2>

                {showAddressForm ? (
                  <div className="grid grid-cols-2 gap-4">
                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Country</label>
                      <Select
                        options={Country.getAllCountries()}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.isoCode}
                        onChange={handleCountryChange}
                        value={selectedCountry}
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <Select
                        options={selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : []}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.isoCode}
                        onChange={handleStateChange}
                        value={selectedState}
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <Select
                        options={
                          selectedState
                            ? City.getCitiesOfState(selectedCountry?.isoCode || '', selectedState?.isoCode || '')
                            : []
                        }
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.name}
                        onChange={handleCityChange}
                        value={selectedCity}
                      />
                    </div>

                    {/* Street */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Street</label>
                      <input
                        type="text"
                        name="street"
                        value={billingInfo.street}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-1.5 shadow-sm"
                      />
                    </div>

                    {/* Postal Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                      <input
                        type="text"
                        name="postal_code"
                        value={billingInfo.postal_code}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-1.5 shadow-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-2 text-sm">
                      <p><strong>Street:</strong> {address?.street}</p>
                      <p><strong>City:</strong> {address?.city}</p>
                      <p><strong>State:</strong> {address?.state}</p>
                      <p><strong>Country:</strong> {address?.country}</p>
                      <p><strong>Postal Code:</strong> {address?.postal_code}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        clearAddress();
                        setShowAddressForm(true);
                      }}
                      className="mt-4 text-sm text-blue-600 underline"
                    >
                      Change Address
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.product?.images[0]?.image_url || "/placeholder.jpg"}
                      alt={item.product?.name}
                      className="w-16 h-10"
                    />
                    <div>
                      <h3 className="text-sm font-medium">{item.product?.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × ₦{item.product?.price}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Sub-total</span>
                    <span>₦{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-500">{shipping ? shipping : 'Free'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₦{total}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading} // Disable button during loading
                  className="w-full bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <svg
                      className="animate-bounce h-5 w-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="4" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 12a8 8 0 118 8 8 8 0 01-8-8z"
                      />
                    </svg>
                  ) : (
                    "PLACE ORDER →"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};