// src/components/admin/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Users, Home, Settings } from "lucide-react";
import { cn } from "@/lib/utils"; // Hàm tiện ích của Shadcn để nối class Tailwind

const menuItems = [
  { name: "Tổng quan", href: "/admin", icon: Home },
  { name: "Quản lý Sách", href: "/admin/books", icon: Book },
  { name: "Quản lý Độc giả", href: "/admin/users", icon: Users },
  { name: "Cài đặt", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại để bôi đậm menu đang chọn

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-wider">
          LIB ADMIN
        </h1>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-600 text-white font-medium"
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-sm text-slate-500 text-center">
        © 2026 Library System
      </div>
    </aside>
  );
}
