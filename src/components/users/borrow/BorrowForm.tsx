/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

interface BorrowFormProps {
  pricePerDay: number;
}

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
  const [createdRecord, setCreatedRecord] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const currentTotalCost = rentDays * pricePerDay;

  const handleRegisterBorrow = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/borrow/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user-123",
          bookId: "book-abc",
          rentDays,
          paymentMethod: payMethod,
        }),
      });
      const result = await res.json();
      if (result.success) setCreatedRecord(result.data);
      else alert(result.error);
    } catch (e) {
      alert("Lỗi kết nối mạng!");
    }
    setLoading(false);
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

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-6 border border-dashed">
        <span className="text-sm font-medium text-gray-500">
          Tổng chi phí tạm tính:
        </span>
        <span className="text-xl font-extrabold text-indigo-600">
          {currentTotalCost.toLocaleString()}đ
        </span>
      </div>

      <button
        onClick={handleRegisterBorrow}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all"
      >
        {loading ? "Đang xử lý..." : "Xác Nhận Đăng Ký Mượn Sách"}
      </button>

      {createdRecord && (
        <div className="mt-6 p-4 border border-green-200 bg-green-50/50 rounded-xl">
          {createdRecord.qrCodeUrl ? (
            <div className="text-center">
              <img
                src={createdRecord.qrCodeUrl}
                alt="VietQR"
                className="w-48 h-48 mx-auto border p-2 bg-white rounded-lg shadow-sm mb-2"
              />
              <p className="text-xs text-gray-500 font-mono">
                Nội dung CK:{" "}
                <span className="font-bold text-red-600">
                  {createdRecord.description}
                </span>
              </p>
              <button
                onClick={() =>
                  alert("🎉 Đã nhận thành công số tiền mượn sách!")
                }
                className="mt-4 text-xs bg-green-600 text-white font-medium py-1.5 px-3 rounded-lg hover:bg-green-700"
              >
                ⚙️ Giả lập ngân hàng báo thành công
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-700 font-medium bg-white p-3 rounded-lg border">
              {createdRecord.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
