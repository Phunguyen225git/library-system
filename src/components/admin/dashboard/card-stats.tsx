// src/components/admin/dashboard/card-stats.tsx
"use client";

import { useEffect, useState } from "react";
import { BookOpen, Users, FileClock, BadgeAlert, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export function CardStats() {
  // 🌟 1. Mở rộng State để chứa cả số liệu Sách và Độc giả
  const [stats, setStats] = useState({
    totalBooks: 0,
    newBooksThisWeek: 0,
    totalUsers: 0, // Thêm trường này
    newUsersThisWeek: 0, // Thêm trường này
  });
  const [loading, setLoading] = useState(true);

  // 🌟 2. Gọi song song cả 2 API để tối ưu tốc độ tải trang
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Hãy chắc chắn đường dẫn API người dùng khớp với thư mục của b
        const [booksRes, usersRes] = await Promise.all([
          fetch("/api/books/stats/"),
          fetch("/api/users/stats"),
        ]);

        const booksData = await booksRes.json();
        const usersData = await usersRes.json();

        // Nạp đồng thời dữ liệu vào State
        setStats({
          totalBooks: booksData.success ? booksData.totalBooks : 0,
          newBooksThisWeek: booksData.success ? booksData.newBooksThisWeek : 0,
          totalUsers: usersData.success ? usersData.totalUsers : 0,
          newUsersThisWeek: usersData.success ? usersData.newUsersThisWeek : 0,
        });
      } catch (error) {
        console.error("❌ Lỗi gọi hệ thống API thống kê:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* 🟢 THẺ 1: TỔNG ĐẦU SÁCH (DATA THẬT) */}
      <Card className="border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-950 hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
            Tổng đầu sách
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-9 flex items-center">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : (
            <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {stats.totalBooks.toLocaleString()}
            </div>
          )}
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
            <span>+{stats.newBooksThisWeek} cuốn mới</span>{" "}
            <span className="text-slate-400 font-normal">trong tuần này</span>
          </p>
        </CardContent>
      </Card>

      {/* 🟢 THẺ 2: TỔNG ĐỘC GIẢ (BÂY GIỜ ĐÃ LÀ DATA THẬT) */}
      <Card className="border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-950 hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
            Độc giả kích hoạt
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-9 flex items-center">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : (
            <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {stats.totalUsers.toLocaleString()}
            </div>
          )}
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
            <span>+{stats.newUsersThisWeek} tài khoản</span>{" "}
            <span className="text-slate-400 font-normal">vừa đăng ký mới</span>
          </p>
        </CardContent>
      </Card>

      {/* 🟡 Thẻ 3: Đang mượn ngoài (Tạm thời giữ nguyên số ảo, xử lý sau) */}
      <Card className="border border-slate-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold uppercase text-slate-500 tracking-wider">
            Sách đang mượn ngoài
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <FileClock className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black text-slate-900">247</div>
          <p className="text-xs font-semibold text-slate-400 mt-2">
            Có <span className="text-amber-600 font-bold">18 phiếu</span> đang
            chờ duyệt ra quầy lấy
          </p>
        </CardContent>
      </Card>

      {/* 🟡 Thẻ 4: Vi phạm quá hạn (Tạm thời giữ nguyên số ảo, xử lý sau) */}
      <Card className="border border-slate-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold uppercase text-slate-500 tracking-wider">
            Vi phạm / Quá hạn
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
            <BadgeAlert className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-black text-rose-600">14</div>
          <p className="text-xs font-semibold text-rose-500 mt-2">
            Cần gửi email nhắc nhở thu hồi sách ngay
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
