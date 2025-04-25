import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ShoppingCart,
  Heart,
  CreditCard,
  Clock,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  Edit,
  Plane,
  ReceiptText,
  PackageOpen,
  Delete,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { formatCurrency } from '../../../lib/utils';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { useAuthStore } from '../../../lib/store/useAuthStore';


interface Order {
  id: string;
  status: 'IN PROGRESS' | 'COMPLETED' | 'CANCELLED';
  date: string;
  total: number;
  products: number;
}

interface BrowsingHistoryItem {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestDeal?: boolean;
}

const recentOrders: Order[] = [
  {
    id: '#95459761',
    status: 'IN PROGRESS',
    date: 'Dec 30, 2019 03:18',
    total: 1500,
    products: 3,
  },
  {
    id: '#71667167',
    status: 'COMPLETED',
    date: 'Feb 2, 2019 19:28',
    total: 80,
    products: 1,
  },
  {
    id: '#95214302',
    status: 'CANCELLED',
    date: 'Mar 20, 2019 23:14',
    total: 500,
    products: 3,
  },
  {
    id: '#71667167',
    status: 'COMPLETED',
    date: 'Feb 2, 2019 19:28',
    total: 850,
    products: 1,
  },
  {
    id: '#55746385',
    status: 'COMPLETED',
    date: 'Feb 2, 2019 19:28',
    total: 2300,
    products: 2,
  },
  {
    id: '#55746385',
    status: 'CANCELLED',
    date: 'Dec 30, 2019 07:52',
    total: 70,
    products: 1,
  },
  {
    id: '#67397743',
    status: 'COMPLETED',
    date: 'Dec 7, 2019 23:26',
    total: 520,
    products: 1,
  },
];

const browsingHistory: BrowsingHistoryItem[] = [
  {
    id: '1',
    title: 'TOZO T10 True Wireless Earbud Bluetooth Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    price: 79.99,
    rating: 4.5,
    reviews: 735,
    isNew: true,
  },
  {
    id: '2',
    title: 'Samsung Electronics Samsung Galaxy S23 5G',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    price: 849.99,
    rating: 4.8,
    reviews: 892,
  },
  {
    id: '3',
    title: 'HDMI Cable 18Gbps High Speed',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
    price: 29.99,
    rating: 4.9,
    reviews: 423,
    isBestDeal: true,
  },
  {
    id: '4',
    title: 'Portable Working Machine, High-capacity Mode',
    image: 'https://images.unsplash.com/photo-1505740106531-4243f3831c78?w=300',
    price: 199.99,
    rating: 4.7,
    reviews: 156,
  },
];

// const user = {
//   name: 'Kevin Gilbert',
//   email: 'kevin.gilbert@gmail.com',
//   phone: '+1-202-555-0104',
//   address: 'East Town East Word No 54, Road No. 03, Sector DOHS, Plot No. 50, Dhaka-1205, Bangladesh',
//   totalOrders: 154,
//   pendingOrders: 5,
//   completedOrders: 149,
//   cards: [
//     {
//       type: 'visa',
//       number: '•••• •••• •••• 3814',
//       holder: 'Kevin Gilbert',
//       balance: 95400.00,
//     },
//     {
//       type: 'mastercard',
//       number: '•••• •••• •••• 1761',
//       holder: 'Kevin Gilbert',
//       balance: 87583.00,
//     },
//   ],
// };

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();

  console.log('Dashboard:', { user });
  

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'IN PROGRESS':
        return 'text-blue-600 bg-blue-50';
      case 'COMPLETED':
        return 'text-green-600 bg-green-50';
      case 'CANCELLED':
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Main Content */}
          <div className="flex-1">
            {/* <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xl font-semibold">
                  {user.name[0]}
                </span>
              </div>
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div> */}
            <div className="flex flex-col py-4">
              <p className="text-2xl font-medium">Hello {user.name}</p>
              <p className="text-black/50 font-light text-sm max-w-md">From your account dashboard. you can easily check & view your Recent Orders, manage your Shipping and Billing Addresses and edit your Password and Account Details.</p>
            </div>
            <div className="grid gap-4">

              {/* Account Info */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border shadow-sm">
                  <div className="flex flex-col  justify-start p-4">
                    <h3 className="">ACCOUNT INFO</h3>
                  </div>
                  <div className="h-px bg-gray-200 w-full"></div>
                  <div className="space-y-4 p-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg ">
                          {user.username}
                        </span>
                      </div>
                      <div>
                        <h2 className="font-semibold">{user.username}</h2>
                        <p className="text-sm text-gray-500">Lagos, Nigeria</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email: </span>
                      <span className="text-sm text-gray-700">{user.email}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone Number:</span>
                      <span className="text-sm text-gray-500">{user}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-secondary-100"
                      onClick={() => { }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Account
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="flex flex-col  justify-start p-4">
                    <h3 className="">BILLING ADDRESS</h3>
                  </div>
                  <div className="h-px bg-gray-200 w-full"></div>
                  <div className="space-y-4 p-4">
                    <div className="flex items-center gap-4 mb-2">

                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.address}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email: </span>
                      <span className="text-sm text-gray-700">{user.email}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone Number:</span>
                      <span className="text-sm text-gray-500">{user.phone}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-secondary-100"
                      onClick={() => { }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Address
                    </Button>
                  </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-1 gap-4">
                  <div className=" p-6 bg-secondary-100/10 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 justify-start">
                      <Plane className="h-12 w-12 text-[#F86F03] bg-white " />
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">{user.totalOrders}</h3>
                        <span className="text-gray-600 rounded text-sm">
                          Total Orders
                        </span>
                      </div>

                    </div>
                  </div>

                  <div className="bg-white p-6 bg-primary-100/5 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 justify-start">
                      <ReceiptText className="h-12 w-12 text-[#F86F03] bg-white " />
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">{user.pendingOrders}</h3>
                        <span className="text-gray-600 rounded text-sm">
                          Pending Orders
                        </span>
                      </div>

                    </div>
                  </div>

                  <div className=" p-6 bg-green-500/10 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 justify-start">
                      <PackageOpen className="h-12 w-12 text-[#F86F03] bg-white " />
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">{user.totalOrders}</h3>
                        <span className="text-gray-600 rounded text-sm">
                          Completed Orders
                        </span>
                      </div>

                    </div>
                  </div>

                
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white  rounded-lg shadow-sm">
                <div className="flex p-6 items-center justify-between">
                  <h3 className="font-semibold">PAYMENT OPTION</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#F86F03]"
                    onClick={() => { }}
                  >
                    Add Card
                  </Button>
                </div>
                <div className="h-px bg-gray-200 w-full"></div>
                <div className="grid md:grid-cols-2 gap-4 p-6 relative">
                  {user.cards.map((card, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded text-white ${card.type === 'visa' ? 'bg-[#1B6B93]' : 'bg-[#2B9348]'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm opacity-80">Card Number</p>
                          <p className="font-mono">{card.number}</p>
                        </div>
                        <img
                          src={`/${card.type}.svg`}
                          alt={card.type}
                          className="h-8"
                        />
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm opacity-80">Card Holder</p>
                          <p>{card.holder}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm opacity-80">Balance</p>
                          <p className="font-semibold">
                            {formatCurrency(card.balance)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex w-fit absolute top-12 bg-gray-100 right-[43%] flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent font-light"
                      onClick={() => { }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Cards
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent font-light text-red-500"
                      onClick={() => { }}
                      >
                      <Delete className="h-4 w-4 mr-2" />
                      Delete Cards
                      </Button>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white font-light p-6 rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">RECENT ORDER</h3>
                  <a href="/orders">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#F86F03]"
                    >
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-4 font-medium">ORDER ID</th>
                        <th className="pb-4 font-medium">STATUS</th>
                        <th className="pb-4 font-medium">DATE</th>
                        <th className="pb-4 font-medium">TOTAL</th>
                        <th className="pb-4 font-medium text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b last:border-0">
                          <td className="py-4">{order.id}</td>
                          <td className="py-4">
                            <span
                              className={`inline-block px-2 py-1 rounded text-sm ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4">{order.date}</td>
                          <td className="py-4">
                            {formatCurrency(order.total)} ({order.products}{' '}
                            Products)
                          </td>
                          <td className="py-4 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#F86F03]"
                            >
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Browsing History */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">BROWSING HISTORY</h3>
                  <a href="/history">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#F86F03]"
                      onClick={() => { }}
                    >
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {browsingHistory.map((item) => (
                    <div key={item.id} className="group relative">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        {item.isNew && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                            HOT
                          </span>
                        )}
                        {item.isBestDeal && (
                          <span className="absolute top-2 left-2 0 text-white px-2 py-1 rounded text-xs">
                            BEST DEAL
                          </span>
                        )}
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-1 text-yellow-400 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(item.rating)
                                ? 'fill-orange-400'
                                : 'fill-none'
                                }`}
                            />
                          ))}
                          <span className="text-gray-500 text-sm">
                            ({item.reviews})
                          </span>
                        </div>
                        <h4 className="font-medium text-sm line-clamp-2 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-secondary-100 font-semibold">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}