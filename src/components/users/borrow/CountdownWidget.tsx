"use client";

import { useState, useEffect } from "react";

export default function CountdownWidget() {
  const [mockActiveBorrow, setMockActiveBorrow] = useState({
    id: "BR888999",
    bookTitle: "Cấu trúc dữ liệu và Giải thuật",
    // eslint-disable-next-line react-hooks/purity
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Còn 2 ngày
  });

  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [fineAmount, setFineAmount] = useState<number>(0);

  useEffect(() => {
    const checkTimer = () => {
      const now = new Date();
      const due = new Date(mockActiveBorrow.dueDate);
      now.setHours(0, 0, 0, 0);
      due.setHours(0, 0, 0, 0);

      const diffTime = due.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 0) {
        setDaysLeft(diffDays);
        setFineAmount(0);
      } else {
        setDaysLeft(diffDays);
        setFineAmount(Math.abs(diffDays) * 5000); // Phạt 5.000đ/ngày quá hạn
      }
    };
    checkTimer();
  }, [mockActiveBorrow.dueDate]);

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          ⏳ Theo Dõi Sách Đang Mượn & Đếm Ngược
        </h2>
        <div className="border p-4 rounded-xl bg-gray-50">
          <span className="text-xs font-mono bg-gray-200 px-2 py-0.5 rounded text-gray-600">
            Mã phiếu: {mockActiveBorrow.id}
          </span>
          <h4 className="font-bold text-gray-800 text-base mt-2 mb-1">
            {mockActiveBorrow.bookTitle}
          </h4>
          <p className="text-xs text-gray-500">
            Hạn trả gốc:{" "}
            {new Date(mockActiveBorrow.dueDate).toLocaleDateString("vi-VN")}
          </p>

          <hr className="my-4 border-dashed" />

          {daysLeft > 0 && daysLeft <= 3 ? (
            <div className="bg-amber-100 border border-amber-200 p-4 rounded-xl text-amber-900 animate-pulse">
              <h5 className="font-bold text-base">
                ⚠️ CẢNH BÁO SẮP HẾT HẠN TRẢ!
              </h5>
              <p className="text-sm mt-1">
                Bạn chỉ còn đúng{" "}
                <span className="font-extrabold text-lg text-amber-700">
                  {daysLeft} ngày
                </span>{" "}
                để trả sách.
              </p>
            </div>
          ) : daysLeft < 0 ? (
            <div className="bg-red-100 border border-red-200 p-4 rounded-xl text-red-900">
              <h5 className="font-bold text-base text-red-700">
                🚨 ĐÃ QUÁ HẠN TRẢ SÁCH!
              </h5>
              <p className="text-sm mt-1">
                Sách của bạn đã trễ hẹn{" "}
                <span className="font-extrabold text-lg">
                  {Math.abs(daysLeft)} ngày
                </span>
                .
              </p>
              <div className="mt-3 bg-white/70 p-3 rounded-lg border border-red-300">
                <p className="text-xs font-semibold text-gray-600">
                  Tiền phạt phát sinh cộng dồn:
                </p>
                <p className="text-2xl font-black text-red-600 mt-1">
                  {fineAmount.toLocaleString()}đ
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-100 border border-green-200 p-4 rounded-xl text-green-900">
              <h5 className="font-bold text-base">✅ SÁCH CÒN HẠN AN TOÀN</h5>
              <p className="text-sm mt-1">
                Thời gian mượn của bạn còn dài:{" "}
                <span className="font-extrabold text-lg text-green-700">
                  {daysLeft} ngày
                </span>
                .
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() =>
              setMockActiveBorrow({
                ...mockActiveBorrow,
                dueDate: new Date(
                  Date.now() + 10 * 24 * 60 * 60 * 1000
                ).toISOString(),
              })
            }
            className="text-[10px] border p-1 rounded hover:bg-gray-100 font-semibold text-gray-700"
          >
            🟢 Còn hạn dài
          </button>
          <button
            onClick={() =>
              setMockActiveBorrow({
                ...mockActiveBorrow,
                dueDate: new Date(
                  Date.now() + 2 * 24 * 60 * 60 * 1000
                ).toISOString(),
              })
            }
            className="text-[10px] border p-1 rounded hover:bg-gray-100 font-semibold text-gray-700"
          >
            🟡 Sắp hết hạn
          </button>
          <button
            onClick={() =>
              setMockActiveBorrow({
                ...mockActiveBorrow,
                dueDate: new Date(
                  Date.now() - 4 * 24 * 60 * 60 * 1000
                ).toISOString(),
              })
            }
            className="text-[10px] border p-1 rounded hover:bg-gray-100 font-semibold text-gray-700"
          >
            🔴 Quá hạn 4 ngày
          </button>
        </div>
      </div>
    </div>
  );
}
