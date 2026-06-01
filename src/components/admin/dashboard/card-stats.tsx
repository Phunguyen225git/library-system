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
  const [stats, setStats] = useState({
    totalBooks: 0,
    newBooksThisWeek: 0,
    totalUsers: 0,
    newUsersThisWeek: 0,
    totalBorrows: 0,
    newBorrowsThisWeek: 0,
    totalOverdue: 0, // 🌟 THÊM: Quản lý thêm dữ liệu quá hạn thật
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Gọi song song các đầu API thống kê
        const [booksRes, usersRes, borrowsRes] = await Promise.all([
          fetch("/api/books/stats"),
          fetch("/api/users/stats"),
          fetch("/api/borrows/stats"),
        ]);

        const booksData = booksRes.ok
          ? await booksRes.json()
          : { success: false };
        const usersData = usersRes.ok
          ? await usersRes.json()
          : { success: false };
        const borrowsData = borrowsRes.ok
          ? await borrowsRes.json()
          : { success: false };

        setStats({
          totalBooks: booksData.success ? booksData.totalBooks : 0,
          newBooksThisWeek: booksData.success ? booksData.newBooksThisWeek : 0,
          totalUsers: usersData.success ? usersData.totalUsers : 0,
          newUsersThisWeek: usersData.success ? usersData.newUsersThisWeek : 0,
          totalBorrows: borrowsData.success ? borrowsData.totalBorrows : 0,
          newBorrowsThisWeek: borrowsData.success
            ? borrowsData.newBorrowsThisWeek
            : 0,
          totalOverdue: borrowsData.success ? borrowsData.totalOverdue || 0 : 0, // 🌟 Nhận data quá hạn nếu API có trả về
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
      {/* 🟢 THÈ 1: TỔNG ĐẦU SÁCH */}
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

      {/* 🟢 THẺ 2: TỔNG ĐỘC GIẢ */}
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

      {/* 🟡 THẺ 3: SÁCH ĐANG MƯỢN NGOÀI (ĐÃ SỬA LỖI ĐỔ DỮ LIỆU CHUẨN) */}
      <Card className="border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-950 hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
            Sách đang mượn ngoài
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
            <FileClock className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-9 flex items-center">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : (
            <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
              {stats.totalBorrows.toLocaleString()}{" "}
              {/* 🌟 SỬA: Đổi từ totalUsers sang totalBorrows */}
            </div>
          )}
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
            <span>+{stats.newBorrowsThisWeek} lượt mượn</span>{" "}
            {/* 🌟 SỬA: Đổi thông báo chữ số */}
            <span className="text-slate-400 font-normal">tuần này</span>
          </p>
        </CardContent>
      </Card>

      {/* 🔴 THẺ 4: VI PHẠM QUÁ HẠN (ĐÃ THÊM TRẠNG THÁI LOADING ĐỒNG BỘ) */}
      <Card className="border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-950 hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
            Vi phạm / Quá hạn
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
            <BadgeAlert className="w-5 h-5" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-9 flex items-center">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : (
            <div className="text-3xl font-black text-rose-600">
              {stats.totalOverdue.toLocaleString()}{" "}
              {/* 🌟 CẬP NHẬT: Lấy từ stats thật */}
            </div>
          )}
          <p className="text-xs font-semibold text-rose-500 mt-2">
            {stats.totalOverdue > 0
              ? "Cần gửi email nhắc nhở thu hồi sách ngay"
              : "Thư viện hiện tại sạch bóng vi phạm 🎉"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
