import { create } from "zustand";
import api from "../axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface WishlistItem {
    id: number;
    product: {
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

// Load wishlist from cookies
const loadWishlist = (): WishlistItem[] => {
    try {
        const storedWishlist = Cookies.get("wishlist");
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
        console.error("Failed to load wishlist from cookies:", error);
        return [];
    }
};

interface WishlistStore {
    wishlist: WishlistItem[];
    fetchWishlist: () => Promise<void>;
    addToWishlist: (productId: number, productVariationId: number) => Promise<void>;
    removeFromWishlist: (itemId: number) => Promise<void>;
    clearWishlist: () => void;
}

const useWishlistStore = create<WishlistStore>((set, get) => ({
    wishlist: loadWishlist(),

    /** Fetch the wishlist items */
    fetchWishlist: async () => {
        try {
            const wishlistPk = Cookies.get("wishlist_id");

            if (!wishlistPk) {
                toast.error("No wishlist found. Please create a wishlist first.");
                return;
            }

            const { data } = await api.get(`/wishlist/${wishlistPk}/items/`);

            set({ wishlist: data.results });

            // Store wishlist in cookies
            Cookies.set("wishlist", JSON.stringify(data.results), { expires: 7 });
            console.log("Wishlist fetched:", data.results);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
            toast.error("Failed to fetch wishlist items.");
        }
    },

    /** Add item to wishlist */
    addToWishlist: async (productId, productVariationId) => {
        try {
            let wishlistPk = Cookies.get("wishlist_id");

            if (!wishlistPk) {
                const { data } = await api.post("/wishlist/");
                wishlistPk = data.id;
                Cookies.set("wishlist_id", data.id);
            }

            const { data } = await api.post(`/wishlist/${wishlistPk}/items/`, {
                product_id: productId,
                product_variation_id: productVariationId,
            });

            set((state) => {
                const updatedWishlist = [...state.wishlist, data];
                Cookies.set("wishlist", JSON.stringify(updatedWishlist), { expires: 7 });
                return { wishlist: updatedWishlist };
            });

            toast.success("Item added to wishlist");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("Failed to add item to wishlist. Please try again.");
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

            await api.delete(`/wishlist/${wishlistPk}/items/${itemId}/`);

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
