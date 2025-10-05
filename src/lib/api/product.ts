import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../axios';
import Cookies from 'js-cookie';
import { ProductFormData } from '../../types';
import toast from 'react-hot-toast';

interface ProductQueryParams {
  search?: string;
  ordering?: string;
  page?: number;
  category?: string;
}

interface UpdateProductParams {
  id: string | number;
  updateData: Record<string, any>;
}

interface UpdateParams {
  id: string | number;
  updateData: Record<string, any>;

}
export interface ShippingAddress {
  id?: number;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

interface Address {
  id?: number;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}
export interface Subcategory {
  id: number;
  name: string;
  description?: string | null;
}


export const getAuthToken = () => Cookies.get('access_token');
 
// const fetchWithAuth = async (url: string, params = {}) => {
//   const token = getAuthToken();
//   const queryString = new URLSearchParams(params).toString();
//   const fullUrl = `${url}${queryString ? '?' + queryString : ''}`;

//   const { data } = await api.get(fullUrl, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   console.log(`Fetched data from ${fullUrl}:`, data);
//   return data;
// };

const fetchWithAuth = async (url: string, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${url}${queryString ? '?' + queryString : ''}`;
  const { data } = await api.get(fullUrl);
  return data;
};

export const useProducts = ({ search, ordering, page }: ProductQueryParams = {}) => {
  return useQuery({
    queryKey: ['products', search, ordering, page],
    queryFn: () => fetchWithAuth('/products/products/'),
  });
};

export const useProduct = (id: any) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchWithAuth(`/products/products/${id}/`),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (productData: ProductFormData) => {
      const formData = new FormData();

      // Convert fields to valid FormData types
      Object.entries(productData).forEach(([key, value]) => {
        if (value === undefined || value === null) return; // Skip undefined/null values

        if (key === "image_files") return; // Handled separately below
        if (key === "remove_image_ids") return; // Handled separately below

        if (typeof value === "number" || typeof value === "boolean") {
          formData.append(key, value.toString()); // Convert numbers and booleans to string
        } else if (typeof value === "string") {
          formData.append(key, value); // Append string as-is
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === "number" || typeof item === "boolean") {
              formData.append(`${key}[${index}]`, item.toString()); // Convert numbers/booleans
            } else if (typeof item === "string") {
              formData.append(`${key}[${index}]`, item); // Append strings
            } else if (item instanceof File) {
              formData.append(`${key}[${index}]`, item); // Append files
            } else if (typeof item === "object") {
              formData.append(`${key}[${index}]`, JSON.stringify(item)); // Convert objects to JSON
            }
          });
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value)); // Convert objects to JSON
        } else {
          console.warn(`Skipping unsupported field: ${key} =`, value);
        }
      });

      // Append image files separately
      if (Array.isArray(productData.image_files)) {
        productData.image_files.forEach((file) => {
          if (file instanceof File) {
            formData.append("image_files", file);
          } else {
            console.warn("Skipping invalid file:", file);
          }
        });
      }

      // Append remove_image_ids separately
      if (Array.isArray(productData.remove_image_ids)) {
        productData.remove_image_ids.forEach((id) => {
          formData.append("remove_image_ids[]", id.toString());
        });
      }

      // Debugging: Log formData contents
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Make API request
      const { data } = await api.post("/products/products/", formData);
      console.log("Created product:", data);
      return data;
    },
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({ id, updateData }: UpdateProductParams) => {
      const token = getAuthToken();
      const { data } = await api.put(`/products/products/${id}/`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Updated product ${id}:`, data);
      return data;
    },
  });
};

export const usePatchProduct = () => {
  return useMutation({
    mutationFn: async ({ id, updateData }: UpdateProductParams) => {
      const token = getAuthToken();
      const { data } = await api.patch(`/products/products/${id}/`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Patched product ${id}:`, data);
      return data;
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (id) => {
      const token = getAuthToken();
      await api.delete(`/products/products/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Deleted product ${id}`);
    },
  });
};

export const useArchiveProduct = () => {
  return useMutation({
    mutationFn: async (id) => {
      const token = getAuthToken();
      const { data } = await api.post(`/products/products/${id}/archive/`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Archived product ${id}:`, data);
      return data;
    },
  });
};

export const useDeleteProductImage = () => {
  return useMutation({
    mutationFn: async ({ id, image_id }: { id: string | number; image_id: string | number }) => {
      const token = getAuthToken();
      await api.delete(`/products/products/${id}/delete-image/${image_id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Deleted image ${image_id} from product ${id}`);
    },
  });
};


export const useRestoreProduct = () => {
  return useMutation({
    mutationFn: async (id) => {
      const token = getAuthToken();
      const { data } = await api.post(`/products/products/${id}/restore/`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Restored product ${id}:`, data);
      return data;
    },
  });
};

export const useHideProduct = () => {
  return useMutation({
    mutationFn: async (id) => {
      const token = getAuthToken();
      const { data } = await api.post(`/products/products/${id}/hide/`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Hidden product ${id}:`, data);
      return data;
    },
  });
};

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

export const useSearchProducts = ({ search = "", ordering, page }: ProductQueryParams = {}) => {
  return useQuery({
    queryKey: ["search-products", search, ordering, page],
    queryFn: async () => {
      const response = await fetchWithAuth("/products/products/search/", { search, ordering, page });
      console.log("API Response:", response); // Debugging
      return response;
    },
    enabled: !!search, // Only run the query if there is a search term
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/products/categories/');
      console.log('Fetched categories:', data);
      return data.results;
    },
  });
};

export const useCategory = (id: any) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => fetchWithAuth(`/products/categories/${id}/`),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (categoryData: Record<string, any>) => {
      const token = getAuthToken();
      const { data } = await api.post('/products/categories/', categoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Created category:', data);
      return data;
    },
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: async ({ id, updateData }: UpdateProductParams) => {
      const token = getAuthToken();
      const { data } = await api.put(`/products/categories/${id}/`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Updated category ${id}:`, data);
      return data;
    },
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (id) => {
      const token = getAuthToken();
      await api.delete(`/products/categories/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Deleted category ${id}`);
    },
  });
};

export const useSubcategories = (categoryId: string) => {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: async () => {
      const { data } = await api.get(`/products/subcategories/`);
      console.log('Fetched subcategories:', data);
      return data.results;
    },
  });
};

export const useSubcategory = (id: any) => {
  return useQuery({
    queryKey: ['subcategory', id],
    queryFn: () => fetchWithAuth(`/products/subcategories/${id}/`),
    enabled: !!id,
  });
};

export const useCreateSubcategory = () => {
  return useMutation({
    mutationFn: async (subcategoryData: Record<string, any>) => {
      const token = getAuthToken();
      const { data } = await api.post('/products/subcategories/', subcategoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Created subcategory:', data);
      return data;
    },
  });
};

export const useUpdateSubcategory = () => {
  return useMutation({
    mutationFn: async ({ id, updateData }: UpdateParams) => {
      const token = getAuthToken();
      const { data } = await api.put(`/products/subcategories/${id}/`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Updated subcategory ${id}:`, data);
      return data;
    },
  });
};

export const usePatchSubcategory = () => {
  return useMutation({
    mutationFn: async ({ id, updateData }: UpdateParams) => {
      const token = getAuthToken();
      const { data } = await api.patch(`/products/subcategories/${id}/`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Patched subcategory ${id}:`, data);
      return data;
    },
  });
};

export const useDeleteSubcategory = () => {
  return useMutation({
    mutationFn: async (id) => {
      const token = getAuthToken();
      await api.delete(`/products/subcategories/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Deleted subcategory ${id}`);
    },
  });
};

// ✅ Fetch Products Under a Subcategory
// export const useSubcategoryProducts = () => {
//   return useQuery({
//     queryKey: ['subcategory-products'],
//     queryFn: async () => {
//       const token = getAuthToken();
//       const { data } = await api.get('/products/subcategories/products/', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log('Fetched subcategory products:', data);
//       return data.results;
//     },
//   });
// };
export const useSubcategoriesByCategory = (categoryId: any | null) => {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      // const token = getAuthToken();
      const { data } = await api.get(`/products/categories/${categoryId}/subcategories/`);
      return data.data || data;
    },
    enabled: !!categoryId,
  });
};


export const useSubcategoryProducts = (subcategoryId: string) => {
  return useQuery({
    queryKey: ['subcategory-products', subcategoryId],
    queryFn: async () => {
      if (!subcategoryId) return [];
      // const token = getAuthToken();
      const { data } = await api.get('/products/subcategories/products', {
        // headers: { Authorization: `Bearer ${token}` },
        params: { subcategory_id: subcategoryId },
      });
      console.log('Fetched subcategory products:', data);
      return data.data.slice(0, 4); // Limit to 4 items here
    },
    enabled: !!subcategoryId,
  });
};

export const getSubcategoriesByCategoryId = async (categoryId: number): Promise<Subcategory[]> => {
  const response = await api.get(`/products/categories/${categoryId}/subcategories/`);
  return response.data;
};

export const useSubcategoryByCategoryId = (categoryId: number | undefined) => {
  return useQuery<Subcategory[]>({
    queryKey: ['subcategories', categoryId],
    queryFn: () => getSubcategoriesByCategoryId(categoryId!),
    enabled: !!categoryId, // avoid query firing with undefined
  });
};


export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData: Record<string, any>) => {
      const token = getAuthToken();

      const { data } = await api.post('/products/my-orders/', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Created order:', data);

      const orderId = data?.data?.order?.id;
      const paymentLink = data?.data?.payment_link;

      if (!orderId || !paymentLink) {
        throw new Error('Missing order ID or payment link.');
      }
      
      // ✅ Set the order ID in a cookie for use after payment
      Cookies.set('order_id', orderId.toString(), { expires: 1 / 48 }); // 30 minutes

      // ✅ Redirect to Flutterwave payment page
      window.location.href = paymentLink;

      return data;
    },
  });
};

// GET /products/orders/{id}/ (products_orders_read)
// export const useOrder = (id: any) => {
//   return useQuery({
//     queryKey: ['order', id],
//     queryFn: () => fetchWithAuth(`/products/orders/${id}/`),
//     enabled: !!id,
//   });
// };

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const token = getAuthToken();
      const { data } = await api.get('/products/my-orders/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched orders:', data);
      return data.results;
    },
  });
};

export const useOrder = (id:any) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const token = getAuthToken();
      const { data } = await api.get(`/products/my-orders/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched oeder details:', data);
      return data;
    },
  });
};



// PUT /products/orders/{id}/ (products_orders_update)
export const useUpdateOrder = () => {
  return useMutation({
    mutationFn: async ({ id, updateData }: UpdateParams) => {
      const token = getAuthToken();
      const { data } = await api.put(`/products/my-orders/${id}/`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Updated order ${id}:`, data);
      return data;
    },
  });
};

// PATCH /products/orders/{id}/ (products_orders_partial_update)
export const usePatchOrder = () => {
  return useMutation({
    mutationFn: async ({ id, updateData }: UpdateParams) => {
      const token = getAuthToken();
      const { data } = await api.patch(`/products/my-orders/${id}/`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Patched order ${id}:`, data);
      return data;
    },
  });
};

// export const useTrackOrder = (orderTrackingId: string) => {
//   return useQuery({
//     queryKey: ['track-order', orderTrackingId],
//     queryFn: async () => {
//       const { data } = await api.get(`/products/orders/treack-order`, {
//         params: {
//           'order-tracking-id': orderTrackingId,
//         },
//       });
//       return data.data;
//     },
//     enabled: !!orderTrackingId, // only run if ID is present
//   });
// };
// export const useOrderTracking = (id: string) => {
//   return useQuery({
//     queryKey: ['order-tracking', id],
//     queryFn: async () => {
//       const token = getAuthToken();
//       const { data } = await api.get(`/products/orders/treack-order`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log('Fetched oeder details:', data);
//       return data;
//     },
//   });
// };



// Shipping Address Hook

const fetchOrderTracking = async (orderTrackingId: string) => {
  const token = getAuthToken();

  const { data } = await api.get('/products/my-orders/track-order/', {
    params: { 'order-tracking-id': orderTrackingId }, // ✅ as query param
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useTrackOrder = () => {
  return useMutation({
    mutationFn: (orderTrackingId: string) => fetchOrderTracking(orderTrackingId),
  });
};



// Payment Hook
export const useCreatePayment = () => {
  return useMutation({
    mutationFn: async (paymentData: Record<string, any>) => {
      const token = getAuthToken();
      const { data } = await api.post("/transaction/payment/", paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Payment processed:", data);
      return data;
    },
  });
};

export const useBrowsingHistory = () => {
  return useQuery({
    queryKey: ['browsing-history'],
    queryFn: async () => {
      const token = getAuthToken();
      const { data } = await api.get('/products/products/browsing-history/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched subcategory products:', data);
      return data?.data;
    },
  });
};

// GET all user shipping addresses
export const useShippingAddresses = () => {
  return useQuery<ShippingAddress[]>({
    queryKey: ['user-shipping-address'],
    queryFn: async () => {
      const { data } = await api.get('/products/address-book/');
      console.log('Fetched user shipping addresses:', data);
      console.log('Fetched user shipping addresses:', data);
      return data.results;
    },
  });
};

// GET a specific address by ID
export const useShippingAddress = (id: number | string) => {
  return useQuery<ShippingAddress>({
    queryKey: ['user-shipping-address', id],
    queryFn: async () => {
      const { data } = await api.get(`/products/address-book/${id}/`);
      return data;
    },
    enabled: !!id,
  });
};

// CREATE a new shipping address
// export const useCreateShippingAddress = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: Omit<ShippingAddress, 'id'>) => {
//       const res = await api.post('/products/user-shipping-address/', data);
//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success('Shipping address added!');
//       queryClient.invalidateQueries(['user-shipping-address']);
//     },
//     onError: () => {
//       toast.error('Failed to add shipping address.');
//     },
//   });
// };

// export const useCreateShippingAddress = () => {
//   return useMutation({
//     mutationFn: async (shippingData: Record<string, any>) => {
//       const token = getAuthToken();
//       console.log(getAuthToken());
//       const { data } = await api.post("/products/address-book/", shippingData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Shipping address added:", data);
//       return data;
//     },
//   });
// };

// UPDATE full shipping address (PUT)
// export const useUpdateShippingAddress = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, updatedData }: { id: number | string; updatedData: ShippingAddress }) => {
//       const res = await api.put(`/products/address-book/${id}/`, updatedData);
//       return res.data;
//     },
//     onSuccess: (_, { id }) => {
//       toast.success('Shipping address updated!');
//     },
//     onError: () => {
//       toast.error('Failed to update shipping address.');
//     },
//   });
// };

// PARTIAL update (PATCH)
export const usePatchShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, patchData }: { id: number | string; patchData: Partial<ShippingAddress> }) => {
      const res = await api.patch(`/products/address-book/${id}/`, patchData);
      return res.data;
    },
    onSuccess: (_, { id }) => {
      toast.success('Shipping address partially updated!');
    },
    onError: () => {
      toast.error('Failed to partially update address.');
    },
  });
};

// Full update (PUT)
// export const usePutShippingAddress = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, patchData }: { id: number | string; patchData: Partial<ShippingAddress> }) => {
//       const res = await api.put(`/products/address-book/${id}/`, patchData);
//       return res.data;
//     },
//     onSuccess: (_, { id }) => {
//       toast.success('Shipping address partially updated!');
//     },
//     onError: () => {
//       toast.error('Failed to partially update address.');
//     },
//   });
// };

// // DELETE shipping address
// export const useDeleteShippingAddress = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: number | string) => {
//       await api.delete(`/products/address-book/${id}/`);
//       return id;
//     },
//     onSuccess: (deletedId) => {
//       toast.success('Shipping address deleted!');
//     },
//     onError: () => {
//       toast.error('Failed to delete shipping address.');
//     },
//   });
// };

// Full update (PUT)
export const useUpdateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedData }: { id: string; updatedData: Address }) => {
      const res = await api.put(`/products/address-book/${id}/`, updatedData);
      return res.data;
    },
    onSuccess: (data, { id }) => {
      toast.success('Shipping address updated!');
    },
    onError: (error) => {
      console.error('Update error:', error);
      toast.error('Failed to update shipping address.');
    },
  });
};



// CREATE new address
export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAddress: Omit<Address, 'id'>) => {
      const res = await api.post('/products/address-book/', newAddress);
      return res.data;
    },
    onSuccess: () => {
      toast.success('New address created!');
    },
    onError: (error) => {
      console.error('Create error:', error);
      toast.error('Failed to create new address.');
    },
  });
};

// DELETE shipping address
export const useDeleteShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/products/address-book/${id}/`);
      return id;
    },
    onSuccess: (deletedId) => {
      toast.success('Address deleted!');
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast.error('Failed to delete address.');
    },
  });
};