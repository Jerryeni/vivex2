import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Moon, Bell, Search, X, ChevronRight } from 'lucide-react';
import { Sidebar } from '../admin/Sidebar';

export const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Set dynamic title based on the route
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case '/admin':
        return 'Dashboard';
      case '/admin/products':
        return 'Products';
      case '/admin/products/create':
        return 'Create Product';
      case '/admin/orders':
        return 'Orders';
      case '/admin/categories':
        return 'Categories';
      case '/admin/roles':
        return 'Roles';
      case '/admin/permissions':
        return 'Permissions';
      case '/admin/vendors':
        return 'Vendors';
      case '/admin/coupons':
        return 'Coupons';
      case '/admin/reviews':
        return 'Reviews';
      case '/admin/email':
        return 'Email';
      case '/admin/calendar':
        return 'Calendar';
      case '/admin/tools':
        return 'Tools';
      case '/admin/profile':
        return 'Profile';
      default:
        return 'Admin Panel';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} lg:w-64 w-full fixed top-0 left-0 bottom-0 z-50 bg-[#1F2937] text-white transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <main className={`flex-1 overflow-auto transition-all ${sidebarOpen ? 'ml-64' : ''}`}>
        {/* Header */}
        <header className="bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Sidebar Toggle for Mobile */}
            <button 
              className="lg:hidden text-gray-600" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-semibold ml-4">{getHeaderTitle()}</h1>
          </div>

          {/* Header Right */}
          <div className="flex items-center space-x-4">
            <Moon className="h-5 w-5 text-gray-500" />
            <Bell className="h-5 w-5 text-gray-500" />
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </header>

        {/* Content */}
        <Outlet />
      </main>
    </div>
  );
};