// src/app/admin/users/page.tsx
import { prisma } from "@/lib/prisma"; // Sửa đường dẫn nếu project của bạn dùng @/src/lib/prisma
import { UserClient } from "./user-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Độc giả | Admin Thư Viện",
  description: "Trang quản lý người dùng của hệ thống thư viện.",
};

export default async function UsersPage() {
  // 1. Fetch toàn bộ user từ Database, sắp xếp người mới đăng ký lên đầu
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {/* 2. Truyền dữ liệu vào Client Component để hiển thị */}
      <UserClient data={users} />
    </div>
  );
}
