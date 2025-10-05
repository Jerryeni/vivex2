import axios from 'axios';
import { ApiResponse, CreateProductData, Product, UpdateProductData, VendorOrder, VendorProfile, VendorStore } from '../../types/vendor';
import Cookies from 'js-cookie';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vendorToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
  
    // Attach Auth Token
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  });

export const vendorApi = {
  // Profile endpoints
  getProfile: () => api.get<ApiResponse<VendorProfile>>('/vendor/profile'),
  updateProfile: (data: Partial<VendorProfile>) => 
    api.patch<ApiResponse<VendorProfile>>('/vendor/update-profile/', data),
  
  // Business document endpoints
  getBusinessDoc: () => api.get('/vendor/business-doc-for-vendor-profile/'),
  createBusinessDoc: (data: FormData) => 
    api.post('/vendor/business-doc-for-vendor-profile/', data),
  updateBusinessDoc: (data: FormData) => 
    api.patch('/vendor/business-doc-for-vendor-profile/', data),
  
  // Profile pictures endpoints
  getProfilePics: () => api.get('/vendor/profile-pics-for-vendor-profile/'),
  uploadProfilePic: (data: FormData) => 
    api.post('/vendor/profile-pics-for-vendor-profile/', data),
  updateProfilePic: (data: FormData) => 
    api.patch('/vendor/profile-pics-for-vendor-profile/', data),
  
  // Store endpoints
  getStores: () => api.get<ApiResponse<VendorStore[]>>('/vendor/stores/vendor-stores/'),
  getStore: (id: string) => api.get<ApiResponse<VendorStore>>(`/vendor/stores/vendor-stores/${id}/`),
  createStore: (data: Partial<VendorStore>) => 
    api.post<ApiResponse<VendorStore>>('/vendor/stores/create/', data),
  
  // Product endpoints
  getStoreProducts: (storeId: string) => 
    api.get<ApiResponse<Product[]>>(`/vendor/stores/${storeId}/products-in-store/`),
  getProducts: () => 
    api.get<ApiResponse<Product[]>>(`/vendor/stores/vendor-products/`),
  getProduct: (storeId: string, productId: string) => 
    api.get<ApiResponse<Product>>(`/vendor/stores/${storeId}/products/${productId}/`),
  createProduct: (storeId: string, data: CreateProductData) => 
    api.post<ApiResponse<Product>>(`/vendor/stores/${storeId}/products/create/`, data),
  updateProduct: (storeId: string, productId: string, data: UpdateProductData) => 
    api.patch<ApiResponse<Product>>(`/vendor/stores/${storeId}/products/${productId}/update/`, data),
  deleteProduct: (storeId: string, productId: string) => 
    api.delete(`/vendor/stores/${storeId}/products/${productId}/delete/`),
  
  // Order endpoints
  getOrders: () => api.get<ApiResponse<VendorOrder[]>>('/vendor/my-orders/orders/'),
  getOrder: (id: string) => api.get<ApiResponse<VendorOrder>>(`/vendor/orders/vendor-orders/${id}/`),
  
  // Vendor list endpoint
  getVendorList: () => api.get('/vendor/vendor-list/'),
  
  // Delete vendor
  deleteVendor: (id: string) => api.delete(`/vendor/${id}/`),
};