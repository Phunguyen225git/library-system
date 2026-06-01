/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/admin/loans/page.tsx
"use client";
import { useState, useEffect } from "react";
import BorrowTable from "@/src/components/admin/borrow/BorrowTable";
import BorrowStats from "@/src/components/admin/borrow/BorrowStats";
import BorrowFilters from "@/src/components/admin/borrow/BorrowFilters";
import ReturnActionModal from "@/src/components/admin/borrow/ReturnActionModal";

export default function AdminBorrowManagementPage() {
  const [borrows, setBorrows] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  // 🌟 ĐÃ ĐỔI: selectedLoan -> selectedBorrow
  const [selectedBorrow, setSelectedBorrow] = useState<any | null>(null);

  // 🌟 ĐÃ ĐỔI: fetchLoansData -> fetchBorrowsData
  const fetchBorrowsData = async () => {
    try {
      // 💡 Gợi ý: Nếu bạn đổi cả tên folder API, hãy sửa endpoint này thành "/api/admin/borrows" nhé
      const res = await fetch("/api/admin/borrows");
      const data = await res.json();
      setBorrows(data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu phiếu mượn");
    }
  };

  useEffect(() => {
    fetchBorrowsData();
  }, []);

  // 🌟 ĐÃ ĐỔI: filteredLoans -> filteredBorrows
  const filteredBorrows = borrows.filter((borrow) => {
    const matchesSearch =
      borrow.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrow.book?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrow.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || borrow.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 🌟 ĐÃ ĐỔI: getStatsComputed tính toán dựa trên mảng borrows mới
  const getStatsComputed = () => {
    return {
      total: borrows.length,
      borrowed: borrows.filter((b) => b.status === "BORROWED").length,
      overdue: borrows.filter((b) => b.status === "OVERDUE_PENDING_FINE")
        .length,
      returned: borrows.filter((b) => b.status === "RETURNED").length,
    };
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50/50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Quản Lý Giao Dịch Mượn & Trả Sách
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Xử lý thu hồi sách, kiểm tra vi phạm quá hạn và nộp phạt của thư viện.
        </p>
      </div>

      {/* 1. Gọi mảnh thống kê */}
      <BorrowStats stats={getStatsComputed()} />

      {/* 2. Gọi mảnh thanh bộ lọc */}
      <BorrowFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* 3. Gọi mảnh bảng danh sách */}
      <BorrowTable
        borrows={filteredBorrows}
        onOpenReturnModal={(borrow: any) => setSelectedBorrow(borrow)}
      />

      {/* 4. Popup Xử lý trả sách (Chỉ xuất hiện khi click nút chọn) */}
      {selectedBorrow && (
        <ReturnActionModal
          borrow={selectedBorrow} // Giữ nguyên prop 'loan' nếu component ReturnActionModal chưa sửa giao diện nhận props
          onClose={() => setSelectedBorrow(null)}
          onSuccess={() => {
            setSelectedBorrow(null);
            fetchBorrowsData(); // Tải lại dữ liệu mới nhất sau khi trả thành công
          }}
        />
      )}
    </div>
  );
}
