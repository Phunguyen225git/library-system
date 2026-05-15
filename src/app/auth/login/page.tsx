// src/app/login/page.tsx
import { Metadata } from "next";
import { LoginForm } from "@/src/components/auth/FormLogin";

// Lợi ích cực lớn khi tách file: Bạn có thể thêm Metadata SEO ở đây
export const metadata: Metadata = {
  title: "Đăng nhập | ThuVienIT",
  description: "Đăng nhập vào hệ thống quản lý thư viện",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4">
      <LoginForm />
    </div>
  );
}
