import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Calendar } from 'lucide-react';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { Input } from '../../../components/ui/input';
import { formatCurrency } from '../../../lib/utils';

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  date: string;
  badge?: 'HOT' | 'BEST DEALS' | 'SOLD OUT' | '25% OFF' | 'SALE';
}

const products: Product[] = [
  // 17 OCT, 2020
  {
    id: '1',
    title: 'TOZO T6 True Wireless Earbuds Bluetooth Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    price: 75.00,
    rating: 4.5,
    reviews: 735,
    date: '17 OCT, 2020',
    badge: 'HOT',
  },
  {
    id: '2',
    title: 'Samsung Electronics Samsung Galaxy S23 5G',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    price: 2300.00,
    rating: 4.8,
    reviews: 892,
    date: '17 OCT, 2020',
  },
  {
    id: '3',
    title: 'Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/60Hz)',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
    price: 29.99,
    rating: 4.9,
    reviews: 423,
    date: '17 OCT, 2020',
    badge: 'BEST DEALS',
  },
  {
    id: '4',
    title: 'Portable Working Machine, High-capacity Mode',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300',
    price: 199.99,
    rating: 4.7,
    reviews: 156,
    date: '17 OCT, 2020',
  },
  // 24 MAY, 2020
  {
    id: '5',
    title: 'Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/60Hz)',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
    price: 29.99,
    rating: 4.6,
    reviews: 325,
    date: '24 MAY, 2020',
    badge: 'BEST DEALS',
  },
  {
    id: '6',
    title: 'Portable Working Machine, High-capacity Mode',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300',
    price: 199.99,
    rating: 4.7,
    reviews: 156,
    date: '24 MAY, 2020',
  },
  {
    id: '7',
    title: 'TOZO T6 True Wireless Earbuds Bluetooth Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    price: 75.00,
    rating: 4.5,
    reviews: 735,
    date: '24 MAY, 2020',
    badge: 'HOT',
  },
  {
    id: '8',
    title: 'Dell Deskjet F2650/7450 All-in-One Computer Monitor',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
    price: 249.99,
    rating: 4.6,
    reviews: 325,
    date: '24 MAY, 2020',
  },
  // 21 SEP, 2020
  {
    id: '9',
    title: 'Wired Over-Ear Gaming Headphones with USB',
    image: 'https://images.unsplash.com/photo-1505740106531-4243f3831c78?w=300',
    price: 149.99,
    rating: 4.4,
    reviews: 277,
    date: '21 SEP, 2020',
  },
  {
    id: '10',
    title: 'Polaroid 32-Inch Photo/Video Smart TV with Deluxe Digital Casting',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300',
    price: 399.99,
    rating: 4.2,
    reviews: 277,
    date: '21 SEP, 2020',
    badge: '25% OFF',
  },
  {
    id: '11',
    title: 'Dell Deskjet F2650/7450 All-in-One Computer Monitor',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
    price: 249.99,
    rating: 4.6,
    reviews: 325,
    date: '21 SEP, 2020',
  },
  {
    id: '12',
    title: 'Polaroid 32-Inch Photo/Video Smart TV with Deluxe Digital Casting',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300',
    price: 399.99,
    rating: 4.2,
    reviews: 277,
    date: '21 SEP, 2020',
    badge: '25% OFF',
  },
  // 22 OCT, 2020
  {
    id: '13',
    title: '4K UHD LED Smart TV with Chromecast Built-in',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300',
    price: 299.99,
    rating: 4.8,
    reviews: 156,
    date: '22 OCT, 2020',
    badge: 'SALE',
  },
];

export function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isHistoryEnabled, setIsHistoryEnabled] = useState(true);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !selectedDate || product.date === selectedDate;
    return matchesSearch && matchesDate;
  });

  const uniqueDates = Array.from(new Set(products.map(p => p.date))).sort().reverse();

  const getBadgeStyle = (badge: Product['badge']) => {
    switch (badge) {
      case 'HOT':
        return 'bg-red-500 text-white';
      case 'BEST DEALS':
        return 'bg-blue-500 text-white';
      case 'SOLD OUT':
        return 'bg-gray-400 text-white';
      case '25% OFF':
        return 'bg-yellow-500 text-white';
      case 'SALE':
        return 'bg-green-500 text-white';
      default:
        return '';
    }
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
                  <Link to="/dashboard" className="hover:text-gray-700">User Account</Link>
                  <span>/</span>
                  <span className="text-gray-900">Browsing History</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h1 className="text-lg font-semibold">Browsing History</h1>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Turn Browsing History on/off
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isHistoryEnabled}
                        onChange={(e) => setIsHistoryEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F86F03]"></div>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search in browsing history"
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="relative w-full sm:w-48">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <select
                      className="w-full h-10 pl-10 pr-4 border rounded-md"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option value="">DD/MM/YYYY</option>
                      {uniqueDates.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Group products by date */}
                {Object.entries(
                  filteredProducts.reduce((acc, product) => {
                    const date = product.date;
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(product);
                    return acc;
                  }, {} as Record<string, Product[]>)
                ).map(([date, dateProducts]) => (
                  <div key={date} className="mb-12">
                    <h2 className="text-sm font-medium text-gray-900 mb-6">{date}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {dateProducts.map((product) => (
                        <div key={product.id} className="group">
                          <div className="relative mb-3">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full aspect-square object-cover rounded-lg"
                            />
                            {product.badge && (
                              <span
                                className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${getBadgeStyle(
                                  product.badge
                                )}`}
                              >
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-yellow-400 mb-1.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'fill-current'
                                      : 'fill-none'
                                  }`}
                                />
                              ))}
                              <span className="text-gray-500 text-sm">
                                ({product.reviews})
                              </span>
                            </div>
                            <h4 className="text-sm text-gray-900 line-clamp-2 mb-1.5">
                              {product.title}
                            </h4>
                            <p className="text-[#F86F03] font-semibold">
                              {formatCurrency(product.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No browsing history found.</p>
                  </div>
                )}

                {filteredProducts.length > 0 && (
                  <div className="flex justify-center mt-8">
                    <button className="text-gray-500 hover:text-[#F86F03] flex items-center gap-2">
                      <span className="text-sm">LOAD MORE</span>
                    </button>
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