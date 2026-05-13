// src/app/admin/layout.tsx
import { Sidebar } from "@/src/components/admin/sidebar";
import { Header } from "@/src/components/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Cột bên trái: Sidebar */}
      <Sidebar />

      {/* Cột bên phải: Chứa Header và Nội dung thay đổi (children) */}
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Vùng hiển thị nội dung của từng trang (ví dụ: page quản lý sách) */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
