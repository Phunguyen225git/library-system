// src/components/payment-qr-modal.tsx
"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaymentQRModalProps {
  recordId: string;
  qrCodeUrl: string;
  description: string;
  amount: number;
  onClose?: () => void;
}

export function PaymentQRModal({
  recordId,
  qrCodeUrl,
  description,
  amount,
  onClose,
}: PaymentQRModalProps) {
  const [status, setStatus] = useState("PENDING_PAYMENT");
  const router = useRouter();

  useEffect(() => {
    // ⏰ Cứ 3 giây gọi API kiểm tra xem Webhook đã cập nhật trạng thái đơn thành công chưa
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/borrow/status?id=${recordId}`);
        const result = await res.json();

        if (result.status === "BORROWED") {
          setStatus("SUCCESS");
          clearInterval(interval); // Chuyển khoản thành công thì dừng việc hỏi ngầm lại
        }
      } catch (err) {
        console.error("Lỗi kiểm tra trạng thái tự động");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [recordId]);

  return (
    <div className="bg-card text-card-foreground p-8 rounded-2xl border max-w-md mx-auto text-center shadow-xl bg-white dark:bg-zinc-950">
      {status === "PENDING_PAYMENT" ? (
        <>
          <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
            Quét Mã QR Thanh Toán
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Vui lòng giữ nguyên nội dung chuyển khoản hệ thống đã ghi
          </p>

          {/* HIỂN THỊ MÃ QR */}
          <div className="my-5 p-3 bg-white rounded-xl inline-block border border-slate-100 shadow-inner">
            <img src={qrCodeUrl} alt="VietQR Code" className="w-56 h-56" />
          </div>

          {/* THÔNG TIN CHI TIẾT ĐƠN HÀNG */}
          <div className="bg-slate-50 dark:bg-zinc-900 p-3 rounded-xl text-left space-y-1.5 text-sm font-semibold border border-dashed">
            <div className="flex justify-between">
              <span className="text-slate-500">Số tiền:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                {amount.toLocaleString()} đ
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Nội dung CK:</span>
              <span className="text-amber-500 font-bold uppercase">
                {description}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
            <span>Hệ thống đang kiểm tra biến động số dư...</span>
          </div>
        </>
      ) : (
        /* GIAO DIỆN KHI CHUYỂN KHOẢN THÀNH CÔNG */
        <div className="py-6 animate-fade-in">
          <CheckCircle2
            className="w-16 h-16 text-emerald-500 mx-auto"
            strokeWidth={2.5}
          />
          <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mt-4">
            Thanh Toán Thành Công!
          </h3>
          <p className="text-sm text-muted-foreground mt-1 px-2">
            Hệ thống đã ghi nhận tiền của bạn vào cơ sở dữ liệu. Bạn có thể đến
            quầy thư viện để nhận sách ngay.
          </p>
          <button
            onClick={() => {
              if (onClose) onClose();
              router.push("/user/my-borrows"); // Đổi thành link trang lịch sử mượn của bạn
            }}
            className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
          >
            Xem danh sách phiếu mượn
          </button>
        </div>
      )}
    </div>
  );
}
