import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Moon, Bell, Search, X, ChevronRight } from 'lucide-react';
import { Sidebar } from '../admin/Sidebar';

export const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex h-screen overflow-hidden bg-[#F9F7F7]">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40   text-white transform lg:translate-x-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:block`}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden xlg:ml-64 bg-gray-50x">
        {/* Header */}
        <header className="bg-whitex border-bx px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="lg:hidden text-gray-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
            </button>
            {/* <h1 className="text-xl font-semibold ml-4">{getHeaderTitle()}</h1> */}
            <h1 className="text-xl font-semibold ml-4 uppercase">Welcome</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Moon className="h-5 w-5 text-gray-500" />
            <Bell className="h-5 w-5 text-gray-500" />
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
           
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};