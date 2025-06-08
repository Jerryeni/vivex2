import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import useWishlistStore from '../../lib/store/useWishlistStore';
import { AnimatePresence, motion } from 'framer-motion';
import { formatCurrency } from '../../lib/utils';

export const WishlistDropdown: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { wishlist, removeFromWishlist } = useWishlistStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-10 right-1 w-[320px] bg-white shadow-xl rounded-md border z-50"
            >
                <div className="p-4">
                    <h3 className="text-sm font-bold text-gray-800 mb-3">Wishlist ({wishlist.length})</h3>

                    {wishlist.length === 0 ? (
                        <p className="text-sm text-gray-500">Your wishlist is empty.</p>
                    ) : (
                        <div className="space-y-4 max-h-[300px] overflow-y-auto">
                            {wishlist.map((item) => (
                                <div key={item.id} className="flex justify-between items-start">
                                    <img
                                        src={item.product?.images?.[0]?.image_url || '/placeholder.jpg'}
                                        alt={item.product?.name}
                                        className="w-14 h-14 rounded object-cover"
                                    />
                                    <div className="ml-3 flex-1">
                                        <h4 className="text-sm font-semibold text-gray-800">{item.product?.name}</h4>
                                        <p className="text-xs text-gray-600">
                                            {formatCurrency(item.product?.price)}
                                        </p>
                                    </div>
                                    <button onClick={() => removeFromWishlist(item.id)}>
                                        <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {wishlist.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <Link
                                to="/wishlist"
                                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded"
                                onClick={onClose}
                            >
                                VIEW WISHLIST
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
