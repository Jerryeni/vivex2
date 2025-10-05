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
  selling_price?: any;
  rating: number;
  originalPrice: any;
  id: any;
  name: string;
  description: string;
  price: number;
  discount_price: number;
  discount_rate: number;
  promo_code: string;
  is_promo_code_applicable: boolean;
  is_negotiable: boolean;
  is_hidden: boolean;
  is_archived: boolean;
  is_deleted: boolean;
  is_hot: boolean;
  is_featured: boolean;
  is_best_deal: boolean;
  is_top_rated: boolean;
  is_new_arrival: boolean;
  is_flash_sale: boolean;
  is_best_seller: boolean;
  images: {
    is_display_photo: unknown;
    base64_product_image: any; id: number; image_url: string 
}[];
  variations: ProductVariation[];
  category: any;
  subcategory: any;
  image_files: File[];
  remove_image_ids: number[];
  average_rating?: number;
  reviews?: number;
}

export interface ProductVariation {
  color: string;
  size: string;
  quantity: number;
}
export interface VendorOrder {
  id: string;
  order_tracking_id: string;
  user: string;
  items: Product[];
  total_amount: number;
  payment_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
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
  // discount: number;
  discount_price?: number;
  discount_rate?: number;
  promo_code?: string;
  is_promo_code_applicable: boolean;
  is_negotiable: boolean;
  is_hidden: boolean;
  is_archived: boolean;
  is_deleted: boolean;
  is_hot: boolean;
  is_featured: boolean;
  is_best_deal: boolean;
  is_top_rated: boolean;
  is_new_arrival: boolean;
  is_flash_sale: boolean;
  is_best_seller: boolean;
  category_id: number;
  subcategory_id: number;
  variations: string[]; 
  images: string[];
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}