// import React, { useEffect, useState } from 'react';
// import { Breadcrumb } from '../../../components/Breadcrumb';
// import useCartStore from '../../../lib/store/useCartStore';
// import Select from 'react-select';
// import { Country, State, City } from 'country-state-city';
// import {
//   getAuthToken,
//   useCreateOrder,
//   useCreatePayment,
//   useCreateShippingAddress
// } from '../../../lib/api/product';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Cookies from "js-cookie";
// import { useAddressStore } from '../../../lib/store/useShippingStore';

// interface BillingInfo {
//   street: string;
//   country: string;
//   state: string;
//   city: string;
//   postal_code: string;
// }

// export const Checkout: React.FC = () => {
//   const { cart, fetchCart, clearCart } = useCartStore();
//   const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
//   const [selectedState, setSelectedState] = useState<State | null>(null);
//   const [selectedCity, setSelectedCity] = useState<City | null>(null);

//   const createShippingAddress = useCreateShippingAddress();
//   const createOrder = useCreateOrder();
//   const createPayment = useCreatePayment();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState<boolean>(false);
//   const { address, setAddress, clearAddress } = useAddressStore();
//   const [showAddressForm, setShowAddressForm] = useState(!address);

//   const [billingInfo, setBillingInfo] = useState<BillingInfo>({
//     street: '',
//     city: '',
//     state: '',
//     postal_code: '',
//     country: '',
//   });

//   const breadcrumbItems = [
//     { label: 'Home', href: '/' },
//     { label: 'Shopping Cart', href: '/cart' },
//     { label: 'Checkout' }
//   ];

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const subtotal = Array.isArray(cart)
//     ? cart.reduce((total, item) => total + (item?.sub_total || 0), 0)
//     : 0;

//   const shipping = 5.0;
//   const total = subtotal + shipping;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = getAuthToken();

//     if (!token) {
//       navigate('/sign-in', { state: { from: location.pathname } });
//       return;
//     }

//     setLoading(true);
//     try {
//       let shippingId = address?.id;

//       if (!shippingId) {
//         const shippingRes = await createShippingAddress.mutateAsync(billingInfo);
//         shippingId = shippingRes?.id;
//         setAddress({ id: shippingId, ...billingInfo });
//       }

//       const cart_id = Cookies.get('cart_id');

//       const orderRes = await createOrder.mutateAsync({
//         cart_id,
//         delivery_address_id: shippingId,
//         amount_paid: total,
//       });

//       clearCart();

//       const paymentRes = await createPayment.mutateAsync({
//         order_id: orderRes?.id,
//       });

//       window.location.href = paymentRes.paymentLink;
//     } catch (err) {
//       console.error('Checkout error:', err);
//       alert('Something went wrong during checkout.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCountryChange = (country: Country | null) => {
//     setSelectedCountry(country);
//     setSelectedState(null);
//     setSelectedCity(null);
//     setBillingInfo({ ...billingInfo, country: country?.name || '', state: '', city: '' });
//   };

//   const handleStateChange = (state: State | null) => {
//     setSelectedState(state);
//     setSelectedCity(null);
//     setBillingInfo({ ...billingInfo, state: state?.name || '', city: '' });
//   };

//   const handleCityChange = (city: City | null) => {
//     setSelectedCity(city);
//     setBillingInfo({ ...billingInfo, city: city?.name || '' });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Breadcrumb items={breadcrumbItems} />
//         <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Address Form or Display */}
//           <div className="lg:col-span-2">
//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <h2 className="text-lg font-semibold mb-6">Billing Information</h2>

//                 {showAddressForm ? (
//                   <div className="grid grid-cols-2 gap-4">
//                     {/* Country */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Country</label>
//                       <Select
//                         options={Country.getAllCountries()}
//                         getOptionLabel={(e) => e.name}
//                         getOptionValue={(e) => e.isoCode}
//                         onChange={handleCountryChange}
//                         value={selectedCountry}
//                       />
//                     </div>

//                     {/* State */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">State</label>
//                       <Select
//                         options={selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : []}
//                         getOptionLabel={(e) => e.name}
//                         getOptionValue={(e) => e.isoCode}
//                         onChange={handleStateChange}
//                         value={selectedState}
//                       />
//                     </div>

//                     {/* City */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">City</label>
//                       <Select
//                         options={
//                           selectedState
//                             ? City.getCitiesOfState(selectedCountry?.isoCode || '', selectedState?.isoCode || '')
//                             : []
//                         }
//                         getOptionLabel={(e) => e.name}
//                         getOptionValue={(e) => e.name}
//                         onChange={handleCityChange}
//                         value={selectedCity}
//                       />
//                     </div>

//                     {/* Street */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Street</label>
//                       <input
//                         type="text"
//                         name="street"
//                         value={billingInfo.street}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full rounded-md border border-gray-300 p-1.5 shadow-sm"
//                       />
//                     </div>

//                     {/* Postal Code */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Postal Code</label>
//                       <input
//                         type="text"
//                         name="postal_code"
//                         value={billingInfo.postal_code}
//                         onChange={handleInputChange}
//                         className="mt-1 block w-full rounded-md border border-gray-300 p-1.5 shadow-sm"
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <div className="space-y-2 text-sm">
//                       <p><strong>Street:</strong> {address?.street}</p>
//                       <p><strong>City:</strong> {address?.city}</p>
//                       <p><strong>State:</strong> {address?.state}</p>
//                       <p><strong>Country:</strong> {address?.country}</p>
//                       <p><strong>Postal Code:</strong> {address?.postal_code}</p>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         clearAddress();
//                         setShowAddressForm(true);
//                       }}
//                       className="mt-4 text-sm text-primary-100 underline"
//                     >
//                       Change Address
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </form>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
//               <div className="space-y-4">
//                 {cart.map((item) => (
//                   <div key={item.id} className="flex items-center space-x-4">
//                     <img
//                       src={item.product?.images[0]?.image_url || "/placeholder.jpg"}
//                       alt={item.product?.name}
//                       className="w-16 h-10"
//                     />
//                     <div>
//                       <h3 className="text-sm font-medium">{item.product?.name}</h3>
//                       <p className="text-sm text-gray-500">
//                         {item.quantity} × ₦{item.product?.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))}

//                 <div className="border-t pt-4 space-y-2">
//                   <div className="flex justify-between">
//                     <span>Sub-total</span>
//                     <span>₦{subtotal}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Shipping</span>
//                     <span className="text-green-500">{shipping ? shipping : 'Free'}</span>
//                   </div>
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>Total</span>
//                     <span>₦{total}</span>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   onClick={handleSubmit}
//                   disabled={loading} // Disable button during loading
//                   className="w-full bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <svg
//                       className="animate-bounce h-5 w-5 mr-3"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <circle cx="12" cy="12" r="10" strokeWidth="4" />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M4 12a8 8 0 118 8 8 8 0 01-8-8z"
//                       />
//                     </svg>
//                   ) : (
//                     "PLACE ORDER →"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { Breadcrumb } from '../../../components/Breadcrumb';
import useCartStore from '../../../lib/store/useCartStore';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import {
  getAuthToken,
  useCreateOrder,
  useCreatePayment,
  useCreateShippingAddress,
  useShippingAddresses,
  useUpdateShippingAddress,
  useDeleteShippingAddress
} from '../../../lib/api/product';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import {
  MapPin,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  CreditCard,
  Truck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { OptimizedImage } from '../../../components/ui/OptimizedImage';
import { useAuthStore } from '../../../lib/store/useAuthStore';
import { formatCurrency } from '../../../lib/utils';

interface Address {
  id?: number;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

export const Checkout: React.FC = () => {
  const { cart, fetchCart, clearCart } = useCartStore();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // API hooks
  // const { data: addresses, isLoading: isAddressLoading, refetch: refetchAddresses } = useShippingAddresses();
  const { data: addresses = [], isLoading: isAddressLoading, refetch: refetchAddresses } = useShippingAddresses();
  const createShippingAddress = useCreateShippingAddress();
  const updateShippingAddress = useUpdateShippingAddress() ;
  const deleteShippingAddress = useDeleteShippingAddress();
  const createOrder = useCreateOrder();
  const createPayment = useCreatePayment();
  const { user} = useAuthStore();
  

  const navigate = useNavigate();
  const location = useLocation();

  // State management
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAddressId, setSelectedAddressId] = useState<any>('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [showAddressList, setShowAddressList] = useState(false);
  const [orderStep, setOrderStep] = useState<'address' | 'payment'>('address');
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  const [billingInfo, setBillingInfo] = useState<Address>({
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    is_default: false,
  });

  const breadcrumbItems = [
    { label: 'Shopping Cart', href: '/cart' },
    { label: 'Checkout' }
  ];

  useEffect(() => {
    fetchCart();
    refetchAddresses();
  }, [fetchCart, refetchAddresses]);


  // Set default address when addresses are loaded
  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find(addr => addr.is_default) || addresses[0];
      if (defaultAddress?.id && defaultAddress.id !== selectedAddressId) {
        setSelectedAddressId(defaultAddress.id);
      }
    }
  }, [addresses, selectedAddressId]);

  // Get the currently selected address
  const selectedAddress = Array.isArray(addresses)
    ? addresses.find(addr => addr.id === selectedAddressId)
    : undefined;
  // const selectedAdd ress = addresses.find(addr => addr.id === selectedAddressId);


  const subtotal = Array.isArray(cart)
    ? cart.reduce((total, item) => total + (item?.sub_total || 0), 0)
    : 0;

  const shipping = 5.0;
  const total = subtotal + shipping;

  const resetForm = () => {
    setBillingInfo({
      street: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
      is_default: false,
    });
    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedCity(null);
    setEditingAddressId(null);
  };

  const handleEditAddress = (address: Address) => {
    setBillingInfo({
      street: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default || false,
    });

    const country = Country.getAllCountries().find(c => c.name === address.country);
    setSelectedCountry(country || null);

    if (country) {
      const state = State.getStatesOfCountry(country.isoCode).find(s => s.name === address.state);
      setSelectedState(state || null);

      if (state) {
        const city = City.getCitiesOfState(country.isoCode, state.isoCode).find(c => c.name === address.city);
        setSelectedCity(city || null);
      }
    }

    setEditingAddressId(address.id || null);
    setShowAddressForm(true);
  };

  const handleSaveAddress = async () => {
    try {
      setLoading(true);

      const addressData: Address = {
        street: billingInfo.street,
        city: billingInfo.city,
        state: billingInfo.state,
        postal_code: billingInfo.postal_code,
        country: billingInfo.country,
        is_default: billingInfo.is_default,
      };

      // Ensure dropdown selections are included
      if (selectedCountry) addressData.country = selectedCountry.name;
      if (selectedState) addressData.state = selectedState.name;
      if (selectedCity) addressData.city = selectedCity.name;

      if (editingAddressId) {
        // Use PUT for full updates
        await updateShippingAddress.mutateAsync({
          id: editingAddressId,
          updatedData: addressData
        });
      } else {
        const newAddress = await createShippingAddress.mutateAsync(addressData);
        setSelectedAddressId(newAddress.id);
      }

      await refetchAddresses();
      setShowAddressForm(false);
      resetForm();
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: any) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteShippingAddress.mutateAsync(addressId);
        await refetchAddresses();

        // Reset selection if deleted address was selected
        if (selectedAddressId === addressId) {
          const remainingAddresses = addresses?.filter(addr => addr.id !== addressId) || [];
          setSelectedAddressId(remainingAddresses[0]?.id || '');
        }
      } catch (error) {
        console.error('Error deleting address:', error);
        alert('Failed to delete address. Please try again.');
      }
    }
  };

  const handleProceedToPayment = async () => {
    const token = getAuthToken();

    if (!token) {
      navigate('/sign-in', { state: { from: location.pathname } });
      return;
    }

    if (!selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }

    try {
      setLoading(true);

      const cart_id = Cookies.get('cart_id');

      if (!cart_id) {
        throw new Error('Cart ID not found');
      }

      const orderRes = await createOrder.mutateAsync({
        cart_id,
        delivery_address_id: selectedAddressId,
        amount_paid: total,
      });

      setCreatedOrderId(orderRes.id);
      setOrderStep('payment');
      clearCart();

    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!createdOrderId) return;

    try {
      setLoading(true);

      const paymentRes = await createPayment.mutateAsync({
        order_id: createdOrderId,
      });

      if (paymentRes.paymentLink) {
        window.location.href = paymentRes.paymentLink;
      } else {
        throw new Error('Payment link not received');
      }

    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (country: Country | null) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    setBillingInfo(prev => ({
      ...prev,
      country: country?.name || '',
      state: '',
      city: ''
    }));
  };

  console.log(addresses)

  const handleStateChange = (state: State | null) => {
    setSelectedState(state);
    setSelectedCity(null);
    setBillingInfo(prev => ({
      ...prev,
      state: state?.name || '',
      city: ''
    }));
  };

  const handleCityChange = (city: City | null) => {
    setSelectedCity(city);
    setBillingInfo(prev => ({
      ...prev,
      city: city?.name || ''
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        {/* Progress Steps */}
        <div className="mt-8 mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center ${orderStep === 'address' ? 'text-primary-100' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${orderStep === 'address' ? 'bg-primary-100' : 'bg-gray-400'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Address</span>
            </div>
            <div className={`h-px w-16 ${orderStep === 'payment' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${orderStep === 'payment' ? 'text-primary-100' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${orderStep === 'payment' ? 'bg-primary-100' : 'bg-gray-400'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {orderStep === 'address' && (
              <>
                {showAddressForm ? (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold">
                        {editingAddressId ? 'Edit Address' : 'Add New Address'}
                      </h2>
                      <button
                        onClick={() => {
                          setShowAddressForm(false);
                          resetForm();
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Address Form Fields */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <Select
                          options={Country.getAllCountries()}
                          getOptionLabel={(e) => e.name}
                          getOptionValue={(e) => e.isoCode}
                          onChange={handleCountryChange}
                          value={selectedCountry}
                          className="text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <Select
                          options={selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : []}
                          getOptionLabel={(e) => e.name}
                          getOptionValue={(e) => e.isoCode}
                          onChange={handleStateChange}
                          value={selectedState}
                          className="text-sm"
                          isDisabled={!selectedCountry}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <Select
                          options={
                            selectedCountry && selectedState
                              ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
                              : []
                          }
                          getOptionLabel={(e) => e.name}
                          getOptionValue={(e) => e.name}
                          onChange={handleCityChange}
                          value={selectedCity}
                          className="text-sm"
                          isDisabled={!selectedState}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input
                          type="text"
                          name="street"
                          value={billingInfo.street}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                          type="text"
                          name="postal_code"
                          value={billingInfo.postal_code}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      {!editingAddressId && (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="defaultAddress"
                            name="is_default"
                            checked={billingInfo.is_default}
                            onChange={(e) => setBillingInfo(prev => ({ ...prev, is_default: e.target.checked }))}
                            className="h-4 w-4 text-primary-100 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="defaultAddress" className="ml-2 block text-sm text-gray-700">
                            Set as default address
                          </label>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={() => {
                          setShowAddressForm(false);
                          resetForm();
                        }}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveAddress}
                        disabled={loading}
                        className="px-6 py-2 bg-primary-100 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                      >
                        {loading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>}
                        {editingAddressId ? 'Update Address' : 'Save Address'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Delivery Address
                      </h2>
                      {addresses.length > 0 && (
                        <button
                          onClick={() => setShowAddressList(!showAddressList)}
                          className="text-primary-100 hover:text-blue-800 flex items-center text-sm"
                        >
                          {showAddressList ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          <span className="ml-1">{showAddressList ? 'Hide' : 'Show'} Addresses</span>
                        </button>
                      )}
                    </div>

                    {isAddressLoading ? (
                      <div className="text-center py-4">Loading addresses...</div>
                    ) : selectedAddress ? (
                      <>
                        <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg mb-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center mb-2">
                                <Check className="h-4 w-4 text-green-600 mr-2" />
                                <span className="font-medium">
                                {user ? user.username : ''} {user ? user.last_name : ''}
                                  {/* {selectedAddress.first_name} {selectedAddress.last_name} */}
                                </span>
                                {selectedAddress.is_default && (
                                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.country}
                              </p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <button
                              onClick={() => handleEditAddress(selectedAddress)}
                              className="text-primary-100 hover:text-blue-800 p-1"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {showAddressList && (
                          <div className="space-y-3 mb-4">
                            {addresses.map((address) => (
                              <div
                                key={address.id}
                                className={`border p-4 rounded-lg cursor-pointer transition-colors ${selectedAddressId === address.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                onClick={() => setSelectedAddressId(address.id)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                      
                                      {/* <span className="font-medium">
                                        {address.street}
                                      </span> */}
                                      {address.is_default && (
                                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                          Default
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                      {address.street}, {address.city}, {address.state}
                                    </p>
                                    {/* {address.phone && <p className="text-sm text-gray-600">{address.phone}</p>} */}
                                    {user ? user.username : ''}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditAddress(address);
                                      }}
                                      className="text-primary-100 hover:text-blue-800 p-1"
                                    >
                                      <Edit3 className="h-4 w-4" />
                                    </button>
                                    {!address.is_default && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteAddress(address.id);
                                        }}
                                        className="text-red-600 hover:text-red-800 p-1"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-4 text-gray-500">No address selected</div>
                    )}

                    <button
                      onClick={() => {
                        resetForm();
                        setShowAddressForm(true);
                      }}
                      className="w-full border-2 border-dashed border-gray-300 p-4 rounded-lg text-gray-600 hover:border-blue-400 hover:text-primary-100 transition-colors flex items-center justify-center"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      {addresses.length > 0 ? 'Add New Address' : 'Add Your First Address'}
                    </button>
                  </div>
                )}
              </>
            )}

            {orderStep === 'payment' && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-6 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </h2>

                <div className="text-center py-8">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Order Created Successfully!</h3>
                    <p className="text-green-700">Order ID: {createdOrderId}</p>
                    <p className="text-sm text-green-600 mt-2">
                      Your order has been created and reserved. Complete payment to confirm your order.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium mb-2">Payment Options</h4>
                    <p className="text-sm text-gray-600">
                      You will be redirected to our secure payment gateway to complete your payment.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {Array.isArray(cart) && cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <OptimizedImage
                      src={item.product?.images?.[0]?.image_url || ""}
                      alt={item.product?.name || "Product image"}
                      className="w-16 h-16 object-cover rounded"
                      width={64}
                      height={64}
                      fallbackSrc="/placeholder-product.jpg"
                      placeholder={item.product?.name || "Product"}
                       containerClassName="flex-shrink-0 group-hover:ring-2 group-hover:ring-blue-500 transition-all"
                    />
                    <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent text overflow */}
                      <h3 className="text-sm font-medium truncate">{item.product?.name}</h3> {/* Added truncate */}
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium">{formatCurrency(item.sub_total)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {orderStep === 'address' && (
                <button
                  onClick={handleProceedToPayment}
                  disabled={loading || !selectedAddressId}
                  className="w-full bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors mt-6 flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  ) : (
                    <Truck className="h-5 w-5 mr-2" />
                  )}
                  {loading ? 'Creating Order...' : 'Proceed to Payment'}
                </button>
              )}

              {orderStep === 'payment' && (
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors mt-6 flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  ) : (
                    <CreditCard className="h-5 w-5 mr-2" />
                  )}
                  {loading ? 'Processing...' : 'Pay Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};