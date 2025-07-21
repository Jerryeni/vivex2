import React from 'react';
import { Menu, Bell, Search, Settings } from 'lucide-react';
import { useAuthStore } from '../../../lib/store/useAuthStore';

interface VendorHeaderProps {
  onMenuToggle: () => void;
  title: string;
}

const VendorHeader: React.FC<VendorHeaderProps> = ({ onMenuToggle, title }) => {
  const { user } = useAuthStore();

  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-gray-900 capitalize">
              {title}
            </h1>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="h-5 w-5" />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {getInitials(user?.full_name || user?.name || 'U')}
                </span>
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.full_name || user?.name || 'Unnamed User'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;