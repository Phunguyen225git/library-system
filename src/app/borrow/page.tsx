// src/app/borrow/page.tsx
import { prisma } from "@/lib/prisma";
import BookDetail from "@/src/components/users/borrow/BookDetail";
import BorrowForm from "@/src/components/users/borrow/BorrowForm";
import CountdownWidget from "@/src/components/users/borrow/CountdownWidget";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"; // 🌟 THÊM DÒNG NÀY
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route"; // 🌟 Đường dẫn tới authOptions của bạn (sửa lại cho đúng thư mục dự án)

interface PageProps {
  searchParams: Promise<{ bookId?: string }>;
}

export default async function BorrowRegistrationPage({
  searchParams,
}: PageProps) {
  const { bookId } = await searchParams;

  if (!bookId) {
    redirect("borrow");
  }

  // 1. 🌟 LẤY SESSION NGƯỜI DÙNG ĐANG ĐĂNG NHẬP THẬT
  const session = await getServerSession(authOptions);

  // Nếu chưa đăng nhập, đá họ về trang login luôn
  if (!session || !session.user) {
    redirect("/api/auth/signin"); // Hoặc trang /login của bạn
  }

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
          {/* 🌟 TRUYỀN ID THẬT: Lấy chuẩn đét cái ID từ tài khoản đang đăng nhập */}
          <BorrowForm
            bookId={book.id}
            pricePerDay={book.pricePerDay ?? 2000}
            userId={session.user.id}
          />
        </div>
        <div className="lg:col-span-1">
          <CountdownWidget />
        </div>
      </div>
    </div>
  );
}
