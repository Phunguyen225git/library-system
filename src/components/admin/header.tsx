// src/components/admin/header.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/src/components/ui/button";
import { LogOut, User as UserIcon } from "lucide-react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="font-medium text-slate-600">Trang Quản Trị Hệ Thống</div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <UserIcon className="w-4 h-4" />
          <span>{session?.user?.name || session?.user?.email}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </header>
  );
}
