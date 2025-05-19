import { create } from "zustand";
import api from "../axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface CartItem {
  id: number;
  quantity: number;
  sub_total: number;
  product: {
    id: number;
    name: string;
    description: string;
    discount_price: number;
    price: number;
    images: [{
      image_url: string;
    }];
  };
  product_variation: {
    id: number;
    color: string;
    size: string;
  };
}

interface CartStore {
  cart: CartItem[];
  cartPk: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, productVariationId: number, quantity?: number) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  createCart: () => Promise<string | undefined>;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set, get) => {
  const store: CartStore = {
    cart: [],
    cartPk: Cookies.get("cart_id") || null,

    createCart: async () => {
      try {
        const { data } = await api.post("/cart/cart/");
        const id = data.id;
        Cookies.set("cart_id", id, { expires: 30 });
        set({ cartPk: id });
        return id;
      } catch (error) {
        console.error("Error creating cart:", error);
        toast.error("Failed to create cart");
      }
    },

    fetchCart: async () => {
      try {
        let cartPk = get().cartPk || Cookies.get("cart_id");

        if (!cartPk) {
          cartPk = await get().createCart();
          set({ cartPk });
        }

        const { data } = await api.get(`/cart/cart/${cartPk}/items/`);
        set({ cart: data.results });

        // Optionally store in cookie
        Cookies.set("cart", JSON.stringify(data.results), { expires: 30 });
        console.log("Cart fetched:", data.results);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        // toast.error("Failed to fetch cart items.");
      }
    },

    addToCart: async (productId, productVariationId, quantity = 1) => {
      try {
        let cartPk = get().cartPk || Cookies.get("cart_id");
        if (!cartPk) {
          cartPk = await get().createCart();
          set({ cartPk });
        }

        const { data } = await api.post(`/cart/cart/${cartPk}/items/`, {
          product_id: productId,
          product_variation_id: productVariationId,
          quantity,
        });

        set((state) => {
          const updatedCart = [...state.cart, data];
          Cookies.set("cart", JSON.stringify(updatedCart), { expires: 30 });
          return { cart: updatedCart };
        });

        toast.success(data.message || "Item added to cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add item to cart. Please try again.");
      }
    },

    updateCartItem: async (itemId, quantity) => {
      try {
        const cartPk = get().cartPk || Cookies.get("cart_id");

        if (!cartPk) {
          toast.error("No cart found. Please try again.");
          return;
        }

        await api.patch(`/cart/cart/${cartPk}/items/${itemId}/`, { quantity });

        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          );
          Cookies.set("cart", JSON.stringify(updatedCart), { expires: 30 });
          return { cart: updatedCart };
        });

        toast.success("Cart updated");
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error("Failed to update cart");
      }
    },

    removeFromCart: async (itemId) => {
      try {
        const cartPk = get().cartPk || Cookies.get("cart_id");

        if (!cartPk) {
          toast.error("No cart found. Please try again.");
          return;
        }

        await api.delete(`/cart/cart/${cartPk}/items/${itemId}/`);

        set((state) => {
          const updatedCart = state.cart.filter((item) => item.id !== itemId);
          Cookies.set("cart", JSON.stringify(updatedCart), { expires: 30 });
          return { cart: updatedCart };
        });

        toast.success("Item removed from cart");
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error("Failed to remove item from cart");
      }
    },

    clearCart: () => {
      set({ cart: [], cartPk: null });
      Cookies.remove("cart");
      Cookies.remove("cart_id");
      toast.success("Cart cleared");
    },

  };

  // Immediately fetch cart when store initializes
  store.fetchCart();

  return store;
});

export default useCartStore;