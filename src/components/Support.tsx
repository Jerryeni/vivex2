import React from 'react';
import { Search, Package, Lock, CreditCard, User, Heart, Truck, ShoppingCart, HelpCircle, PhoneCall } from 'lucide-react';
import HeroNav from './layout/HeroNav';

const supportCategories = [
  { icon: <Package />, title: 'Track Order' },
  { icon: <Lock />, title: 'Reset Password' },
  { icon: <CreditCard />, title: 'Payment Option' },
  { icon: <User />, title: 'User & Account' },
  { icon: <Heart />, title: 'Wishlist & Compare' },
  { icon: <Truck />, title: 'Shipping & Billing' },
  { icon: <ShoppingCart />, title: 'Shopping Cart & Wallet' },
  { icon: <HelpCircle />, title: 'Sell on Clicon' }
];

const popularTopics = [
  'How do I return my item?',
  'What is Clicon Returns Policy?',
  'How long is the refund process?',
  'What are the Delivery Timelines?',
  'What is Discover Your Daraz Campaign 2022?',
  'What is the Voucher & Gift Offer in this Campaign?',
  'How to cancel Clicon Order.',
  'Ask the Digital and Device Community',
  'How to change my shop name?'
];

export const Support = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-32">
      <HeroNav />

      </div>
      <div className="flex px-32 bg-gray-100 items-center space-x-2 p-4 text-sm mb-8">
          <a href="/" className="text-gray-500">Home</a>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900">Customer Support</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        

        {/* Help Center Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-block bg-yellow px-3 py-1 rounded text-sm mb-4">
              HELP CENTER
            </div>
            <h1 className="text-3xl font-bold mb-8">How we can help you!</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your question or keyword"
                className="w-full px-4 py-3 border rounded-lg pr-24"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-6 py-2 rounded">
                SEARCH
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d"
              alt="Customer Support"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* Support Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            What can we assist you with today?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => (
              <div
                key={index}
                className="border flex items-center gap-3 p-3 text-center hover:border-orange-500 cursor-pointer transition-colors"
              >
                <div className="text-orange-500 ">
                  {category.icon}
                </div>
                <h3 className="font-light text-sm">{category.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mb-16">
          <h2 className="text-2xl text-center font-medium mb-8">Popular Topics</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-4">
            {popularTopics.map((topic, index) => (
              <li className='list-disc'>
                <a
                key={index}
                href="#"
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                {topic}
              </a>
              </li>
              
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mx-auto mb-16">
          <p className="w-fit mx-auto flex place-content-center text-center
           bg-secondary-default px-4 py-2 text-white text-sm mb-4">
          Contact us
          </p>
          <h2 className="text-2xl mb-2 text-center">Don't find your answer, contact with us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white flex gap-3 shadow-lg s p-8">
              <div className="w-12 h-12 bg-blue-100  flex items-center justify-center mx-auto mb-4">
                <PhoneCall className="text-blue-500" />
              </div>
              <div className="flex flex-col">
              <h3 className=" mb-2">Call us now</h3>
              <p className="text-xs text-gray-500 mb-4">
                We are available from 8:00 AM to 5:00 PM<br />
                (GMT+6). Talk with us now.
              </p>
              <p className="text-lg font-bold mb-4">+1-202-555-0126</p>
              <button className="bg-secondary-default text-white px-6 py-2  hover:bg-blue-600 transition-colors">
                CALL NOW →
              </button>
              </div>
              
            </div>
            <div className="bg-white flex gap-3 shadow-lg  p-8">
              <div className="w-12 h-12 bg-blue-100  flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="text-blue-500" />
              </div>
              <div className="flex flex-col">
              <h3 className=" mb-2">Call us now</h3>
              <p className="text-xs text-gray-500 mb-4">
                We are available from 8:00 AM to 5:00 PM<br />
                (GMT+6). Talk with us now.
              </p>
              <p className="text-lg font-bold mb-4">Support@clicon.com</p>
              <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors">
                CONTACT US →
              </button>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};