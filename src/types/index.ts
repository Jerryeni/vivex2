export interface User {
  is_vendor: any;
  id: string;
  email: string;
  emailVerified: boolean;
  username: string;
  role: 'user' | 'vendor' | 'admin';
  createdAt: string;
  
}

export interface Product {
  selling_price?: any;
  rating: number;
  originalPrice: any;
  id: number;
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
  category: Category;
  subcategory: Subcategory;
  image_files: File[];
  remove_image_ids: number[];
  average_rating?: number;
  reviews?: number;
}

export interface ProductVariation {
  id: number;
  color: string;
  size: string;
  quantity: number;
}

export interface Category {
  name: string;
  description?: string;
}

export interface Subcategory {
  name: string;
  description?: string;
  category: Category;
}

export interface ProductFormData {
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
  variations: ProductVariation[];
  category: Category;
  subcategory: Subcategory;
  image_files: File[];
  remove_image_ids: number[];
  
}

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  checked?: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface CategoryFilter {
  name: string;
  count: number;
  subcategories?: CategoryFilter[];
}

export interface ProductDetails extends Product {
  sku: string;
  brand: string;
  availability: 'in-stock' | 'out-of-stock';
  colors: string[];
  sizes: string[];
  memory: string[];
  storage: string[];
  description: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  specifications: Record<string, string>;
  shipping: {
    courier: string;
    time: string;
    cost: number;
  }[];
  relatedProducts: Product[];
  accessories: Product[];
}

export interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  content: string;
  helpful: number;
  images?: string[];
}

// export interface CartItem extends Product {
//   quantity: number;
// }
export interface CartItem {
  id: string;
  productId: number;
  quantity: number;
  price: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
}