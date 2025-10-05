// hooks/useShippingAddress.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Types
export interface ShippingAddress {
    id: string;
    street2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    isDefault?: boolean;
}

export interface CreateAddressPayload {
    id: string;
    street2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    isDefault?: boolean;
}

export interface UpdateAddressPayload extends Partial<CreateAddressPayload> { }

// API functions
const api = {
    // GET /products/address-book/ - List all addresses
    getAddresses: async (): Promise<ShippingAddress[]> => {
        const response = await fetch('/products/address-book/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add your auth headers here
                // 'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch addresses');
        }

        return response.json();
    },

    // GET /products/address-book/{id}/ - Get single address
    getAddress: async (id: string): Promise<ShippingAddress> => {
        const response = await fetch(`/products/address-book/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch address');
        }

        return response.json();
    },

    // POST /products/address-book/ - Create new address
    createAddress: async (data: CreateAddressPayload): Promise<ShippingAddress> => {
        const response = await fetch('/products/address-book/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to create address');
        }

        return response.json();
    },

    // PUT /products/address-book/{id}/ - Full update
    updateAddress: async (id: string, data: UpdateAddressPayload): Promise<ShippingAddress> => {
        const response = await fetch(`/products/address-book/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update address');
        }

        return response.json();
    },

    // PATCH /products/address-book/{id}/ - Partial update
    partialUpdateAddress: async (id: string, data: Partial<UpdateAddressPayload>): Promise<ShippingAddress> => {
        const response = await fetch(`/products/address-book/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update address');
        }

        return response.json();
    },

    // DELETE /products/address-book/{id}/ - Delete address
    deleteAddress: async (id: string): Promise<void> => {
        const response = await fetch(`/products/address-book/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete address');
        }
    },
};

// Query keys
export const addressKeys = {
    all: ['addresses'] as const,
    lists: () => [...addressKeys.all, 'list'] as const,
    list: (filters: string) => [...addressKeys.lists(), { filters }] as const,
    details: () => [...addressKeys.all, 'detail'] as const,
    detail: (id: string) => [...addressKeys.details(), id] as const,
};

// Custom hooks
export function useShippingAddresses() {
    return useQuery({
        queryKey: addressKeys.lists(),
        queryFn: api.getAddresses,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useShippingAddress(id: string) {
    return useQuery({
        queryKey: addressKeys.detail(id),
        queryFn: () => api.getAddress(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
}

export function useCreateAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: api.createAddress,
        onSuccess: () => {
            // Invalidate and refetch address list
            queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
        },
    });
}

export function useUpdateAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateAddressPayload }) =>
            api.updateAddress(id, data),
        onSuccess: (data, variables) => {
            // Update the specific address in cache
            queryClient.setQueryData(addressKeys.detail(variables.id), data);
            // Invalidate the list to ensure consistency
            queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
        },
    });
}

export function usePartialUpdateAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<UpdateAddressPayload> }) =>
            api.partialUpdateAddress(id, data),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(addressKeys.detail(variables.id), data);
            queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
        },
    });
}

export function useDeleteAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: api.deleteAddress,
        onSuccess: (_, deletedId) => {
            // Remove the address from cache
            queryClient.removeQueries({ queryKey: addressKeys.detail(deletedId) });
            // Invalidate the list
            queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
        },
    });
}

// Utility hook for default address
export function useDefaultAddress() {
    const { data: addresses } = useShippingAddresses();
    return addresses?.find(address => address.isDefault);
}