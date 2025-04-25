import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ChevronDown, Twitter, Facebook, Youtube, Instagram, User, Heart, Menu, X, Eye } from 'lucide-react';
import Logo from '../../assets/icons/Logo.png';
import { Search } from '../ui/search';
import useCartStore from '../../lib/store/useCartStore';
import { useAuthStore } from '../../lib/store/useAuthStore';

interface UserProps {
  username: string;
  email: string;
  avatar: string;
}

const Dropdown: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg z-50 ${className}`}>
      {children}
    </div>
  );
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuthStore();
  const { cart } = useCartStore();

  console.log('Header:', { user, cart });

  return (
    <header className="bg-[#005792] text-white">
      <div className="py-4 border-b border-gray-400/50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="text-sm">Welcome to Vivian's online E-Commerce store.</span>
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm">Follow us:</span>
            <Twitter className="h-4 w-4" />
            <Facebook className="h-4 w-4" />
            <Youtube className="h-4 w-4" />
            <Instagram className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="Vivian's Store" className="h-10" />
          </Link>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden md:flex flex-1 mx-4">
            <Search placeholder="Search for products..." className="w-full" />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className='relative'>
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link to="/wishlist"><Heart className="h-6 w-6" /></Link>

            <div className="relative" onMouseLeave={() => setShowUserMenu(false)}>
              <button
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="focus:outline-none flex items-center space-x-2"
              >
                {user ? (
                  <>
                    <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold uppercase">
                      {user.username.slice(0, 2)}
                    </div>
                    <span>{user.username}</span>
                  </>
                ) : (
                  <User className="h-6 w-6" />
                )}
                <ChevronDown className="h-4 w-4" />
              </button>

              {showUserMenu && (
                <Dropdown className="w-48" >
                  <div className="py-2" onClick={() => setShowUserMenu(false)}>
                    {user ? (
                      <>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Profile
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/sign-in" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Login
                        </Link>
                        <Link to="/sign-up" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white transition-transform transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden z-50`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          <div className="space-y-4">
            <Link to="/" className="block py-2 text-gray-700 hover:bg-gray-100">Home</Link>
            <Link to="/cart" className="block py-2 text-gray-700 hover:bg-gray-100">Cart</Link>
            <Link to="/wishlist" className="block py-2 text-gray-700 hover:bg-gray-100">Wishlist</Link>

            {user ? (
              <div className="border-t pt-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold uppercase">
                    {user.username.slice(0, 2)}
                  </div>
                  <span className="text-sm font-bold">{user.username}</span>
                </div>
                <button onClick={logout} className="mt-2 block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
              </div>
            ) : (
              <div className="border-t pt-4">
                <Link to="/login" className="block py-2 text-gray-700 hover:bg-gray-100">Login</Link>
                <Link to="/register" className="block py-2 text-gray-700 hover:bg-gray-100">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};