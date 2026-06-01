// src/app/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  BookOpen,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";

export default async function RootPage() {
  // 🌟 1. Kiểm tra Session từ Server-side
  const session = await getServerSession(authOptions);

  // 🌟 2. Nếu đã đăng nhập, tự động "đá" người dùng vào trang Dashboard chính
  if (session) {
    redirect("/user/dashboard");
  }

  // 🌟 3. Nếu CHƯA đăng nhập, hiển thị giao diện Landing Page giới thiệu
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* 🔹 THANH HEADER TRÊN CÙNG */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-black text-lg tracking-tight bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              LibSpace
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              href="/auth/register"
              className="text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              Đăng ký độc giả
            </Link>
          </div>
        </div>
      </header>

      {/* 🔹 PHẦN THÂN CHÍNH (HERO SECTION) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 py-16 lg:py-24">
        {/* Bên trái: Nội dung giật tít kêu gọi */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
            🎉 Chào mừng đến với Thư viện số thế hệ mới
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-none">
            Mượn sách tri thức <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Chỉ với 1 chạm
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto lg:mx-0">
            Hệ thống quản lý mượn trả trực tuyến hiện đại. Đặt giữ sách online,
            quét mã QR nhận sách tại quầy trong 30 giây, tự động tính toán hạn
            trả và tối ưu hóa trải nghiệm đọc của bạn.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="/auth/login"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 group text-sm"
            >
              Khám phá Thư viện ngay
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all text-sm text-center"
            >
              Tìm hiểu tính năng
            </Link>
          </div>

          {/* Chỉ số phụ tạo uy tín */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-dashed max-w-md mx-auto lg:mx-0">
            <div>
              <h4 className="text-2xl font-black text-slate-900">10k+</h4>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Đầu sách số
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">5k+</h4>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Độc giả tin dùng
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">4.9</h4>
              <p className="text-xs font-bold text-slate-400 uppercase flex items-center justify-center lg:justify-start gap-0.5">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Đánh
                giá
              </p>
            </div>
          </div>
        </div>

        {/* Bên phải: Khối đồ họa minh họa tính năng */}
        <div className="flex-1 w-full max-w-md lg:max-w-none relative">
          <div className="absolute inset-0 bg-linear-to-tr from-indigo-500 to-blue-500 rounded-3xl rotate-3 scale-102 opacity-10 blur-lg"></div>
          <div className="bg-white border p-6 rounded-3xl shadow-xl relative space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">
              💡 Quy trình mượn trả siêu tốc
            </h3>

            <div className="space-y-3">
              {[
                {
                  step: "01",
                  title: "Tìm kiếm & Đặt sách",
                  desc: "Lựa chọn cuốn sách yêu thích trên kho dữ liệu trực tuyến.",
                },
                {
                  step: "02",
                  title: "Nhận mã QR hẹn giờ",
                  desc: "Hệ thống cấp mã QR code định danh phiếu mượn của bạn.",
                },
                {
                  step: "03",
                  title: "Quét mã tại quầy",
                  desc: "Admin phê duyệt giao sách chỉ trong vòng 30 giây.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-black text-xs flex items-center justify-center shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-950">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 🔹 PHẦN FOOTER DƯỚI CÙNG */}
      <footer className="border-t bg-white py-6 text-center text-xs font-medium text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          © {new Date().getFullYear()} LibSpace - Hệ thống vận hành thư viện số
          thông minh. Powered by MariaDB & Next.js.
        </div>
      </footer>
    </div>
  );
}
// // src/app/dashboard/page.tsx
// "use client";
// import { useState, useEffect } from "react";
// // import UserHero from "@/src/components/users/main/LibraryAnnouncements";
// // import QuickStats from "./components/QuickStats";
// // import BookGrid from "./components/BookGrid";
// // import OverdueAlert from "./components/OverdueAlert";
// import QuickMenu from "@/src/components/users/main/QuickMenu";
// import LibraryAnnouncements from "@/src/components/users/main/LibraryAnnouncements";
// import TopBorrowedBooks from "@/src/components/users/main/TopBorrowedBooks";

// export default function UserDashboardPage() {
//   const [books, setBooks] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [userDashboardData, setUserDashboardData] = useState({
//     overdueCount: 0,
//     stats: {
//       currentBorrowing: 1,
//       totalBorrowed: 8,
//       finePending: 0,
//       membershipRank: "Bạc (Silver)",
//     },
//   });

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await fetch("/api/books");
//         const data = await res.json();
//         setBooks(data.success ? data.books : data);
//       } catch (e) {
//         console.error("Lỗi tải danh sách sách");
//       }
//     };
//     fetchBooks();
//   }, []);

//   const filteredBooks = books.filter(
//     (book) =>
//       book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       book.category?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-slate-50/40 pb-12">
//       {/* Container căn giữa bố cục website */}
//       <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-2">
//         {/* 1. Cảnh báo khẩn cấp (Chỉ hiện khi bị quá hạn) */}
//         {/* <OverdueAlert overdueCount={userDashboardData.overdueCount} /> */}

//         {/* 2. Banner chính của Thư viện (Chứa ô tìm kiếm) */}
//         {/* <UserHero onSearch={(val) => setSearchTerm(val)} /> */}

//         {/* Bố cục chia 2 cột linh hoạt: Cột trái (Tính năng & Sách), Cột phải (Bảng tin & Chỉ số) */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//           {/* ⬅️ KHỐI TRÁI: CHIẾM 2/3 MÀN HÌNH */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Lối tắt tính năng mượn/trả/gia hạn */}
//             <QuickMenu />

//             {/* Sách thịnh hành, mượn nhiều */}
//             <TopBorrowedBooks />

//             {/* Tủ sách tìm kiếm, đề xuất */}
//             {/* <BookGrid books={filteredBooks} /> */}
//           </div>

//           {/* ➡️ KHỐI PHẢI: CHIẾM 1/3 MÀN HÌNH */}
//           <div className="space-y-6">
//             {/* Tình trạng thẻ thư viện cá nhân */}
//             <div>
//               <h3 className="text-lg font-black text-gray-800 tracking-tight mb-4">
//                 💳 Thẻ thư viện của bạn
//               </h3>
//               {/* <QuickStats stats={userDashboardData.stats} /> */}
//             </div>

//             {/* Bảng tin nội bộ từ thư viện */}
//             <LibraryAnnouncements />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
