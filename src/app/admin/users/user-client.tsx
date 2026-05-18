/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/admin/users/user-client.tsx
"use client";

import { useState } from "react";
import { UserTable } from "@/src/components/admin/users/UserTable";
import { updateUserRole, deleteUser } from "@/lib/actions/users"; // Import 2 hàm xử lý thực tế ở đây

export function UserClient({ data }: { data: any[] }) {
  const [isPending, setIsPending] = useState(false);

  // Hàm xử lý khi bấm nút Sửa quyền (Admin <-> User)
  const handleEditRole = async (user: any) => {
    // Nếu đang là ADMIN thì mục tiêu đổi sang USER, và ngược lại
    const nextRole = user.role === "ADMIN" ? "USER" : "ADMIN";

    const confirmText =
      user.role === "ADMIN"
        ? `Bạn có chắc muốn HẠ QUYỀN tài khoản ${user.email} xuống thành Độc giả bình thường không?`
        : `Bạn có chắc muốn CẤP QUYỀN Quản trị viên (ADMIN) cho tài khoản ${user.email} không?`;

    if (!window.confirm(confirmText)) return;

    setIsPending(true);
    const result = await updateUserRole(user.id, nextRole);
    setIsPending(false);

    if (result.error) {
      alert(result.error);
    } else {
      alert(result.success);
    }
  };

  // Hàm xử lý khi bấm nút Xóa tài khoản
  const handleDelete = async (user: any) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn XÓA tài khoản ${user.email} không? Hành động này sẽ xóa vĩnh viễn và không thể hoàn tác!`
    );

    if (!isConfirmed) return;

    setIsPending(true);
    const result = await deleteUser(user.id);
    setIsPending(false);

    if (result.error) {
      alert(result.error);
    } else {
      alert(result.success);
    }
  };

  return (
    // Thêm hiệu ứng làm mờ nhẹ (opacity-60) khi hệ thống đang xử lý lệnh xóa/sửa ngầm
    <div
      className={`space-y-4 ${
        isPending ? "opacity-60 pointer-events-none" : ""
      }`}
    >
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

      <UserTable
        users={data}
        onEditRole={handleEditRole}
        onDelete={handleDelete}
      />
    </div>
  );
}
