// src/app/borrow/page.tsx
import { prisma } from "@/lib/prisma"; // 🌟 Dùng chính xác file gốc của bạn, không import bừa bãi nữa
import BookDetail from "@/src/components/users/borrow/BookDetail";
import BorrowForm from "@/src/components/users/borrow/BorrowForm";
import CountdownWidget from "@/src/components/users/borrow/CountdownWidget";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ bookId?: string }>;
}

export default async function BorrowRegistrationPage({
  searchParams,
}: PageProps) {
  const { bookId } = await searchParams;

  if (!bookId) {
    redirect("/books"); // Hoặc trang kho sách của bạn
  }

  // 🌟 Gọi đúng thực thể prisma gốc kết nối MariaDB
  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-red-500 font-bold">
        ❌ Không tìm thấy thông tin cuốn sách này trong hệ thống MariaDB!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        ⚡ Trung tâm Đăng Ký Mượn Sách Trực Tuyến
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BookDetail book={book} />
          <BorrowForm bookId={book.id} pricePerDay={book.pricePerDay ?? 2000} />
        </div>
        <div className="lg:col-span-1">
          <CountdownWidget />
        </div>
      </div>
    </div>
  );
}
