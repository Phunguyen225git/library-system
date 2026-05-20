"use client";

import BorrowForm from "@/src/components/users/borrow/BorrowForm";
import CountdownWidget from "@/src/components/users/borrow/CountdownWidget";

export default function BorrowRegistrationPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        📖 Hệ Thống Đăng Ký Mượn Sách & Quản Lý Tiền Phạt
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Khối Đăng ký bên trái */}
        <BorrowForm pricePerDay={3000} />

        {/* Khối Đếm ngược bên phải */}
        <CountdownWidget />
      </div>
    </div>
  );
}
