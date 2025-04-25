import { create } from 'zustand';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../axios';
import Cookies from 'js-cookie';

interface ProductQueryParams {
  search?: string;
  ordering?: string;
  page?: number;
  category?: string;
}

const getAuthToken = () => Cookies.get('access_token');

const fetchWithAuth = async (url: string, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${url}${queryString ? '?' + queryString : ''}`;
  const { data } = await api.get(fullUrl);
  return data;
};

export const useProductStore = create((set) => ({
  products: [],
  categories: [],
  subcategories: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchWithAuth('/products/products/');
      set({ products: data.results, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const token = getAuthToken();
      const { data } = await api.get('/products/categories/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ categories: data.results, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchSubcategories: async () => {
    set({ loading: true, error: null });
    try {
      const token = getAuthToken();
      const { data } = await api.get('/products/subcategories/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ subcategories: data.results, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

const useFilteredProducts = (endpoint: string) => {
  return useQuery({
    queryKey: ['products', endpoint],
    queryFn: () => fetchWithAuth(`/products/products/${endpoint}/`),
  });
};

export const useBestDealProducts = () => useFilteredProducts('best-deal');
export const useBestSellerProducts = () => useFilteredProducts('best-seller');
export const useFeaturedProducts = () => useFilteredProducts('featured');
export const useFlashSaleProducts = () => useFilteredProducts('flash-sale');
export const useHotProducts = () => useFilteredProducts('hot');
export const useNewArrivals = () => useFilteredProducts('new-arrivals');
export const useTopRatedProducts = () => useFilteredProducts('top-rated');
export const useVendorProducts = () => useFilteredProducts('vendor-products');

export const useSearchProducts = ({ search, ordering, page }: ProductQueryParams = {}) => {
  return useQuery({
    queryKey: ['search-products', search, ordering, page],
    queryFn: () => fetchWithAuth('/products/products/search/', { search, ordering, page }),
  });
};
