import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  ChevronDown,
  Twitter,
  Facebook,
  Youtube,
  Instagram,
  User,
  Heart,
  Menu,
  X,
} from 'lucide-react';
import Logo from '../../assets/icons/Logo.png';
import { Search } from '../ui/search';
import useCartStore from '../../lib/store/useCartStore';
import { useAuthStore } from '../../lib/store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

interface UserProps {
  username: string;
  email: string;
  avatar: string;
}

const Dropdown: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
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
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleMobileLinkClick = () => {
    setTimeout(() => setIsMenuOpen(false), 100);
  };

  return (
    <header className="bg-[#005792] text-white relative z-50">
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
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link to="/user/wishlist">
              <Heart className="h-6 w-6" />
            </Link>

            <div className="relative" ref={userMenuRef}>
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
                <Dropdown className="w-48">
                  <div className="py-2">
                    {user ? (
                      <>
                        <Link
                          to="/user"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/sign-in"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/sign-up"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
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

      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
              className="fixed top-0 left-0 right-0 bg-white z-50 md:hidden shadow-lg"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-800">Menu</span>
                  <button onClick={() => setIsMenuOpen(false)}>
                    <X className="h-6 w-6 text-gray-700" />
                  </button>
                </div>
                <div className="space-y-4">
                  <Link to="/" className="block py-2 text-gray-700 hover:bg-gray-100" onClick={handleMobileLinkClick}>
                    Home
                  </Link>
                  <Link to="/cart" className="block py-2 text-gray-700 hover:bg-gray-100" onClick={handleMobileLinkClick}>
                    Cart
                  </Link>
                  <Link to="/user/wishlist" className="block py-2 text-gray-700 hover:bg-gray-100" onClick={handleMobileLinkClick}>
                    Wishlist
                  </Link>

                  {user ? (
                    <div className="border-t pt-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold uppercase">
                          {user.username.slice(0, 2)}
                        </div>
                        <span className="text-sm font-bold">{user.username}</span>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="mt-2 block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="border-t pt-4">
                      <Link to="/sign-in" className="block py-2 text-gray-700 hover:bg-gray-100" onClick={handleMobileLinkClick}>
                        Login
                      </Link>
                      <Link to="/sign-up" className="block py-2 text-gray-700 hover:bg-gray-100" onClick={handleMobileLinkClick}>
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};