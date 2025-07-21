import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../assets/icons/Logo.svg';
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  User,
  X,
  FileText
} from 'lucide-react';
import { useAuthStore } from '../../../lib/store/useAuthStore';

interface VendorSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const VendorSidebar: React.FC<VendorSidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { user } = useAuthStore();

  const navigationItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/vendor/dashboard',
      description: 'Overview & Analytics'
    },
    {
      name: 'My Stores',
      icon: Store,
      path: '/vendor/stores',
      description: 'Manage your stores'
    },
    {
      name: 'My Products',
      icon: Package,
      path: '/vendor/products',
      description: 'Product catalog'
    },
    {
      name: 'Orders',
      icon: ShoppingCart,
      path: '/vendor/orders',
      description: 'Order management'
    },
    {
      name: 'Business Docs',
      icon: FileText,
      path: '/vendor/business-docs',
      description: 'Document verification'
    },
    {
      name: 'Profile Settings',
      icon: User,
      path: '/vendor/profile',
      description: 'Account settings'
    },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-72 flex flex-col shadow-lg lg:shadow-none
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 bg-transparent">
              <img src={Logo} alt="Vivian's Store" className="h-10" />
            </Link>
          </div>

          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onToggle()}
                className={`
                  group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                  ${isActiveRoute(item.path)
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon className={`
                  mr-3 h-5 w-5 transition-colors
                  ${isActiveRoute(item.path) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}
                `} />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                </div>
                {isActiveRoute(item.path) && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {getInitials(user?.full_name || user?.name || 'U')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.full_name || user?.name || 'Unnamed User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'no-email@example.com'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorSidebar;