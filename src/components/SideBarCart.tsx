// src/components/SidebarCart.tsx
"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/src/store/useCartStore";
import { ShoppingBasket, Trash2, Send } from "lucide-react";

export default function SidebarCart() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Sửa lỗi Hydration của Next.js khi dùng Persist LocalStorage
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch("/api/borrows/bulk-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookIds: cart.map((item) => item.id) }),
      });

      if (res.ok) {
        alert("🎉 Đã gửi yêu cầu mượn thành công! Hãy đợi thủ thư phê duyệt.");
        clearCart(); // Xóa sạch giỏ hàng Zustand
      } else {
        alert("Có lỗi xảy ra khi gửi yêu cầu.");
      }
    } catch (e) {
      alert("Lỗi kết nối mạng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden sticky top-6">
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-sm">
          <ShoppingBasket className="w-4 h-4 text-indigo-400" />
          Giỏ sách của bạn
        </div>
        <span className="bg-indigo-600 text-[10px] px-2 py-0.5 rounded-full font-black">
          {cart.length} cuốn
        </span>
      </div>

      <div className="p-4 space-y-3 max-h-[320px] overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8 font-medium">
            Chưa có sách nào trong giỏ.
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-dashed"
            >
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-slate-800 truncate">
                  {item.title}
                </h5>
                <p className="text-[10px] text-slate-400 truncate">
                  {item.author}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-slate-400 hover:text-rose-500 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 bg-slate-50 border-t">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? "Đang gửi..." : "Gửi yêu cầu mượn"}
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
