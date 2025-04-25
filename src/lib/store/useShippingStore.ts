import { create } from 'zustand';

interface ShippingAddress {
  id: string;
  street: string;
  country: string;
  state: string;
  city: string;
  postal_code: string;
}

interface AddressStore {
  address: ShippingAddress | null;
  setAddress: (address: ShippingAddress) => void;
  clearAddress: () => void;
}

export const useAddressStore = create<AddressStore>((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
  clearAddress: () => set({ address: null }),
}));