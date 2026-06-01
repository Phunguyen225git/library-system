// src/components/books/book-card.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BookCard({ book }: { book: any }) {
  const isAvailable = book.available > 0;

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="h-64 relative w-full overflow-hidden rounded-t-lg border-b">
          {book.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="h-full bg-slate-100 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-slate-300" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3
            className="font-bold text-lg text-slate-800 line-clamp-2"
            title={book.title}
          >
            {book.title}
          </h3>
          <Badge
            variant={isAvailable ? "default" : "destructive"}
            className="shrink-0"
          >
            {isAvailable ? `Còn ${book.available}` : "Hết sách"}
          </Badge>
        </div>

        <p className="text-sm text-slate-500 font-medium mb-3">
          Tác giả: {book.author}
        </p>

        <p className="text-sm text-slate-600 line-clamp-3 mt-auto">
          {book.description || "Chưa có mô tả cho cuốn sách này."}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/borrow?bookId=${book.id}`} className="w-full">
          <Button className="w-full" disabled={!isAvailable}>
            {isAvailable ? "Đăng ký mượn" : "Đang chờ trả"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
// // src/components/BookCard.tsx
// "use client";
// import { useCartStore, CartItem } from "@/src/store/useCartStore";
// import { Plus, Check } from "lucide-react";

// interface BookCardProps {
//   book: CartItem & { availableCopies: number };
// }

// export default function BookCard({ book }: BookCardProps) {
//   // Gọi hàm và state từ Zustand store
//   const addToCart = useCartStore((state) => state.addToCart);
//   const cart = useCartStore((state) => state.cart);

//   // Kiểm tra xem cuốn này đã được thêm chưa
//   const isAdded = cart.some((item) => item.id === book.id);

//   return (
//     <div className="bg-white border rounded-2xl p-4 flex gap-4 hover:shadow-md transition-all">
//       <div className="w-20 h-28 bg-slate-100 rounded-xl overflow-hidden shrink-0">
//         <img
//           src={
//             book.coverUrl ||
//             "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400"
//           }
//           alt=""
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
//         <div>
//           <h4 className="font-bold text-sm text-slate-900 truncate">
//             {book.title}
//           </h4>
//           <p className="text-xs text-slate-500 truncate">
//             Tác giả: {book.author}
//           </p>
//         </div>

//         <button
//           disabled={isAdded || book.availableCopies <= 0}
//           onClick={() => addToCart(book)}
//           className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
//             isAdded
//               ? "bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default"
//               : book.availableCopies > 0
//               ? "bg-indigo-600 text-white hover:bg-indigo-700"
//               : "bg-slate-100 text-slate-400 cursor-not-allowed"
//           }`}
//         >
//           {isAdded ? (
//             <>
//               <Check className="w-4 h-4" /> Đã chọn
//             </>
//           ) : book.availableCopies > 0 ? (
//             <>
//               <Plus className="w-4 h-4" /> Thêm vào giỏ
//             </>
//           ) : (
//             "Hết sách"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }
