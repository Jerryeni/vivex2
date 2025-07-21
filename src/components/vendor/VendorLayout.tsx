import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  Archive, 
  ShoppingCart, 
  CreditCard,
  BarChart3,
  Settings,
  User,
  Store,
  FileText,
  MessageSquare,
  StarIcon,
  Search,
  Bell,
  RefreshCw,
  BookOpen,
  Users
} from 'lucide-react';

const VendorLayout = () => {
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/vendor/dashboard' },
    { 
      name: 'Products', 
      icon: Package, 
      path: '/vendor/products',
      subItems: [
        { name: 'List', path: '/vendor/products' },
        { name: 'Grid', path: '/vendor/products/grid' },
        { name: 'Details', path: '/vendor/products/details' },
        { name: 'Edit', path: '/vendor/products/edit' },
        { name: 'Create', path: '/vendor/products/create' }
      ]
    },
    { name: 'Category', icon: FolderOpen, path: '/vendor/category' },
    { name: 'Inventory', icon: Archive, path: '/vendor/inventory' },
    { name: 'Orders', icon: ShoppingCart, path: '/vendor/orders' },
    { name: 'Purchases', icon: CreditCard, path: '/vendor/purchases' },
    { name: 'Attributes', icon: BarChart3, path: '/vendor/attributes' },
    { name: 'Invoices', icon: FileText, path: '/vendor/invoices' },
    { name: 'Settings', icon: Settings, path: '/vendor/settings' },
  ];

  const otherItems = [
    { name: 'Profile', icon: User, path: '/vendor/profile' },
    { name: 'Roles', icon: Users, path: '/vendor/roles' },
    { name: 'Permissions', icon: BookOpen, path: '/vendor/permissions' },
    { name: 'Customers', icon: Users, path: '/vendor/customers' },
    { name: 'Sellers', icon: Store, path: '/vendor/sellers' },
    { name: 'Coupons', icon: StarIcon, path: '/vendor/coupons' },
    { name: 'Reviews', icon: MessageSquare, path: '/vendor/reviews' },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-orange-400" />
            <span className="text-xl font-bold">V-stores</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">MENU</p>
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActiveRoute(item.path)
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                    {item.name === 'Products' && (
                      <span className="ml-auto">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">OTHERS</p>
            <ul className="space-y-1">
              {otherItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActiveRoute(item.path)
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-slate-700">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">OTHER APPS</p>
          <div className="flex space-x-2">
            <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              <MessageSquare className="h-4 w-4" />
            </button>
            <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              <StarIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {location.pathname.split('/').pop()?.replace('-', ' ')?.toUpperCase() || 'DASHBOARD'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <RefreshCw className="h-5 w-5" />
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;