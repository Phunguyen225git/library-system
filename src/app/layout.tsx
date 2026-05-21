// // src/app/layout.tsx
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ChatBot } from "@/src/components/chat/chat-bot";

// import { AuthProvider } from "@/src/components/auth-provider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Library System",
//   description: "Hệ thống quản lý thư viện",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="vi">
//       <body className={inter.className}>
//         {/* 2. Bọc toàn bộ ứng dụng bằng AuthProvider */}
//         <AuthProvider>{children}</AuthProvider>
//         {/* UI Chat */}
//         <ChatBot />
//       </body>
//     </html>
//   );
// }
// src/app/admin/layout.tsx
// src/app/layout.tsx
import "@/src/app/globals.css"; // Hoặc đường dẫn css của bạn
import { AppProviders } from "@/src/components/auth-provider";

export const metadata = {
  title: "Hệ thống quản lý thư viện điện tử v2.0",
  description: "Xây dựng trên nền tảng Next.js & MariaDB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        {/* 🌟 Bọc cục bộ tất cả các cấu hình Session, Tooltip tại đây */}
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
