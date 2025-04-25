import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../axios';


// Fetch cart items
export const useCart = () => {
    return useQuery({
      queryKey: ['cart'],
      queryFn: async () => {
        const { data } = await api.get(`/cart/carts/`);
        return data;
      },
    });
  };

// Fetch cart items dynamically
export const useCartDetails = (cartId: number) => {
  return useQuery({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      const { data } = await api.get(`/cart/carts/${cartId}/`);
      return data;
    },
    enabled: !!cartId, // Ensures query runs only if cartId is provided
  });
};

// Fetch wishlist items
export const useWishlist = () => {
    return useQuery({
      queryKey: ['wishlist'],
      queryFn: async () => {
        const { data } = await api.get(`/cart/wishlists/`);
        return data;
      },
    });
  };
  

// Fetch wishlist items dynamically
export const useWishlistId = (wishlistId: number) => {
  return useQuery({
    queryKey: ['wishlist', wishlistId],
    queryFn: async () => {
      const { data } = await api.get(`/cart/wishlists/${wishlistId}/`);
      return data;
    },
    enabled: !!wishlistId,
  });
};

// Add item to cart dynamically
export const useAddToCart = (cartId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      await api.post(`/cart/carts/${cartId}/item/`, { product_id: productId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
    },
  });
};

// Create a new cart for a user dynamically
export const useCreateCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (userId: number) => {
        const { data } = await api.post(`/cart/carts/`, { user: userId });
        return data; // Returns the created cart data
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['cart', data.id] });
      },
    });
  };

// Remove item from cart dynamically
export const useRemoveFromCart = (cartId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      await api.post(`/cart/carts/${cartId}/remove-item/`, { product_id: productId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
    },
  });
};

// Add item to wishlist dynamically
export const useAddToWishlist = (wishlistId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      await api.post(`/cart/wishlists/${wishlistId}/add-item/`, { product_id: productId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', wishlistId] });
    },
  });
};

// Remove item from wishlist dynamically
export const useRemoveFromWishlist = (wishlistId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      await api.post(`/cart/wishlists/${wishlistId}/remove-item/`, { product_id: productId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', wishlistId] });
    },
  });
};  