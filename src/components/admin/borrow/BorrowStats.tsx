// src/app/admin/loans/components/LoanStats.tsx
import { BookOpen, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface StatsProps {
  stats: {
    total: number;
    borrowed: number;
    overdue: number;
    returned: number;
  };
}

export default function BorrowStats({ stats }: StatsProps) {
  const cardData = [
    {
      title: "Tổng phiếu mượn",
      value: stats.total,
      icon: BookOpen,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Đang mượn (Chưa trả)",
      value: stats.borrowed,
      icon: Clock,
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "Vi phạm quá hạn",
      value: stats.overdue,
      icon: AlertTriangle,
      color: "text-red-600 bg-red-50",
    },
    {
      title: "Đã trả xong",
      value: stats.returned,
      icon: CheckCircle,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cardData.map((card, idx) => (
        <div
          key={idx}
          className="bg-white border p-5 rounded-2xl flex items-center justify-between shadow-sm"
        >
          <div>
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {card.value}
            </h3>
          </div>
          <div className={`p-3 rounded-xl ${card.color}`}>
            <card.icon className="w-6 h-6" />
          </div>
        </div>
      ))}
    </div>
  );
}
