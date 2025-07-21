export interface VendorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  businessName: string;
  businessType: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorStore {
  id: string;
  name: string;
  description: string;
  address: string;
  email: string;
  phone_number?: string;
  store_logo?: any;
  store_url_alias?: string;
  motor_quotes?: string;
  our_story?: string;
  our_mission?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  vendorId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  brand: string;
  weight: string;
  gender: string;
  sizes: string[];
  colors: string[];
  images: string[];
  storeId: string;
  tagNumber: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VendorOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  products: OrderProduct[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
}

export interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: string;
  brand: string;
  weight: string;
  gender: string;
  sizes: string[];
  colors: string[];
  tagNumber: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}