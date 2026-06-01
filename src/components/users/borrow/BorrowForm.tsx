/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { PaymentQRModal } from "@/src/components/users/borrow/PaymentQrModal";
import { X } from "lucide-react";

export default function BorrowForm({
  bookId,
  pricePerDay = 0,
  userId = "user999",
}: {
  bookId: string;
  pricePerDay: number;
  userId?: string;
}) {
  const [rentDays, setRentDays] = useState<number>(7);
  const [payMethod, setPayMethod] = useState<string>("CASH");
  const [loading, setLoading] = useState(false);

  // 🌟 State quản lý Popup hiển thị QR
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQrData] = useState<any>(null);

  const currentTotalCost = rentDays * pricePerDay;

  const handleRegisterBorrow = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/borrow/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId, // 🌟 ĐÃ SỬA: Lấy đúng biến userId từ props truyền xuống
          bookId: bookId, // 🌟 ĐÃ SỬA: Lấy đúng biến bookId từ props truyền xuống
          rentDays,
          paymentMethod: payMethod, // Sẽ gửi "CASH" hoặc "BANK_TRANSFER"
        }),
      });

      const result = await res.json();

      if (result.success) {
        if (payMethod === "BANK_TRANSFER") {
          // Thêm log kiểm tra xem server có thực sự trả về link ảnh QR không
          if (result.data?.qrCodeUrl) {
            setQrData(result.data);
            setShowQRModal(true);
          } else {
            alert(
              "⚠️ Lỗi hệ thống: Đăng ký thành công mã BANK_TRANSFER nhưng máy chủ quên sinh mã QR Code!"
            );
          }
        } else {
          alert(
            result.message || "Đăng ký thành công! Vui lòng ra quầy nhận sách."
          );
        }
      } else {
        alert("Thất bại: " + result.error);
      }
    } catch (e) {
      alert("Lỗi kết nối mạng đến hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        📝 Đăng Ký Mượn Sách Mới
      </h2>
      <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl mb-4 text-sm text-indigo-900">
        <strong>Đơn giá mượn:</strong>{" "}
        {pricePerDay ? pricePerDay.toLocaleString() : "0"}đ / ngày
      </div>

      {/* Lựa chọn số ngày mượn */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Số ngày muốn mượn:
        </label>
        <select
          value={rentDays}
          onChange={(e) => setRentDays(Number(e.target.value))}
          className="w-full border rounded-xl p-2.5 bg-white text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={3}>
            3 ngày (Phí: {(3 * pricePerDay).toLocaleString()}đ)
          </option>
          <option value={7}>
            7 ngày (Phí: {(7 * pricePerDay).toLocaleString()}đ)
          </option>
          <option value={14}>
            14 ngày (Phí: {(14 * pricePerDay).toLocaleString()}đ)
          </option>
          <option value={30}>
            30 ngày (Phí: {(30 * pricePerDay).toLocaleString()}đ)
          </option>
        </select>
      </div>

      {/* Lựa chọn phương thức thanh toán */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phương thức thanh toán:
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPayMethod("CASH")}
            className={`p-3 border rounded-xl font-medium text-sm text-center transition-all ${
              payMethod === "CASH"
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            💵 Tiền mặt tại quầy
          </button>
          <button
            type="button"
            onClick={() => setPayMethod("BANK_TRANSFER")}
            className={`p-3 border rounded-xl font-medium text-sm text-center transition-all ${
              payMethod === "BANK_TRANSFER"
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            💳 Chuyển khoản QR
          </button>
        </div>
      </div>

      {/* Hiển thị chi phí tạm tính */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-6 border border-dashed">
        <span className="text-sm font-medium text-gray-500">
          Tổng chi phí tạm tính:
        </span>
        <span className="text-xl font-extrabold text-indigo-600">
          {currentTotalCost.toLocaleString()}đ
        </span>
      </div>

      {/* Nút kích hoạt xác nhận */}
      <button
        onClick={handleRegisterBorrow}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all"
      >
        {loading ? "Đang xử lý..." : "Xác Nhận Đăng Ký Mượn Sách"}
      </button>

      {/* 🌟 POPUP KHI CLICK CHỌN THANH TOÁN QR - SẼ ĐÈ LÊN TOÀN MÀN HÌNH */}
      {showQRModal && qrData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-md">
            {/* Nút bấm đóng Popup */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 z-10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gọi Cấu phần Modal QR Code thật của bạn */}
            <PaymentQRModal
              recordId={qrData.id}
              qrCodeUrl={qrData.qrCodeUrl}
              description={qrData.description}
              amount={qrData.amount}
              onClose={() => setShowQRModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
