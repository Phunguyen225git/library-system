// src/app/admin/loans/components/LoanFilters.tsx
import { Search } from "lucide-react";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export default function BorrowFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: FiltersProps) {
  return (
    <div className="bg-white border rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
      {/* Tìm kiếm tên độc giả hoặc mã đơn */}
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm tên độc giả, mã phiếu, tên sách..."
          className="w-full pl-10 pr-4 py-2 border rounded-xl bg-gray-50 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
        />
      </div>

      {/* Lọc theo trạng thái đơn */}
      <div className="flex gap-2 w-full sm:w-auto justify-end">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl px-3 py-2 bg-white text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="ALL"> tất cả trạng thái </option>
          <option value="PENDING_PAYMENT">⏳ Chờ thanh toán QR</option>
          <option value="AWAITING_PICKUP">📦 Chờ ra quầy nhận sách</option>
          <option value="BORROWED">📖 Đang mượn</option>
          <option value="RETURNED">✅ Đã trả xong</option>
          <option value="OVERDUE_PENDING_FINE">⚠️ Quá hạn chưa nộp phạt</option>
        </select>
      </div>
    </div>
  );
}
