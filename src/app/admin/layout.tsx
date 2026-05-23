// src/app/admin/layout.tsx
import { SidebarProvider } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/admin/sidebar";
import { Header } from "@/src/components/admin/header"; // 🌟 Import đúng file Header của bạn vào đây

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors">
        {/* Thanh điều hướng dọc bên trái */}
        <AppSidebar />

        {/* Khối nội dung chính bên phải */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* 🌟 Gọi Header xịn của bạn ở đây (Đã chứa sẵn nút bấm SidebarTrigger bên trong) */}
          <Header />

          {/* Nội dung ruột thay đổi theo từng trang con */}
          <div className="p-6 overflow-y-auto flex-1">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
