import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Edit,
  Plane,
  ReceiptText,
  PackageOpen,
  User,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { formatCurrency } from '../../../lib/utils';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { useAuthStore } from '../../../lib/store/useAuthStore';
import { useBrowsingHistory, useOrders } from '../../../lib/api/product';
import { Modal } from '../../../components/ui/general-modal';
import { useProfilePic, useUpdateUser, useUploadProfilePic } from '../../../lib/api/auth';
import { ProductSkeleton } from '../../../components/ui/ProductSkeleton';
import { OptimizedImage } from '../../../components/ui/OptimizedImage';




// Helper to color status badge
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};


export function Dashboard() {
  const [editAccountOpen, setEditAccountOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();

  // if (!user) return <div>Loading user data...</div>;

  // const [showEmailAlert, setShowEmailAlert] = useState(!user.email_verified);
  const { data: browsingHistory, isLoading, error } = useBrowsingHistory();
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useOrders();
  console.log("Orders:", orders);
  console.log("browsingHistory:", browsingHistory);
  const { data: profilePicData } = useProfilePic();
  const { mutate: uploadPic } = useUploadProfilePic();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadPic(file);
  };

  const profilePicUrl = profilePicData?.[0]?.profile_image;


  console.log("User:", user);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    username: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        username: user.username || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateAccount = (e: any) => {
    e.preventDefault();
    updateUser(formData);
    setEditAccountOpen(false);
  };

  const handleUpdateAddress = () => {
    updateUser(formData);
    setEditAddressOpen(false);
  };


  const recentOrders = orders
    ?.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    .slice(0, 3);

  const totalOrders = orders?.length || 0;
  const pendingOrders = orders?.filter((order: { status: string; }) => order?.status === 'pending')?.length || 0;
  const completedOrders = orders?.filter((order: { status: string; }) => order?.status === 'completed')?.length || 0;

  // console.log("Order statuses:", orders.map((o: any) => o.status));

  if (!user) return <ProductSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Main Content */}
          <div className="flex-1">
            {/* {showEmailAlert && !user.email_verified && (
              <div className="bg-red-100 border border-red-400 text-orange-700 px-4 py-3 rounded relative mx-4 mb-4" role="alert">
                <strong className="font-bold">Email not verified!</strong>
                <span className="block sm:inline ml-2">
                  Please verify your email to unlock full access to your account features.
                </span>
                <button
                  onClick={() => setShowEmailAlert(false)}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                  <svg className="fill-current h-6 w-6 text-orange-700" role="button" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
                  </svg>
                </button>
              </div>
            )} */}
            <div className="flex flex-col py-4">
              <p className="text-2xl font-medium">Hello {" "}
                {(user?.first_name && user?.last_name)
                  ? `${user.first_name} ${user.last_name}`
                  : user?.username || 'User'}
              </p>
              <p className="text-black/50 font-light text-sm max-w-md py-2">From your account dashboard. you can easily check & view your Recent Orders, manage your Shipping and Billing Addresses and edit your Password and Account Details.</p>
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
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <div className="relative w-16 h-16">
                          {/* Upload Label wraps the display */}
                          <label htmlFor="profile-upload" className="block w-full h-full cursor-pointer">
                            {profilePicUrl ? (
                              // Show actual image if available
                              <OptimizedImage
                                src={profilePicUrl}
                                alt="Profile"
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            ) : (
                              // Show default user icon
                              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl">
                               <User />
                              </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 hover:opacity-100 transition" />

                            {/* Edit Icon */}
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110.414 16H7v-3.414a2 2 0 01.586-1.414z"
                                />
                              </svg>
                            </div>
                          </label>

                          {/* Hidden File Input */}
                          <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="font-semibold">
                          {(user?.first_name && user?.last_name)
                            ? `${user.first_name} ${user.last_name}`
                            : user?.username || 'User'}
                        </h2>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email: </span>
                      <span className="text-sm text-gray-700">{user.email}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone Number:</span>
                      <span className="text-sm text-gray-500">{user.phone_number}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditAccountOpen(true)}
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
                        <p className="font-semibold">{user.first_name}</p>
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
                      onClick={() => setEditAddressOpen(true)}
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
                        <h3 className="text-lg font-semibold">{totalOrders}</h3>
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
                        <h3 className="text-lg font-semibold">{pendingOrders}</h3>
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
                        <h3 className="text-lg font-semibold">{completedOrders}</h3>
                        <span className="text-gray-600 rounded text-sm">
                          Completed Orders
                        </span>
                      </div>

                    </div>
                  </div>


                </div>
              </div>

              {/* Payment Methods */}
              {/* <div className="bg-white  rounded-lg shadow-sm">
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
                  {cards.map((card, index) => (
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
              </div> */}

              {/* Recent Orders */}
              <div className="bg-white font-light p-6 rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">RECENT ORDER</h3>
                  <a href="/user/orders">
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
                  {ordersLoading ? (
                    <p>Loading...</p>
                  ) : ordersError ? (
                    <p className="text-red-500">Failed to load recent orders.</p>
                  ) : recentOrders?.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-4 font-medium">ORDER ID</th>
                          <th className="pb-4 font-medium">STATUS</th>
                          <th className="pb-4 font-medium">TOTAL</th>
                          <th className="pb-4 font-medium text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order: any) => (
                          <tr key={order.id} className="border-b last:border-0">
                            <td className="py-4">{order.order_tracking_id}</td>
                            <td className="py-4">
                              <span
                                className={`inline-block px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4">
                              {formatCurrency(order.total_amount)} ({order.items?.length ?? 0} Products)
                            </td>
                            <td className="py-4 text-right">
                              <Link to={`/user/orders/${order.id}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-[#F86F03]"
                                >
                                  View Details
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </Link>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No recent orders found.</p>
                  )}
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
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {browsingHistory.map((item: any) => (
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
                </div> */}
              </div>

              {/* Edit Account Modal */}
              <Modal
                isOpen={editAccountOpen}
                onClose={() => setEditAccountOpen(false)}
                title="Edit Account Info"
              >
                <form onSubmit={handleUpdateAccount} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      disabled={isUpdatingUser}
                      className="bg-primary text-white px-4 py-2 rounded"
                    >
                      {isUpdatingUser ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </Modal>

              {/* Edit Address Modal */}
              <Modal
                isOpen={editAddressOpen}
                onClose={() => setEditAddressOpen(false)}
                title="Edit Billing Address"
              >
                <form onSubmit={(e) => { e.preventDefault(); handleUpdateAddress(); }}>
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Full Name</label>
                    <input
                      defaultValue={user.first_name}
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Address</label>
                    <input
                      defaultValue={user.address}
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                  <Button type="submit">Save</Button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}