/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/admin/loans/components/LoanTable.tsx
// import { Badge } from "@/src/components/ui/badge";

interface TableProps {
  borrows: any[];
  onOpenReturnModal: (borrow: any) => void;
}

export default function BorrowTable({
  borrows,
  onOpenReturnModal,
}: TableProps) {
  // Hàm tô màu tự động theo trạng thái của hệ thống mượn sách
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "BORROWED":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
            📖 Đang mượn
          </span>
        );
      case "RETURNED":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700">
            ✅ Đã trả
          </span>
        );
      case "AWAITING_PICKUP":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-700">
            📦 Chờ nhận
          </span>
        );
      case "OVERDUE_PENDING_FINE":
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700">
            ⚠️ Quá hạn phạt
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-600">
            ⏳ Chờ duyệt
          </span>
        );
    }
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 border-b text-gray-400 font-semibold">
              <th className="p-4">Mã Đơn</th>
              <th className="p-4">Độc Giả</th>
              <th className="p-4">Cuốn Sách</th>
              <th className="p-4">Ngày Mượn</th>
              <th className="p-4">Hạn Trả Gốc</th>
              <th className="p-4">Trạng Thái</th>
              <th className="p-4 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700 font-medium">
            {borrows.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-gray-400 font-normal"
                >
                  Không tìm thấy dữ liệu phiếu mượn trùng khớp.
                </td>
              </tr>
            ) : (
              borrows.map((borrow) => (
                <tr
                  key={borrow.id}
                  className="hover:bg-gray-50/70 transition-all"
                >
                  <td className="p-4 font-mono font-bold uppercase text-gray-900">
                    {borrow.paymentCode || borrow.id.slice(-6)}
                  </td>
                  <td className="p-4">
                    {borrow.user?.name || "Độc giả ẩn danh"}
                  </td>
                  <td className="p-4 max-w-xs truncate">
                    {borrow.book?.title}
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(borrow.borrowDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(borrow.dueDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-4">{getStatusBadge(borrow.status)}</td>
                  <td className="p-4 text-center">
                    {/* Chỉ cho phép nút Trả sách sáng lên nếu trạng thái đang mượn hoặc vi phạm quá hạn */}
                    {["BORROWED", "OVERDUE_PENDING_FINE"].includes(
                      borrow.status
                    ) ? (
                      <button
                        onClick={() => onOpenReturnModal(borrow)}
                        className="bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold px-3 py-1.5 rounded-xl text-xs transition-all shadow-sm"
                      >
                        Thu hồi & Trả
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-normal">
                        Đã hoàn thành
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
