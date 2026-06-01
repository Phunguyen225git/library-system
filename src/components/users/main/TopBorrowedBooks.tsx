// src/app/dashboard/components/TopBorrowedBooks.tsx
import { Flame, Star } from "lucide-react";
import Link from "next/link";

export default function TopBorrowedBooks() {
  // Data mock (Sau này bạn JOIN bảng mượn sách đếm GROUP BY nhé)
  const hotBooks = [
    {
      id: "1",
      title: "Cấu trúc dữ liệu & Giải thuật",
      count: 142,
      rating: 4.9,
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    },
    {
      id: "2",
      title: "Sạch code (Clean Code)",
      count: 98,
      rating: 4.8,
      cover:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    },
    {
      id: "3",
      title: "Thiết kế hệ thống phân tán",
      count: 85,
      rating: 4.7,
      cover:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400",
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
        <h3 className="text-lg font-black text-gray-800 tracking-tight">
          🔥 Mượn nhiều nhất trong tháng
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotBooks.map((book, index) => (
          <Link
            href={`/borrow?bookId=${book.id}`}
            key={book.id}
            className="bg-white border rounded-2xl p-3 flex gap-3 hover:shadow-md transition-all items-center relative overflow-hidden group"
          >
            {/* Top Badge */}
            <div className="absolute top-0 left-0 bg-amber-500 text-white font-black text-xs px-2 py-1 rounded-br-xl z-10">
              #0{index + 1}
            </div>

            <img
              src={book.cover}
              alt={book.title}
              className="w-16 h-20 object-cover rounded-xl shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-gray-900 truncate">
                {book.title}
              </h4>
              <p className="text-xs text-amber-600 font-bold mt-1">
                {book.count} lượt đọc
              </p>
              <div className="flex items-center gap-1 text-[11px] text-gray-400 font-bold mt-0.5">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />{" "}
                {book.rating}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
