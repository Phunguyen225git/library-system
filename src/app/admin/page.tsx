"use client";
import { TrendingUp } from "lucide-react";
import { Button } from "@/src/components/ui/button";

// Import các mảnh ghép vừa tách rời
import { CardStats } from "@/src/components/admin/dashboard/card-stats";
import { ChartsOverview } from "@/src/components/admin/dashboard/charts-overview";
import { RecentActivities } from "@/src/components/admin/dashboard/recent-activities";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* TIÊU ĐỀ DASHBOARD */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Tổng Quan Hệ Thống
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Số liệu thống kê thời gian thực của thư viện điện tử tính đến hôm
            nay.
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-4 h-11 flex items-center gap-2 shadow-lg shadow-indigo-600/20">
          <TrendingUp className="w-5 h-5" />
          Xuất báo cáo định kỳ
        </Button>
      </div>

      {/* 1. Các thẻ số liệu */}
      <CardStats />

      {/* 2. Khu vực biểu đồ đồ thị */}
      <ChartsOverview />

      {/* 3. Nhật ký hoạt động gần đây */}
      <RecentActivities />
    </div>
  );
}
