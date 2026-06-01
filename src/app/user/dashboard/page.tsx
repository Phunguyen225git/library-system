/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import UserHero from "@/src/components/users/main/UseHero";
import BookList from "@/src/components/users/main/BookList";
import BorrowCart from "@/src/components/users/main/BorrowCart";
import DashboardStats from "@/src/components/users/main/DashboardStats";

export default function UserDashboardPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Tải danh sách sách từ database
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data.success ? data.books : []);
    };
    fetchBooks();
  }, []);

  // 2. Logic Thêm/Xóa giỏ hàng
  const addToCart = (book: any) => {
    if (!cart.find((item) => item.id === book.id)) {
      setCart([...cart, book]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // 3. Xử lý gửi lệnh mượn toàn bộ giỏ hàng
  const handleConfirmBorrow = async () => {
    setLoading(true);
    try {
      // Gọi API xử lý mượn (Gửi mảng các bookId lên server)
      const res = await fetch("/api/borrows/bulk-create", {
        method: "POST",
        body: JSON.stringify({ bookIds: cart.map((item) => item.id) }),
      });

      if (res.ok) {
        alert("🎉 Chúc mừng! Yêu cầu mượn sách đã được gửi đi.");
        setCart([]); // Xóa sạch giỏ hàng sau khi thành công
      }
    } catch (e) {
      alert("Lỗi kết nối server!");
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <UserHero onSearch={setSearchTerm} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
          {/* ⬅️ CỘT TRÁI (8/12): Khám phá & Chỉ số */}
          <div className="lg:col-span-8 space-y-8">
            <DashboardStats />
            <div>
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                📖 Tủ sách dành cho bạn
              </h2>
              <BookList
                books={filteredBooks}
                cartItems={cart}
                onAddToHandle={addToCart}
              />
            </div>
          </div>

          {/* ➡️ CỘT PHẢI (4/12): Giỏ hàng */}
          <div className="lg:col-span-4">
            <BorrowCart
              items={cart}
              onRemove={removeFromCart}
              onConfirm={handleConfirmBorrow}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
