import React from 'react';
import { Link } from 'react-router-dom';

export const PromotionalBanners: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-100 p-8 rounded-lg flex items-center">
        <div>
          <span className="text-blue-500 text-sm">INTRODUCING</span>
          <h2 className="text-2xl font-bold mt-2 mb-4">New Apple<br />Homepod Mini</h2>
          <p className="text-gray-600 mb-6">Jam-packed with innovation,<br />HomePod mini delivers unexpectedly.</p>
          <Link to="/shop" className="inline-block bg-orange-500 text-white px-6 py-2 rounded">
            SHOP NOW →
          </Link>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1610438235354-a6ae5528385c" 
          alt="Apple Homepod Mini"
          className="w-48 h-48 object-contain"
        />
      </div>

      <div className="bg-gray-900 text-white p-8 rounded-lg flex items-center">
        <div>
          <span className="text-yellow-400 text-sm">INTRODUCING NEW</span>
          <h2 className="text-2xl font-bold mt-2 mb-4">Xiaomi Mi 11 Ultra<br />12GB+256GB</h2>
          <p className="text-gray-400 mb-6">*Data provided by internal<br />laboratories. Industry measurment.</p>
          <Link to="/shop" className="inline-block bg-orange-500 text-white px-6 py-2 rounded">
            SHOP NOW →
          </Link>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00" 
            alt="Xiaomi Mi 11 Ultra"
            className="w-48 h-48 object-contain"
          />
          <span className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded">
            $590
          </span>
        </div>
      </div>
    </div>
  );
};