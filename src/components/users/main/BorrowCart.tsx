// src/app/dashboard/components/BorrowCart.tsx
import { ShoppingBasket, Trash2, Send, Book } from "lucide-react";

interface CartItem {
  id: string;
  title: string;
  author: string;
}

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function BorrowCart({
  items,
  onRemove,
  onConfirm,
  loading,
}: CartProps) {
  return (
    <div className="bg-white border rounded-3xl shadow-sm sticky top-24 overflow-hidden">
      <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBasket className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-sm">Giỏ sách chờ mượn</h3>
        </div>
        <span className="bg-white/20 text-[10px] px-2 py-1 rounded-full font-black">
          {items.length} cuốn
        </span>
      </div>

      <div className="p-4 max-h-[400px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="py-12 text-center flex flex-col items-center gap-2">
            <Book className="w-8 h-8 text-slate-200" />
            <p className="text-xs text-slate-400 font-medium">
              Giỏ hàng đang trống
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-all"
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate">
                    {item.author}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 bg-slate-50 border-t">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Xác nhận mượn ngay"}
            <Send className="w-3.5 h-3.5" />
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-3 px-2">
            Bằng cách xác nhận, bạn đồng ý với nội quy mượn trả của thư viện.
          </p>
        </div>
      )}
    </div>
  );
}
