// src/components/admin/header.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/src/components/ui/button"; // Đảm bảo đúng đường dẫn alias của bạn
import { LogOut, User as UserIcon } from "lucide-react";
import { SidebarTrigger } from "@/src/components/ui/sidebar"; // 🌟 1. Thêm import này

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
      {/* 🌟 2. Cột bên trái: Kết hợp nút đóng mở Sidebar và Tiêu đề */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-slate-600 hover:bg-slate-100 rounded-lg p-2 h-9 w-9" />
        {/* Nâng lên text-base (16px) và font-semibold nhìn cho đẳng cấp */}
        <div className="font-semibold text-slate-700 text-base">
          Trang Quản Trị Hệ Thống Thư Viện
        </div>
      </div>

      {/* Cột bên phải: Thông tin tài khoản Admin và Nút đăng xuất của bạn */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-base font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-dashed">
          <UserIcon
            className="w-[18px] h-[18px] text-indigo-500"
            strokeWidth={2.2}
          />
          <span>{session?.user?.name || session?.user?.email || "Admin"}</span>
        </div>

        <Button
          variant="ghost" // Đổi sang ghost hoặc destructive cho đẹp mắt
          size="sm"
          className="text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-medium text-sm h-9 px-4 transition-colors"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          <LogOut className="w-4 h-4 mr-2" strokeWidth={2.2} />
          Đăng xuất
        </Button>
      </div>
    </header>
  );
}
