import { create } from "zustand";
import api from "../axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface WishlistItem {
  id: number;
  product: {
    images: any;
    id: number;
    name: string;
    description: string;
    discount_price: number;
    price: number;
  };
  product_variation: {
    id: number;
    color: string;
    size: string;
  };
}

interface AddToWishlistParams {
  userId: number;
  productId: number;
  productVariationId: number;
  quantity: number;
}

interface WishlistStore {
  wishlist: WishlistItem[];
  fetchWishlist: () => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  addToWishlist: (params: AddToWishlistParams) => Promise<void>;
  removeFromWishlist: (itemId: number) => Promise<void>;
  clearWishlist: () => void;
}

const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: [],
  isInWishlist: (productId: number) =>
    get().wishlist.some((item) => item?.product?.id === productId),

  /** Fetch the wishlist items   */
  fetchWishlist: async () => {
    try {
      const wishlistPk = Cookies.get("wishlist_id");
  
      if (!wishlistPk) {
        toast.error("No wishlist found. Please create a wishlist first.");
        return;
      }
  
      const { data } = await api.get(`/cart/wishlist/${wishlistPk}/wishlist-items/`);
  
      const filteredItems = data.results.filter((item: any) => item?.product && item?.product_variation);
      set({ wishlist: filteredItems });
  
      Cookies.set("wishlist", JSON.stringify(filteredItems), { expires: 7 });
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      toast.error("Failed to fetch wishlist items.");
    }
  },

  /** Add item to wishlist */
  addToWishlist: async ({ userId, productId, productVariationId, quantity }) => {
    const token = Cookies.get("access_token");
  
    if (!token) {
      toast.error("You need to login to add to wishlist.");
      return;
    }
  
    try {
      let wishlistPk = Cookies.get("wishlist_id");
  
      if (!wishlistPk) {
        const { data } = await api.post("/cart/wishlist/", { user: userId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        wishlistPk = data.data.uid;
        Cookies.set("wishlist_id", data.data.uid);
      }
  
      const { data } = await api.post(
        `/cart/wishlist/${wishlistPk}/wishlist-items/`,
        {
          product_id: productId,
          product_variation_id: productVariationId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      set((state) => {
        const updatedWishlist = [...state.wishlist, data];
        Cookies.set("wishlist", JSON.stringify(updatedWishlist), { expires: 7 });
        return { wishlist: updatedWishlist };
      });
  
      toast.success("Item added to wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add item to wishlist. Please login again.");
    }
  },
  

  /** Remove item from wishlist */
  removeFromWishlist: async (itemId: number) => {
    try {
      const wishlistPk = Cookies.get("wishlist_id");

      if (!wishlistPk) {
        toast.error("No wishlist found. Please try again.");
        return;
      }

      await api.delete(`/cart/wishlist/${wishlistPk}/wishlist-items/${itemId}/`);

      set((state) => {
        const updatedWishlist = state.wishlist.filter((item) => item.id !== itemId);
        Cookies.set("wishlist", JSON.stringify(updatedWishlist), { expires: 7 });
        return { wishlist: updatedWishlist };
      });

      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  },

  /** Clear wishlist */
  clearWishlist: () => {
    set({ wishlist: [] });
    Cookies.remove("wishlist");
    Cookies.remove("wishlist_id");
    toast.success("Wishlist cleared");
  },
}));

export default useWishlistStore;