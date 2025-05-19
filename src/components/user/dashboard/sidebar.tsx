import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  ShoppingCart,
  Heart,
  CreditCard,
  Clock,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '../../ui/button';
import { useAuthStore } from '../../../lib/store/useAuthStore';

const navItems = [
  { to: '/user', label: 'Dashboard', icon: Home },
  { to: '/user/orders', label: 'Order History', icon: ShoppingCart },
  { to: '/user/wishlist', label: 'Wishlist', icon: Heart },
  // { to: '/user/cards', label: 'Cards & Address', icon: CreditCard },
  { to: '/user/history', label: 'Browsing History', icon: Clock },
  { to: '/user/settings', label: 'Settings', icon: Settings },
];

export function DashboardSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();  

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* Sidebar Wrapper */}
      <div className={`fixed inset-0 z-40 flex lg:relative ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
        
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className="bg-white w-64 h-full shadow-lg p-6 relative z-50 lg:relative lg:h-auto"
        >
          
          <div className="flex justify-end lg:hidden mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={closeSidebar}
              className="rounded-md shadow-md"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                  location.pathname === to
                    ? 'text-[#F86F03] bg-[#F86F03]/10'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={closeSidebar} 
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
            <button onClick={logout} className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md w-full">
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </button>
          </nav>
        </div>
      </div>

      
      {!isSidebarOpen && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-32 left-5 z-50 rounded-md shadow-md lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}