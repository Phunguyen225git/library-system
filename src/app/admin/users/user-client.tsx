/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/admin/users/user-client.tsx
"use client";

import { UserTable } from "@/src/components/admin/users/UserTable";
import { useRouter } from "next/navigation";

export function UserClient({ data }: { data: any[] }) {
  const router = useRouter();

  // Hàm xử lý khi bấm nút Sửa quyền
  const handleEditRole = (user: any) => {
    // Tạm thời hiển thị thông báo, chúng ta sẽ nối Server Action vào sau
    alert(`Đang phát triển: Cập nhật quyền cho tài khoản ${user.email}`);
  };

  // Hàm xử lý khi bấm nút Xóa
  const handleDelete = (user: any) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa tài khoản ${user.email} không? Hành động này không thể hoàn tác!`
    );

    if (isConfirmed) {
      alert(`Đang phát triển: Xóa tài khoản ${user.email}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Danh sách Độc giả
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý tài khoản, phân quyền và trạng thái của người dùng trong hệ
            thống.
          </p>
        </div>
      </div>

      {/* Gọi UI Bảng và truyền dữ liệu + hàm xử lý vào */}
      <UserTable
        users={data}
        onEditRole={handleEditRole}
        onDelete={handleDelete}
      />
    </div>
  );
}
