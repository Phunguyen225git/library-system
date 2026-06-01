// src/app/dashboard/components/DashboardStats.tsx
"use client";

import { BookOpen, History, AlertCircle, Trophy, Loader2 } from "lucide-react";

interface DashboardStatsProps {
  stats?: {
    currentBorrowing: number;
    totalBorrowed: number;
    overdueCount: number;
    membershipRank: string;
  };
  loading?: boolean;
}

export default function DashboardStats({
  stats,
  loading,
}: DashboardStatsProps) {
  // Dữ liệu giả lập mặc định nếu chưa có props truyền xuống
  const defaultStats = stats || {
    currentBorrowing: 0,
    totalBorrowed: 0,
    overdueCount: 0,
    membershipRank: "Thành viên mới",
  };

  const statCards = [
    {
      label: "Đang mượn",
      value: defaultStats.currentBorrowing,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      label: "Tổng lượt mượn",
      value: defaultStats.totalBorrowed,
      icon: History,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
    },
    {
      label: "Vi phạm / Quá hạn",
      value: defaultStats.overdueCount,
      icon: AlertCircle,
      // Tự động đổi màu đỏ rực nếu có đơn quá hạn thực tế
      color:
        defaultStats.overdueCount > 0 ? "text-rose-600" : "text-emerald-600",
      bgColor: defaultStats.overdueCount > 0 ? "bg-rose-50" : "bg-emerald-50",
      borderColor:
        defaultStats.overdueCount > 0
          ? "border-rose-100"
          : "border-emerald-100",
    },
    {
      label: "Hạng độc giả",
      value: defaultStats.membershipRank,
      icon: Trophy,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-3xl border ${card.borderColor} ${card.bgColor} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3 group`}
        >
          <div className="flex items-center justify-between">
            <div
              className={`p-2.5 rounded-xl bg-white shadow-sm ${card.color}`}
            >
              <card.icon className="w-5 h-5" />
            </div>
            {/* Hiệu ứng chấm nhỏ nếu là thẻ quan trọng (Quá hạn) */}
            {card.label === "Vi phạm / Quá hạn" &&
              defaultStats.overdueCount > 0 && (
                <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
              )}
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
              {card.label}
            </p>
            {loading ? (
              <div className="mt-1">
                <Loader2 className="w-5 h-5 animate-spin text-slate-300" />
              </div>
            ) : (
              <h3 className={`text-xl font-black mt-0.5 ${card.color}`}>
                {card.value}
              </h3>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
