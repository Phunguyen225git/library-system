// src/store/useCartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Định nghĩa cấu trúc một cuốn sách trong giỏ
export interface CartItem {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  category?: string;
}

// Định nghĩa các hành động (Actions) của giỏ hàng
interface CartState {
  cart: CartItem[];
  addToCart: (book: CartItem) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // 1. Thêm sách vào giỏ (Chặn trùng lặp)
      addToCart: (book) =>
        set((state) => {
          const exists = state.cart.some((item) => item.id === book.id);
          if (exists) return state; // Nếu có rồi thì không thêm nữa
          return { cart: [...state.cart, book] };
        }),

      // 2. Xóa sách khỏi giỏ hàng
      removeFromCart: (bookId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== bookId),
        })),

      // 3. Xóa sạch giỏ hàng (Sau khi mượn thành công)
      clearCart: () => set({ cart: [] }),

      // 4. Kiểm tra nhanh xem sách đã nằm trong giỏ chưa
      isInCart: (bookId) => {
        return get().cart.some((item) => item.id === bookId);
      },
    }),
    {
      name: "library-borrow-basket", // Tên key lưu dưới LocalStorage
    }
  )
);
