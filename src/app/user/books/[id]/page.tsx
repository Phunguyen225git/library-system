/* eslint-disable @typescript-eslint/no-explicit-any */
// Thao tác tại file Giao diện đặt mượn sách của bạn (Ví dụ: src/app/books/[id]/page.tsx)
"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/src/components/ui/dialog"; // Import Dialog của Shadcn
import { PaymentQRModal } from "@/src/components/users/borrow/PaymentQrModal"; // Import Component ở Bước 1
import { Button } from "@/src/components/ui/button";

export default function BookOrderSection() {
  // 🌟 1. Tạo 2 cái State để kiểm soát việc ẩn hiện Popup và lưu dữ liệu QR
  const [isOpenQR, setIsOpenQR] = useState(false);
  const [qrInfo, setQrInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 🌟 2. Hàm xử lý khi khách click nút "Chuyển khoản QR"
  const handleCheckoutQR = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/borrow/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "id_cua_user_hien_tai", // Truyền ID người dùng đang đăng nhập vào đây
          bookId: "id_cua_cuon_sach", // Truyền ID cuốn sách đang chọn
          rentDays: "7", // Số ngày mượn sách
          paymentMethod: "BANK_TRANSFER", // ⚠️ Gửi đúng chữ BANK_TRANSFER lên để API nhận diện đúng chuyển khoản
        }),
      });

      const result = await response.json();

      if (result.success && result.data.qrCodeUrl) {
        // 🌟 Bước mấu chốt: Nạp cục dữ liệu (có link QR, có mã nội dung) vào State
        setQrInfo(result.data);
        // 🌟 Bước mấu chốt: Ra lệnh kích hoạt mở toang cái Popup Dialog lên!
        setIsOpenQR(true);
      } else {
        alert(result.error || "Không thể khởi tạo mã QR thanh toán.");
      }
    } catch (error) {
      alert("Lỗi kết nối mạng đến hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-card rounded-2xl border">
      <h2 className="text-lg font-bold mb-4">Chọn phương thức thanh toán</h2>

      {/* NÚT BẤM CỦA BẠN */}
      <Button
        onClick={handleCheckoutQR}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full h-11 rounded-xl"
      >
        {loading ? "Đang tạo mã QR..." : "Thanh toán bằng chuyển khoản QR"}
      </Button>

      {/* 🌟 3. KHUNG DIALOG CHỨA POPUP (Nó sẽ ẩn ngầm, chỉ bật lên khi isOpenQR === true) */}
      <Dialog open={isOpenQR} onOpenChange={setIsOpenQR}>
        <DialogContent className="sm:max-w-md p-0 border-none bg-transparent shadow-none">
          {qrInfo && (
            <PaymentQRModal
              recordId={qrInfo.id} // ID của phiếu mượn mới tạo
              qrCodeUrl={qrInfo.qrCodeUrl} // Đường dẫn ảnh QR ngân hàng cấp
              description={qrInfo.description} // Nội dung chuyển khoản bắt buộc (LIB24xxx)
              amount={qrInfo.amount} // Tổng số tiền cần đóng
              onClose={() => setIsOpenQR(false)} // Hàm để đóng popup khi cần
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
