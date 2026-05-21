// src/app/api/borrow/create/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // 🌟 Đồng bộ gọi instance gốc

export async function POST(req: Request) {
  try {
    const { userId, bookId, rentDays, paymentMethod } = await req.json();

    if (!userId || !bookId || !rentDays || !paymentMethod) {
      return NextResponse.json(
        { error: "Thiếu thông tin đăng ký bắt buộc!" },
        { status: 400 }
      );
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

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

    const totalAmount = book.pricePerDay * parseInt(rentDays);
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + parseInt(rentDays));

    const statusBanDau =
      paymentMethod === "CASH" ? "AWAITING_PICKUP" : "PENDING_PAYMENT";

    // Lưu vào MariaDB qua adapter Singleton của bạn
    const newRecord = await prisma.borrowRecord.create({
      data: {
        userId,
        bookId,
        borrowDate,
        dueDate,
        paymentMethod,
        amount: totalAmount,
        status: statusBanDau,
      },
      include: { book: true },
    });

    if (paymentMethod === "CASH") {
      await prisma.book.update({
        where: { id: bookId },
        data: { available: { decrement: 1 } },
      });

      return NextResponse.json({
        success: true,
        message: "Đăng ký thành công! Vui lòng ra quầy đóng tiền mặt.",
        data: newRecord,
      });
    }

    // Xử lý chuyển khoản VietQR
    const BANK_ID = "MB";
    const ACCOUNT_NO = "0987654321";
    const ACCOUNT_NAME = "NGUYEN TRONG PHU";
    const description = `MUONSACH ${newRecord.id}`;

    const qrCodeUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-qr_only.png?amount=${totalAmount}&addInfo=${encodeURIComponent(
      description
    )}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

    return NextResponse.json({
      success: true,
      message: "Quét mã QR để chuyển khoản",
      data: { ...newRecord, qrCodeUrl, description },
    });
  } catch (error: any) {
    console.error("❌ LỖI API:", error);
    return NextResponse.json(
      { error: "Lỗi kết nối cơ sở dữ liệu MariaDB!" },
      { status: 500 }
    );
  }
}
