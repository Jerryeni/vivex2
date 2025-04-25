import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  tax: number;
  image: string;
}

interface InvoiceProduct extends Product {
  quantity: number;
  total: number;
}

export const InvoiceCreate = () => {
  const [products, setProducts] = useState<InvoiceProduct[]>([]);
  const [formData, setFormData] = useState({
    invoiceNumber: 'INV-075826/790',
    issueDate: '',
    dueDate: '',
    amount: '',
    status: 'Paid',
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    recipientName: '',
    recipientAddress: '',
    recipientPhone: '',
    recipientEmail: ''
  });

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        name: '',
        size: '',
        price: 0,
        tax: 0,
        quantity: 1,
        total: 0,
        image: ''
      }
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const subTotal = products.reduce((sum, product) => sum + product.total, 0);
    const discount = 60;
    const tax = subTotal * 0.155;
    const grandTotal = subTotal - discount + tax;

    return { subTotal, discount, tax, grandTotal };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ formData, products });
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl font-semibold mb-6">INVOICE CREATE</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              value={formData.invoiceNumber}
              readOnly
              className="w-full px-3 py-2 bg-gray-50 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Date
            </label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full pl-8 pr-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-medium mb-4">Issue From:</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="First name"
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                placeholder="Enter address"
                value={formData.senderAddress}
                onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={formData.senderPhone}
                onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Issue For:</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="First name"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                placeholder="Enter address"
                value={formData.recipientAddress}
                onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={formData.recipientPhone}
                onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.recipientEmail}
                onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mb-8 overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Product Name</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Tax</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        placeholder="Product Name"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Product Size"
                        className="w-full px-3 py-2 border rounded-md mt-2"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <button type="button" className="p-1 hover:bg-gray-100 rounded">
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          value={product.quantity}
                          className="w-16 px-3 py-2 border rounded-md text-center"
                        />
                        <button type="button" className="p-1 hover:bg-gray-100 rounded">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                        <input
                          type="number"
                          className="w-full pl-8 pr-3 py-2 border rounded-md"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                        <input
                          type="number"
                          className="w-full pl-8 pr-3 py-2 border rounded-md"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                        <input
                          type="number"
                          readOnly
                          value={product.total}
                          className="w-full pl-8 pr-3 py-2 bg-gray-50 border rounded-md"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <button
              type="button"
              onClick={handleAddProduct}
              className="w-full md:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Add Product
            </button>
            <div className="w-full md:w-auto text-right space-y-2">
              <div className="flex justify-end items-center space-x-4">
                <span className="text-gray-600">Sub Total:</span>
                <span className="font-medium">${calculateTotals().subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-end items-center space-x-4">
                <span className="text-gray-600">Discount:</span>
                <span className="font-medium">-$60.00</span>
              </div>
              <div className="flex justify-end items-center space-x-4">
                <span className="text-gray-600">Estimated Tax (15.5%):</span>
                <span className="font-medium">${calculateTotals().tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-end items-center space-x-4 text-lg font-bold">
                <span>Grand Amount:</span>
                <span>${calculateTotals().grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-100 p-4 rounded-lg mb-8">
          <p className="text-sm text-red-600">
            All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-end gap-4">
          <button
            type="button"
            className="w-full md:w-auto px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  );
};