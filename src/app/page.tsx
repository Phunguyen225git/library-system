// src/app/page.tsx
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/src/components/layout/NavBar";
import { BookCard } from "@/src/components/users/books/BookCard";

export default async function Home() {
  // Fetch sách trực tiếp trên Server Component
  const books = await prisma.book.findMany({
    orderBy: { createdAt: "desc" },
    take: 20, // Hiển thị 20 cuốn mới nhất
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Khám phá kho tri thức
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hàng ngàn đầu sách lập trình, thiết kế và kỹ năng mềm đang chờ đón
            bạn. Đăng ký mượn sách ngay hôm nay!
          </p>
        </div>

        {/* Lưới hiển thị sách */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            Hiện tại thư viện chưa có cuốn sách nào.
          </div>
        )}
      </main>
    </div>
  );
}
