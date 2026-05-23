// src/components/admin/header.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/src/components/ui/button";
import { LogOut, User as UserIcon } from "lucide-react";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle"; // 🌟 1. Import nút bấm chuyển theme vào đây

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-card/80 dark:bg-card/50 backdrop-blur-md border-b border-border flex items-center justify-between px-6 sticky top-0 z-10 shrink-0 transition-all duration-300">
      {/* Chỗ thông tin User, thay thế class bg-slate-50 cũ bằng: */}
      <div className="flex items-center gap-2 text-base font-medium bg-muted text-foreground px-3 py-1.5 rounded-xl border border-dashed border-border">
        <SidebarTrigger className="text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2 h-9 w-9" />
        <div className="font-semibold text-slate-700 dark:text-slate-200 text-base">
          Trang Quản Trị Hệ Thống Thư Viện
        </div>
      </div>

      {/* Cột bên phải: Nút đổi giao diện + Thông tin tài khoản */}
      <div className="flex items-center gap-4">
        {/* 🌟 2. Đặt nút đổi giao diện Sáng/Tối ở đây */}
        <ThemeToggle />

        <div className="flex items-center gap-2 text-base font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
          <UserIcon
            className="w-[18px] h-[18px] text-indigo-500"
            strokeWidth={2.2}
          />
          <span>{session?.user?.name || session?.user?.email || "Admin"}</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 rounded-xl font-medium text-sm h-9 px-4 transition-colors"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          <LogOut className="w-4 h-4 mr-2" strokeWidth={2.2} />
          Đăng xuất
        </Button>
      </div>
    </header>
  );
}
