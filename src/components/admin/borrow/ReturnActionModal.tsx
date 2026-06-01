// src/app/admin/loans/components/ReturnActionModal.tsx
"use client";
import { useState, useEffect } from "react";
import { X, Calendar, AlertCircle } from "lucide-react";
import { calculateOverdue } from "@/lib/utils"; // Giả định hàm tính toán ngày quá hạn của bạn

interface ModalProps {
  borrow: any | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReturnActionModal({
  borrow,
  onClose,
  onSuccess,
}: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [overdueInfo, setOverdueInfo] = useState({
    isOverdue: false,
    overdueDays: 0,
    fineAmount: 0,
  });

  useEffect(() => {
    if (borrow) {
      // Phạt mặc định 5,000đ / ngày nếu trả quá hạn gốc
      const check = calculateOverdue(borrow.dueDate, 5000);
      setOverdueInfo(check);
    }
  }, [borrow]);

  if (!borrow) return null;

  const handleConfirmReturn = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/borrow/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrowId: borrow.id, dueDate: borrow.dueDate }),
      });
      const result = await res.json();
      if (result.success) {
        alert(result.message);
        onSuccess();
      } else {
        alert("Lỗi: " + result.error);
      }
    } catch (e) {
      alert("Lỗi kết nối mạng!");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Xử Lý Thủ Tục Trả Sách
        </h3>

        {/* Thông tin đơn mượn */}
        <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border mb-4">
          <p>
            <strong>Mã phiếu:</strong>{" "}
            <span className="uppercase text-indigo-600 font-mono font-bold">
              {borrow.paymentCode || borrow.id.slice(-6)}
            </span>
          </p>
          <p>
            <strong>Độc giả:</strong> {borrow.user?.name || "Ẩn danh"}
          </p>
          <p>
            <strong>Cuốn sách:</strong> {borrow.book?.title}
          </p>
          <p className="flex items-center gap-1.5 mt-1 text-xs text-amber-600">
            <Calendar className="w-3.5 h-3.5" /> Hạn trả gốc:{" "}
            {new Date(borrow.dueDate).toLocaleDateString("vi-VN")}
          </p>
        </div>

        {/* Khối cảnh báo nếu quá hạn */}
        {overdueInfo.isOverdue ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 text-red-900 text-sm mb-6">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-red-700">
                Cảnh báo: Trả quá hạn!
              </strong>
              <p className="text-xs text-red-600 mt-0.5">
                Độc giả trả muộn{" "}
                <span className="font-bold text-red-700">
                  {overdueInfo.overdueDays} ngày
                </span>
                .
              </p>
              <p className="text-base font-black text-red-700 mt-1">
                Phí phạt tích lũy: {overdueInfo.fineAmount.toLocaleString()}đ
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm mb-6 font-medium text-center">
            🎉 Phiếu mượn đúng hạn! Không phát sinh phí phạt.
          </div>
        )}

        {/* Nút bấm */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 border font-medium py-2.5 rounded-xl text-gray-700 hover:bg-gray-50 transition-all text-sm"
          >
            Hủy lệnh
          </button>
          <button
            onClick={handleConfirmReturn}
            disabled={loading}
            className={`w-1/2 text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-md ${
              overdueInfo.isOverdue
                ? "bg-red-600 hover:bg-red-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Đang ghi nhận..." : "Xác Nhận Trả Sách"}
          </button>
        </div>
      </div>
    </div>
  );
}
