/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"; // (Giữ thư viện gốc phòng sau này dùng)

// Giả lập kết nối DB để bạn dễ hình dung logic
export async function POST(req: Request) {
  try {
    const { userId, bookId, rentDays, paymentMethod } = await req.json();

    if (!userId || !bookId || !rentDays || !paymentMethod) {
      return NextResponse.json(
        { error: "Thiếu thông tin đăng ký!" },
        { status: 400 }
      );
    }

    // 1. Giả định lấy thông tin sách từ DB để biết giá tiền/ngày (Ví dụ lấy sách lập trình)
    const pricePerDay = 3000; // Giả sử cuốn này giá 3.000đ một ngày mượn
    const bookTitle = "Lập trình Next.js từ cơ bản đến nâng cao";

    // 2. Tính toán tiền nong và ngày hẹn trả
    const totalAmount = pricePerDay * parseInt(rentDays);
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + parseInt(rentDays));

    // Tạo mã phiếu mượn ngẫu nhiên
    const recordId = "BR" + Math.floor(100000 + Math.random() * 900000);

    // 3. Xử lý theo từng Phương thức thanh toán độc giả chọn
    if (paymentMethod === "CASH") {
      return NextResponse.json({
        success: true,
        message:
          "Đăng ký thành công! Vui lòng đến quầy thư viện thanh toán tiền mặt để nhận sách.",
        data: {
          recordId,
          amount: totalAmount,
          status: "AWAITING_PICKUP", // Chờ ra quầy thanh toán trực tiếp rồi lấy sách
          dueDate: dueDate.toISOString(),
        },
      });
    }

    if (paymentMethod === "BANK_TRANSFER") {
      // Thiết lập thông tin Ngân hàng của bạn nhận tiền cọc/phí mượn
      const BANK_ID = "MB"; // Ngân hàng Quân Đội (Hoặc VCB, TCB...)
      const ACCOUNT_NO = "0987654321"; // STK của bạn
      const ACCOUNT_NAME = "NGUYEN TRONG PHU";
      const description = `MUONSACH ${recordId}`; // Cú pháp để hệ thống nhận diện tự động

      // Sinh mã QR điền sẵn SỐ TIỀN và NỘI DUNG CHUYỂN KHOẢN
      const qrCodeUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-qr_only.png?amount=${totalAmount}&addInfo=${encodeURIComponent(
        description
      )}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

      return NextResponse.json({
        success: true,
        message: "Vui lòng quét mã QR để thanh toán chuyển khoản.",
        data: {
          recordId,
          amount: totalAmount,
          status: "PENDING_PAYMENT", // Chờ hệ thống quét nhận được tiền
          dueDate: dueDate.toISOString(),
          qrCodeUrl,
          description,
        },
      });
    }

    return NextResponse.json(
      { error: "Phương thức thanh toán không hợp lệ" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
