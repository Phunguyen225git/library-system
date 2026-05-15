// src/components/layout/navbar.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/src/components/ui/button";
import { BookOpen, LogOut, User } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="http://localhost:3000/"
            className="flex items-center gap-2"
          >
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-slate-800">ThuVienIT</span>
          </Link>

          {/* Menu bên phải */}
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Xin chào, {session.user?.name || "Độc giả"}
                </div>

                {/* Nút vào Admin nếu là ADMIN */}
                {/*eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(session.user as any)?.role === "ADMIN" && (
                  <Link href="/admin/books">
                    <Button variant="outline" size="sm">
                      Quản trị
                    </Button>
                  </Link>
                )}

                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button>Đăng nhập</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
