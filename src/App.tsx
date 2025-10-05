import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { lazy, Suspense, useEffect } from 'react';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Toaster } from 'react-hot-toast';

// Public Pages
import { Home } from './pages/home';
import { SignIn } from './pages/auth/sign-in';
import { SignUp } from './pages/auth/sign-up';
import { ForgotPassword } from './pages/auth/forgot-password';
import { ResetPassword } from './pages/auth/reset-password';
import { VerifyEmail } from './pages/auth/verify-email';
import { VerifyNotice } from './pages/auth/verify-notice';
import { AboutUs } from './components/AboutUs';
import { Support } from './components/Support';
import { FAQ } from './components/FAQ';
// import { Blog } from './pages/blog';
import { BlogPost } from './pages/blog/[slug]';
import { NotFound } from './pages/error/not-found';
import { ProductDetails } from './pages/shop/[id]';
import { TrackOrder } from './pages/shop/track-order';
import { TrackOrderDetails } from './pages/shop/track-order/[id]';
import { Compare } from './pages/shop/compare';
import { Checkout } from './pages/shop/checkout';

// User Pages (Protected)
import { Dashboard } from './pages/user/dashboard';
import { Orders } from './pages/user/orders';
import { Wishlist } from './pages/user/wishlist';
import { Cards } from './pages/user/cards';
import { History } from './pages/user/history';
import { OrderDetails } from './pages/user/orders/[id]';
import { Settings } from './pages/user/settings';
import { AdminLayout } from './components/layout/AdminLayout';
import { CategoryList } from './pages/admin/CategoryList';
import { CategoryEdit } from './pages/admin/CategoryEdit';
import { OrderList } from './pages/admin/OrderList';
import { OrderDetailss } from './pages/admin/OrderDetails';
import { ProductsPage } from './pages/shop';
import CartPage from './pages/shop/cart';
import Confirmation from './pages/shop/confirm-order';
import ProtectedRoute from './components/ProtectedRoute';
import Blog from './pages/blog';
import { useAuthStore } from './lib/store/useAuthStore';
import api from './lib/axios';
import Cookies from 'js-cookie';
import CategoryPage from './pages/shop/category';
import VendorLayout from './components/vendor/layout/VendorLayout';
import MyStores from './pages/vendor/MyStores';
import VendorOrders from './pages/vendor/VendorOrders';
import SampleDashboard from './pages/vendor/Dashboard';
import CreateStoreForm from './components/vendor/CreateStoreForm';
import ProductsList from './components/vendor/ProductsList';
import ProductForm from './components/vendor/ProductForm';
import MyProducts from './pages/vendor/MyProducts';
import ProfileSettings from './pages/vendor/ProfileSettings';
import BusinessDocs from './pages/vendor/BusinessDocs';
// import ProductsPage from './pages/shop';

// Admin Pages (Lazy Load)
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then(module => ({ default: module.AdminDashboard })));
const Products = lazy(() => import('./pages/admin/Products').then(module => ({ default: module.ProductsPage })));
const Admin_ProductDetails = lazy(() => import('./pages/admin/ProductDetails').then(module => ({ default: module.ProductDetailsPage })));
const ProductCreate = lazy(() => import('./pages/admin/ProductCreate').then(module => ({ default: module.ProductCreate })));
const VendorList = lazy(() => import('./pages/admin/VendorList').then(module => ({ default: module.VendorList })));
const VendorDetails = lazy(() => import('./pages/admin/VendorDetails').then(module => ({ default: module.VendorDetails })));
const CustomerList = lazy(() => import('./pages/admin/CustomerList').then(module => ({ default: module.CustomerList })));
const CustomerDetails = lazy(() => import('./pages/admin/CustomerDetails').then(module => ({ default: module.CustomerDetails })));

// Query Client
const queryClient = new QueryClient();

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isVendorRoute = location.pathname.startsWith('/vendor');
  const { setAuth, logout } = useAuthStore();

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      api
        .get("/accounts/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const user = res.data;
          const refreshToken = Cookies.get("refresh_token");
          setAuth(user, token, refreshToken || "");
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {!isAdminRoute && !isVendorRoute && <Header />} {/* Render header only if not in admin routes */}
      {/* {!isVendorRoute && <Header />} Render header only if not in admin routes */}
      <Suspense fallback={<LoadingSpinner />}>
        <main className="flex-1 bg-white relative">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email/:uidb64/:token" element={<VerifyEmail />} />
            <Route path="/verify-email-notice" element={<VerifyNotice />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faqs" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/track-order/:id" element={<TrackOrderDetails />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/category/:slug" element={<CategoryPage />} />

            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/confirm" element={<Confirmation />} />

            {/* Protected User Routes */}
            <Route element={<ProtectedRoute allowedRoles={['user']} />}>
              <Route path="/user" element={<Dashboard />} />
              <Route path="/user/orders" element={<Orders />} />
              <Route path="/user/orders/:id" element={<OrderDetails />} />
              <Route path="/user/wishlist" element={<Wishlist />} />
              <Route path="/user/cards" element={<Cards />} />
              <Route path="/user/history" element={<History />} />
              <Route path="/user/settings" element={<Settings />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="products/create" element={<ProductCreate />} />
                <Route path="products/:id" element={<Admin_ProductDetails />} />
                <Route path="vendors" element={<VendorList />} />
                <Route path="vendors/:id" element={<VendorDetails />} />
                <Route path="customers" element={<CustomerList />} />
                <Route path="customers/:id" element={<CustomerDetails />} />
                <Route path="categories" element={<CategoryList />} />
                <Route path="categories/:id" element={<CategoryEdit />} />
                <Route path="orders" element={<OrderList />} />
                <Route path="orders/:id" element={<OrderDetailss />} />
              </Route>
            </Route>

            {/* Vendor Routes */}
            <Route element={<ProtectedRoute allowedRoles={['vendor']} />}>
              <Route path="/vendor" element={<VendorLayout />}>
                <Route index element={<Navigate to="/vendor/dashboard" replace />} />
                <Route path="dashboard" element={<SampleDashboard />} />
                <Route path="stores" element={<MyStores />} />
                <Route path="stores/create" element={<CreateStoreForm />} />
                <Route path="stores/:storeId/products" element={<ProductsList />} />
                <Route path="stores/:storeId/products/create" element={<ProductForm />} />
                <Route path="stores/:storeId/products/:productId/edit" element={<ProductForm />} />
                <Route path="products" element={<MyProducts />} />
                <Route path="orders" element={<VendorOrders />} />
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="business-docs" element={<BusinessDocs />} />
              </Route>
            </Route>



            {/* Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Suspense>
      {!isAdminRoute && !isVendorRoute && <Footer />} {/* Render footer only if not in admin routes */}
      {/* {!isVendorRoute && <Footer />} Render footer only if not in admin routes */}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Layout />
          <Toaster position="top-right" />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;