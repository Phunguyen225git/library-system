// src/components/admin/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Book,
  Users,
  LayoutDashboard,
  Settings,
  FileText,
  Layers,
  CircleDollarSign,
  Library,
  LogOut,
  ChevronUp,
  UserCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/src/components/ui/sidebar"; // Đảm bảo bạn đã init shadcn sidebar package

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

// Cấu trúc danh mục tính năng chuẩn chỉnh cho Admin Thư Viện
const adminNavigation = [
  {
    group: "Bảng điều khiển",
    items: [{ name: "Tổng quan", href: "/admin", icon: LayoutDashboard }],
  },
  {
    group: "Nghiệp vụ quản lý",
    items: [
      { name: "Quản lý Sách", href: "/admin/books", icon: Book },
      { name: "Danh mục sách", href: "/admin/categories", icon: Layers },
      { name: "Quản lý Độc giả", href: "/admin/users", icon: Users },
      { name: "Phiếu mượn & Trả", href: "/admin/borrows", icon: FileText },
      { name: "Thống kê & Phạt", href: "/admin/fines", icon: CircleDollarSign },
    ],
  },
  {
    group: "Cấu hình hệ thống",
    items: [{ name: "Cài đặt chung", href: "/admin/settings", icon: Settings }],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border bg-card dark:bg-slate-950 text-card-foreground transition-colors duration-300"
    >
      {/* 1. SIDEBAR HEADER: Logo và Tên Hệ Thống */}
      <SidebarHeader className="h-16 flex items-center justify-start px-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <Library className="h-5 w-5" />
          </div>
          <div className="flex flex-col data-[collapse=true]:hidden group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-sm text-white tracking-wide uppercase">
              Lib Admin
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Hệ thống quản lý v2.0
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* 2. SIDEBAR CONTENT: Các nhóm Menu chức năng lướt mượt mà */}
      <SidebarContent className="px-2 py-4 space-y-4 bg-slate-900">
        {adminNavigation.map((group) => (
          <SidebarGroup key={group.group} className="p-0">
            {/* Nhãn tiêu đề nhóm (Ẩn khi thu gọn sidebar) */}
            <SidebarGroupLabel className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider group-data-[collapsible=icon]:hidden">
              {group.group}
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-1">
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.name} // Hiện tooltip khi thu gọn sidebar icon
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20 hover:bg-indigo-600 hover:text-white"
                            : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                        }`}
                      >
                        <Link href={item.href}>
                          <item.icon
                            className={`h-5 w-5 shrink-0 ${
                              isActive ? "text-white" : "text-slate-400"
                            }`}
                          />
                          <span className="text-sm tracking-wide group-data-[collapsible=icon]:hidden">
                            {item.name}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* 3. SIDEBAR FOOTER: Khu vực Tài khoản Admin cao cấp */}
      <SidebarFooter className="p-3 border-t border-slate-800 bg-slate-900/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full h-12 flex items-center justify-between p-2 rounded-xl text-slate-300 hover:bg-slate-800 transition-all group-data-[collapsible=icon]:justify-center">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7 border border-indigo-500">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Admin Avatar"
                      />
                      <AvatarFallback className="bg-indigo-700 text-white text-xs">
                        AP
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left leading-none group-data-[collapsible=icon]:hidden">
                      <span className="text-sm font-bold text-white">
                        Trọng Phú
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        Tổng thủ thư
                      </span>
                    </div>
                  </div>
                  <ChevronUp className="h-4 w-4 text-slate-500 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-52 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl p-1 shadow-xl mb-2"
              >
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-slate-700 cursor-pointer transition-colors">
                  <UserCheck className="h-4 w-4 text-slate-400" />
                  Hồ sơ cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-400 cursor-pointer transition-colors">
                  <Link href="http://localhost:3000/">
                    <LogOut className="h-4 w-4" />
                    Đăng xuất hệ thống
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
