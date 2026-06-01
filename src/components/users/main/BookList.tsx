// src/app/dashboard/components/BookList.tsx
import { Plus, Check } from "lucide-react";

interface BookListProps {
  books: any[];
  cartItems: any[];
  onAddToHandle: (book: any) => void;
}

export default function BookList({
  books,
  cartItems,
  onAddToHandle,
}: BookListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {books.map((book) => {
        const isInCart = cartItems.some((item) => item.id === book.id);

        return (
          <div
            key={book.id}
            className="bg-white border rounded-3xl p-4 flex gap-4 hover:shadow-md transition-all group"
          >
            <div className="w-24 h-32 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
              <img
                src={
                  book.coverUrl ||
                  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
                }
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
              <div>
                <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">
                  {book.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 truncate mt-1">
                  {book.title}
                </h4>
                <p className="text-xs text-slate-500 truncate">{book.author}</p>
              </div>

              <button
                disabled={isInCart || book.availableCopies <= 0}
                onClick={() => onAddToHandle(book)}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-black transition-all ${
                  isInCart
                    ? "bg-emerald-50 text-emerald-600 cursor-default"
                    : book.availableCopies > 0
                    ? "bg-slate-900 text-white hover:bg-indigo-600"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Đã trong giỏ
                  </>
                ) : book.availableCopies > 0 ? (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Thêm mượn
                  </>
                ) : (
                  "Hết sách"
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
