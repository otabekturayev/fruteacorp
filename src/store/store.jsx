import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../../axios";
import { toast } from "react-toastify";

export const useStore = create(
  persist(
    (set, get) => ({
      
      phoneNumber: null,

      setPhoneNumber: (prev) => set({ phoneNumber: prev }),

      isOpenModalAuth: {
        forgotPassword: false,
        login: false,
        register: false,
        newPass: false,
      },

      onChangeIsOpenModalAuth: (prev) => set({ isOpenModalAuth: prev }),

      addCardModal: {
        isOpen: false,
        product: null,
      },

      showModalAddCard: (state) => {
        set({ addCardModal: state });

        setTimeout(() => {
          set({ addCardModal: { ...state, isOpen: false } });
        }, 3000);
      },
      auth: false,
      user: null,
      search: "",
      loading: false,
      setCartLoading: false,
      cart: {},
      wishlist: [],

      getWish: async () => {
        set({ loading: true });
        try {
          const { data } = await axios.get("/wishlist");
          set({ wishlist: data?.data });
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        } finally {
          set({ loading: false });
        }
      },

      handleWishlist: async (productId) => {
        try {
          const response = await axios.post("/wishlist", {
            productId: productId,
          });
          get().getWish();
        } catch (error) {
          console.error("Error adding/removing product from wishlist:", error);
        }
      },

      getCart: async () => {
        set({ loading: true });
        try {
          const response = await axios.get("/cart");
          set({ cart: response?.data?.data });
        } catch (error) {
          console.error(
            "Cart ma'lumotlarini olishda xatolik yuz berdi:",
            error
          );
        } finally {
          set({ loading: false });
        }
      },
      getCart1: async () => {
        try {
          const response = await axios.get("/cart");
          set({ cart: response?.data?.data });
        } catch (error) {
          console.error(
            "Cart ma'lumotlarini olishda xatolik yuz berdi:",
            error
          );
        }
      },

      setCart: async (newCart, count) => {
        const existingProduct = get().cart?.items?.find(
          (product) => product?.productId?.id === newCart?.id
        );

        if (existingProduct) {
          const updatedQuantity =
            existingProduct?.quantity + (count ? count : 1);
          try {
            set({ setCartLoading: true });
            const res = await axios.post(`/cart/add`, {
              productId: newCart?.id,
              count: +updatedQuantity,
            });
            get().getCart1();
          } catch (error) {
            console.error("Mahsulot miqdorini yangilashda xatolik:", error);
          } finally {
            set({ setCartLoading: false });
          }
        } else {
          try {
            set({ setCartLoading: true });
            const res = await axios.post("/cart/add", {
              productId: newCart?.id,
              count: count ? +count : 1,
            });
            get().getCart1();
          } catch (error) {
            console.error("Mahsulotni savatga qo'shishda xatolik:", error);
          } finally {
            set({ setCartLoading: false });
          }
        }
      },

      setDeleteProductCart: async (id, count) => {
        try {
          await axios.post(`/cart/remove`, { productId: id, count: +count });
          get().getCart1();
        } catch (error) {
          console.error("Mahsulotni uchirishda xatolik:", error);
        }
      },

      setAddProductCount: async (id) => {
        try {
          await axios.post(`/cart/add`, { productId: id, count: 1 });
          get().getCart1();
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      },

      setDeleteProductCount: async (id) => {
        try {
          await axios.post(`/cart/remove`, { productId: id, count: 1 });
          get().getCart1();
        } catch (error) {
          console.error("Mahsulotni kamaytirishda xatolik:", error);
        }
      },

      setSearch: (text) => set({ search: text }),

      setUser: (userData) => set({ user: userData, auth: true }),

      clearUser: () => set({ user: null, auth: false, cart: null }),
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,

      partialize: (state) => ({
        auth: state.auth,
        user: state.user,
        token: state.token,
      }),
    }
  )
);
