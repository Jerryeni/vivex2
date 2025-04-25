import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity: newQuantity }
    });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const calculateTotals = () => {
    const subtotal = state.total;
    const shipping = 0; // Free shipping
    const discount = 24;
    const tax = subtotal * 0.155;
    return {
      subtotal,
      shipping,
      discount,
      tax,
      total: subtotal + shipping - discount + tax
    };
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl font-semibold mb-6">SHOPPING CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 md:p-6 border-b">
              <h2 className="font-semibold">Cart Items</h2>
            </div>
            <div className="divide-y">
              {state.items.map((item) => (
                <div key={item.id} className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Size: M</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-4">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 w-full sm:w-auto">
                    <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sticky top-6">
            <h2 className="font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${calculateTotals().subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span>-$24.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${calculateTotals().tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotals().total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};