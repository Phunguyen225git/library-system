// src/app/register/page.tsx
import { RegisterForm } from "@/src/components/auth/FormRegister";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản | ThuVienIT",
  description: "Đăng ký tài khoản để trải nghiệm hệ thống thư viện.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
