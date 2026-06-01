/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/borrow/create/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, bookId, rentDays, paymentMethod } = await req.json();

    // 1. Kiểm tra dữ liệu đầu vào
    if (!userId || !bookId || !rentDays || !paymentMethod) {
      return NextResponse.json(
        { error: "Thiếu thông tin đăng ký bắt buộc!" },
        { status: 400 }
      );
    }

    // 2. Kiểm tra tính hợp lệ của sách
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      return NextResponse.json(
        { error: "Không tìm thấy sách này!" },
        { status: 404 }
      );
    }
    if (book.available <= 0) {
      return NextResponse.json(
        { error: "Sách này hiện tại đã hết!" },
        { status: 400 }
      );
    }

    // 3. Tính toán tài chính & Ngày hạn trả
    const totalAmount = book.pricePerDay * Number(rentDays);
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + Number(rentDays));

    // Đồng bộ hóa trạng thái
    const statusBanDau =
      paymentMethod === "CASH" ? "AWAITING_PICKUP" : "PENDING_PAYMENT";

    // 4. CHẠY TRANSACTION
    const newRecord = await prisma.$transaction(async (tx) => {
      // Tạo bản ghi mượn sách trước
      const record = await tx.borrowRecord.create({
        data: {
          userId,
          bookId,
          borrowDate,
          dueDate,
          paymentMethod,
          amount: totalAmount,
          status: statusBanDau,
        },
      });

      // Tạo mã thanh toán duy nhất
      const paymentCode = `LIB24${record.id.slice(-6).toUpperCase()}`;

      // CẬP NHẬT: Luôn cập nhật mã này nếu không phải trả tiền mặt
      const updatedRecord = await tx.borrowRecord.update({
        where: { id: record.id },
        data: {
          paymentCode: paymentMethod === "BANK_TRANSFER" ? paymentCode : null,
        },
        include: { book: true, user: true }, // Đổ đầy đủ thông tin quan hệ để UI không bị crash
      });

      // Trừ kho sách giữ chỗ
      await tx.book.update({
        where: { id: bookId },
        data: { available: { decrement: 1 } },
      });

      return updatedRecord;
    });

    // 5. PHẢN HỒI KẾT QUẢ VỀ CLIENT
    if (paymentMethod === "CASH") {
      return NextResponse.json({
        success: true,
        message: "Đăng ký thành công! Đã thêm vào danh sách hàng chờ duyệt.",
        data: newRecord,
      });
    }

    // Cấu hình sinh mã QR ngân hàng VietQR
    const BANK_ID = "MB";
    const ACCOUNT_NO = "0796632951";
    const ACCOUNT_NAME = "NGUYEN TRONG PHU";
    const description =
      newRecord.paymentCode || `LIB24${newRecord.id.slice(-6).toUpperCase()}`;

    // Sinh link ảnh QR động từ VietQR API
    const qrCodeUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-qr_only.png?amount=${totalAmount}&addInfo=${encodeURIComponent(
      description
    )}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

    // Trả về dữ liệu đầy đủ bao gồm cả qrCodeUrl
    return NextResponse.json({
      success: true,
      message: "Vui lòng quét mã QR để kích hoạt phiếu mượn tự động",
      data: {
        ...newRecord,
        qrCodeUrl,
        description,
      },
    });
  } catch (error: any) {
    console.error("❌ LỖI API CHI TIẾT:", error);
    return NextResponse.json(
      {
        error: "Lỗi kết nối cơ sở dữ liệu hoặc cấu trúc dữ liệu không hợp lệ!",
      },
      { status: 500 }
    );
  }
}
