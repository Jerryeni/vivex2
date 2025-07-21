import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { vendorApi } from '../services/api';
import { vendorApi } from '../api/vendor';
import { CreateProductData, UpdateProductData } from '../../types/vendor';

export const useVendorProfile = () => {
  return useQuery({
    queryKey: ['vendor', 'profile'],
    queryFn: () => vendorApi.getProfile(),
  });
};

export const useVendorStores = () => {
  return useQuery({
    queryKey: ['vendor', 'stores'],
    queryFn: () => vendorApi.getStores(),
  });
};

export const useVendorStore = (id: string) => {
  return useQuery({
    queryKey: ['vendor', 'stores', id],
    queryFn: () => vendorApi.getStore(id),
    enabled: !!id,
  });
};

export const useStoreProducts = (storeId: string) => {
  return useQuery({
    queryKey: ['vendor', 'stores', storeId, 'products'],
    queryFn: () => vendorApi.getStoreProducts(storeId),
    enabled: !!storeId,
  });
};

export const useProduct = (storeId: string, productId: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['vendor', 'stores', storeId, 'products', productId],
    queryFn: () => vendorApi.getProduct(storeId, productId),
    enabled: !!(storeId && productId && (options?.enabled !== false)),
  });
};

export const useVendorOrders = () => {
  return useQuery({
    queryKey: ['vendor', 'orders'],
    queryFn: () => vendorApi.getOrders(),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ storeId, data }: { storeId: string; data: CreateProductData }) =>
      vendorApi.createProduct(storeId, data),
    onSuccess: (_, { storeId }) => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'stores', storeId, 'products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ storeId, productId, data }: { storeId: string; productId: string; data: UpdateProductData }) =>
      vendorApi.updateProduct(storeId, productId, data),
    onSuccess: (_, { storeId, productId }) => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'stores', storeId, 'products'] });
      queryClient.invalidateQueries({ queryKey: ['vendor', 'stores', storeId, 'products', productId] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ storeId, productId }: { storeId: string; productId: string }) =>
      vendorApi.deleteProduct(storeId, productId),
    onSuccess: (_, { storeId }) => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'stores', storeId, 'products'] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: vendorApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', 'profile'] });
    },
  });
};