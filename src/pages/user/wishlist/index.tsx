import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { formatCurrency } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';

interface WishlistItem {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  stock: 'IN STOCK' | 'OUT OF STOCK';
}

const wishlistItems: WishlistItem[] = [
  {
    id: '1',
    title: 'Bose Sport Earbuds - Wireless Earphones, Bluetooth In Ear Headphones for Workout and Running',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    price: 99.99,
    originalPrice: 129.99,
    stock: 'IN STOCK',
  },
  {
    id: '2',
    title: 'Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    price: 2300.00,
    stock: 'IN STOCK',
  },
  {
    id: '3',
    title: 'Portable Working Machine, 1TB capacity Model HNMM-GM',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300',
    price: 75.00,
    stock: 'IN STOCK',
  },
  {
    id: '4',
    title: 'TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch Control with Wireless Charging Case IPX8 Waterproof Stereo',
    image: 'https://images.unsplash.com/photo-1505740106531-4243f3831c78?w=300',
    price: 250.00,
    originalPrice: 299.99,
    stock: 'OUT OF STOCK',
  },
  {
    id: '5',
    title: 'Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart Home Camera with Color Night Vision, 2-Way Audio',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
    price: 1499.99,
    stock: 'IN STOCK',
  },
];

export function Wishlist() {
  const [items, setItems] = useState(wishlistItems);

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Link to="/" className="hover:text-gray-700">Home</Link>
                  <span>/</span>
                  <span className="text-gray-900">Wishlist</span>
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-lg font-semibold mb-6">WISHLIST</h1>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-4 font-medium">PRODUCTS</th>
                        <th className="pb-4 font-medium">PRICE</th>
                        <th className="pb-4 font-medium">STOCK STATUS</th>
                        <th className="pb-4 font-medium text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b last:border-0">
                          <td className="py-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium line-clamp-2">
                                  {item.title}
                                </h3>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex flex-col">
                              <span className="font-semibold">
                                {formatCurrency(item.price)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  {formatCurrency(item.originalPrice)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4">
                            <span
                              className={`inline-block px-2 py-1 rounded text-sm ${
                                item.stock === 'IN STOCK'
                                  ? 'text-green-600 bg-green-50'
                                  : 'text-red-600 bg-red-50'
                              }`}
                            >
                              {item.stock}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                className={item.stock === 'OUT_OF_STOCK' ? 'opacity-50 cursor-not-allowed' : ''}
                                disabled={item.stock === 'OUT_OF_STOCK'}
                              >
                                ADD TO CARD
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {items.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Your wishlist is empty.</p>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        // Navigate to products page
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}